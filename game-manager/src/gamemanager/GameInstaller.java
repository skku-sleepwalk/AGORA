package gamemanager;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import javax.swing.*;
import java.awt.*;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.file.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

public class GameInstaller {
    private String downloadUrl;
    private Path path;
    private Path outputDir;
    private JFrame frame;
    private JProgressBar progressBar;
    private long zipFileLength;
    private static final String ENCRYPTION_KEY = "1234567890123456";

    public GameInstaller(Game game) {
        this.downloadUrl = game.getDownloadUrl();
        this.path = game.getPath();
        this.outputDir = Paths.get(".\\games\\" + game.getName());
        this.initGUI();
    }

    private void initGUI() {
        frame = new JFrame("Installing Game");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(300, 100);
        frame.setLayout(new FlowLayout());
        progressBar = new JProgressBar(0, 100);
        progressBar.setValue(0);
        progressBar.setStringPainted(true);
        frame.add(progressBar);
    }

    public void install() {
        SwingUtilities.invokeLater(() -> frame.setVisible(true));
        try {
            URL url = new URL(this.downloadUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            int responseCode = connection.getResponseCode();
            if (responseCode != HttpURLConnection.HTTP_OK) {
                throw new IOException("Server returned HTTP response code: " + responseCode);
            }
            int contentLength = connection.getContentLength();
            InputStream inputStream = connection.getInputStream();
            Path tempFile = Files.createTempFile("game", ".zip");
            try (FileOutputStream out = new FileOutputStream(tempFile.toFile())) {
                byte[] buffer = new byte[4096];
                int bytesRead = -1;
                long totalBytesRead = 0;
                while ((bytesRead = inputStream.read(buffer)) != -1) {
                    out.write(buffer, 0, bytesRead);
                    totalBytesRead += bytesRead;
                    int percentCompleted = (int) (totalBytesRead * 100 / contentLength);
                    SwingUtilities.invokeLater(() -> progressBar.setValue(percentCompleted));
                }
            }
            zipFileLength = tempFile.toFile().length();
            unzip(tempFile.toString(), this.outputDir);
            Files.delete(tempFile);
            SwingUtilities.invokeLater(() -> frame.setVisible(false));
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            frame.dispose();
        }
    }

    private void unzip(String zipFilePath, Path destDir) throws IOException {
        if (!Files.exists(destDir)) {
            Files.createDirectories(destDir);
        }
        try (FileInputStream fis = new FileInputStream(zipFilePath);
             BufferedInputStream bis = new BufferedInputStream(fis);
             ZipInputStream zis = new ZipInputStream(bis)) {
            ZipEntry zipEntry = zis.getNextEntry();
            if (zipEntry == null) {
                throw new IOException("The file is not a valid ZIP file");
            }
            while (zipEntry != null) {
                Path filePath = destDir.resolve(Paths.get(zipEntry.getName().replace("/", File.separator)));
                if (!zipEntry.isDirectory()) {
                    extractFile(zis, filePath.toString());
                } else {
                    if (!Files.exists(filePath)) {
                        Files.createDirectories(filePath);
                    }
                }
                zipEntry = zis.getNextEntry();
            }
        }
    }

    private void extractFile(ZipInputStream zipIn, String filePath) throws IOException {
        try (BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(filePath))) {
            byte[] bytesIn = new byte[4096];
            int read;
            long totalBytesUnzipped = 0;
            while ((read = zipIn.read(bytesIn)) != -1) {
                bos.write(bytesIn, 0, read);
                totalBytesUnzipped += read;
                int percentCompleted = (int) (totalBytesUnzipped * 100 / zipFileLength);
                SwingUtilities.invokeLater(() -> progressBar.setValue(percentCompleted));
            }
        }
        
        Path absoluteFilePath = Paths.get(filePath).toAbsolutePath().normalize();
        Path absolutePath = path.toAbsolutePath().normalize();

        if (absoluteFilePath.equals(absolutePath)) {
            try {
                Path encryptedFilePath = Paths.get(filePath + ".enc");
                encryptFile(Paths.get(filePath), encryptedFilePath);
                Files.delete(Paths.get(filePath));
                Files.move(encryptedFilePath, Paths.get(filePath));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    private void encryptFile(Path source, Path destination) throws Exception {
        SecretKeySpec secretKeySpec = new SecretKeySpec(ENCRYPTION_KEY.getBytes(), "AES");
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec, new IvParameterSpec(new byte[16]));

        try (FileInputStream fis = new FileInputStream(source.toFile());
            FileOutputStream fos = new FileOutputStream(destination.toFile());
            BufferedOutputStream bos = new BufferedOutputStream(fos)) {
            byte[] buffer = new byte[4096];
            int read;
            while ((read = fis.read(buffer)) != -1) {
                byte[] encrypted = cipher.update(buffer, 0, read);
                bos.write(encrypted);
            }
            byte[] encrypted = cipher.doFinal();
            bos.write(encrypted);
        }
    }
}

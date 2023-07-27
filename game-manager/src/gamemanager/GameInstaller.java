package gamemanager;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.file.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

public class GameInstaller {

    private String downloadUrl;
    private Path outputDir;

    public GameInstaller(Game game) {
        this.downloadUrl = game.getDownloadUrl();
        this.outputDir = Paths.get(".\\games\\" + game.getName());
    }

    public void install() {
        try {
            URL url = new URL(this.downloadUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            int responseCode = connection.getResponseCode();
            if (responseCode != HttpURLConnection.HTTP_OK) {
                throw new IOException("Server returned HTTP response code: " + responseCode);
            }

            InputStream inputStream = connection.getInputStream();
            Path tempFile = Files.createTempFile("game", ".zip");
            Files.copy(inputStream, tempFile, StandardCopyOption.REPLACE_EXISTING);
  
            unzip(tempFile.toString(), this.outputDir);

            Files.delete(tempFile);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void unzip(String zipFilePath, Path destDir) {
        if (!Files.exists(destDir)) {
            try {
                Files.createDirectories(destDir);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        try (FileInputStream fis = new FileInputStream(zipFilePath);
            ZipInputStream zis = new ZipInputStream(fis)) {

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
                        try {
                            Files.createDirectories(filePath);
                        } catch (IOException e) {
                            throw new IOException("Failed to create directory: " + filePath, e);
                        }
                    }
                }
                zipEntry = zis.getNextEntry();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void extractFile(ZipInputStream zipIn, String filePath) throws IOException {
        try (BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(filePath))) {
            byte[] bytesIn = new byte[4096];
            int read;
            while ((read = zipIn.read(bytesIn)) != -1) {
                bos.write(bytesIn, 0, read);
            }
        }
    }
}

package gameinstaller;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.file.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

public class GameInstaller {

    private String gameUrl;
    private String outputDir;

    public GameInstaller(String gameUrl, String outputDir, String gameName) {
        this.gameUrl = gameUrl;
        this.outputDir = outputDir + gameName + File.separator;
    }

    public void install() {
        try {
            URL url = new URL(this.gameUrl);
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

    private void unzip(String zipFilePath, String destDir) {
        File dir = new File(destDir);
        if (!dir.exists()) dir.mkdirs();
        try (FileInputStream fis = new FileInputStream(zipFilePath);
            ZipInputStream zis = new ZipInputStream(fis)) {
            ZipEntry zipEntry = zis.getNextEntry();
            if (zipEntry == null) {
                throw new IOException("The file is not a valid ZIP file");
            }
            while(zipEntry != null) {
                String filePath = destDir + zipEntry.getName().replace("/", File.separator);
                if (!zipEntry.isDirectory()) {
                    extractFile(zis, filePath);
                } else {
                    File newDir = new File(filePath);
                    if (!newDir.exists()) {
                        if (!newDir.mkdirs()) throw new IOException("Failed to create directory: " + newDir);
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

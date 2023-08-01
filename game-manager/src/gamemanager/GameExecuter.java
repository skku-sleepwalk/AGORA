package gamemanager;

import java.io.BufferedOutputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.concurrent.*;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class GameExecuter {
    private final Game game;
    HttpClientService httpClientService = new HttpClientService();
    private static final String ENCRYPTION_KEY = "1234567890123456";

    public GameExecuter(Game game) {
        this.game = game;
    }

    public void execute() throws Exception {
        Path decryptedExecutablePath = Paths.get(game.getPath().toString() + ".dec");
        decryptFile(game.getPath(), decryptedExecutablePath);

        ProcessBuilder processBuilder = new ProcessBuilder(decryptedExecutablePath.toString());
        Process process = processBuilder.start();

        ExecutorService executorService = Executors.newSingleThreadExecutor();
        executorService.submit(() -> {
            try {
                process.waitFor();
            } catch (InterruptedException e) {
                e.printStackTrace();
            } finally {
                System.out.println("게임 종료");
                executorService.shutdown();
                try {
                    Files.delete(decryptedExecutablePath);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });

        ScheduledExecutorService scheduledExecutorService = Executors.newScheduledThreadPool(1);
        scheduledExecutorService.scheduleAtFixedRate(() -> {
            if (process.isAlive()) {
                httpClientService.addPlaytime(game.getId(), 1);
            }
        }, 1, 1, TimeUnit.MINUTES);

        executorService.submit(() -> {
            try {
                process.waitFor();
            } catch (InterruptedException e) {
                e.printStackTrace();
            } finally {
                scheduledExecutorService.shutdown();
            }
        });
    }

    private void decryptFile(Path source, Path destination) throws Exception {
        SecretKeySpec secretKeySpec = new SecretKeySpec(ENCRYPTION_KEY.getBytes(), "AES");
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipher.init(Cipher.DECRYPT_MODE, secretKeySpec, new IvParameterSpec(new byte[16]));

        try (FileInputStream fis = new FileInputStream(source.toFile());
            FileOutputStream fos = new FileOutputStream(destination.toFile());
            BufferedOutputStream bos = new BufferedOutputStream(fos)) {
            byte[] buffer = new byte[4096];
            int read;
            while ((read = fis.read(buffer)) != -1) {
                byte[] decrypted = cipher.update(buffer, 0, read);
                bos.write(decrypted);
            }
            byte[] decrypted = cipher.doFinal();
            bos.write(decrypted);
        }
    }
}

package gamemanager;

import java.io.BufferedOutputStream;
import java.io.File;
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
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.Clip;
import javax.sound.sampled.LineUnavailableException;
import javax.sound.sampled.UnsupportedAudioFileException;
import javax.swing.JOptionPane;
import javax.swing.SwingUtilities;

public class GameExecuter {
    private final Game game;
    HttpClientService httpClientService = new HttpClientService();
    private static final String ENCRYPTION_KEY = "1234567890123456";
    private final long remainingPlayTime;

    public GameExecuter(Game game, long remainingPlayTime) {
        this.game = game;
        this.remainingPlayTime = remainingPlayTime;
    }

    public GameExecuter(Game game) {
        this.game = game;
        this.remainingPlayTime = 999999999;
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

        ScheduledExecutorService scheduledExecutorService = Executors.newScheduledThreadPool(2);
        scheduledExecutorService.scheduleAtFixedRate(() -> {
            if (process.isAlive()) {
                httpClientService.addPlaytime(game.getId(), 1);
            }
        }, 1, 1, TimeUnit.MINUTES);

        scheduledExecutorService.schedule(() -> {
            if (process.isAlive()) {
                process.destroy();
            }
        }, remainingPlayTime, TimeUnit.MINUTES);

        executorService.submit(() -> {
            try {
                process.waitFor();
            } catch (InterruptedException e) {
                e.printStackTrace();
            } finally {
                scheduledExecutorService.shutdown();
            }
        });

        long[] alertTimes = {30, 10, 5, 1};
        for (long alertTime : alertTimes) {
            if (remainingPlayTime >= alertTime) {
                scheduledExecutorService.schedule(() -> {
                    if (process.isAlive()) {
                        showWarning((int) alertTime);
                        playSoundAlert((int) alertTime);
                    }
                }, remainingPlayTime - alertTime, TimeUnit.MINUTES);
            }
        }
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

    private void showWarning(int minutesLeft) {
        SwingUtilities.invokeLater(() -> {
            JOptionPane.showMessageDialog(null, minutesLeft + "분 남았습니다.", "잔여 시간 알림", JOptionPane.WARNING_MESSAGE);
        });
    }

    private void playSoundAlert(int minutesLeft) {
        String soundFilePath = "audios\\" + minutesLeft + "_minutes_left.wav";

        try {
            AudioInputStream audioInputStream = AudioSystem.getAudioInputStream(new File(soundFilePath).getAbsoluteFile());
            Clip clip = AudioSystem.getClip();
            clip.open(audioInputStream);
            clip.start();
        } catch (UnsupportedAudioFileException | IOException | LineUnavailableException e) {
            e.printStackTrace();
        }
    }
}
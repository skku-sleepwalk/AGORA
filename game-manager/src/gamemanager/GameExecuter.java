package gamemanager;

import java.io.IOException;
import java.util.concurrent.*;

public class GameExecuter {
    private final TimeUnit REQUEST_INTERVAL_UNIT = TimeUnit.MINUTES;
    private final Game game;

    public GameExecuter(Game game) {
        this.game = game;
    }

    public void execute() throws IOException {
        ProcessBuilder processBuilder = new ProcessBuilder(game.getPath());
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
            }
        });

        ScheduledExecutorService scheduledExecutorService = Executors.newScheduledThreadPool(1);
        scheduledExecutorService.scheduleAtFixedRate(() -> {
            // TODO: 백엔드에 요청 전송
            System.out.println("백엔드에 요청 전송");
        }, 0, 1, REQUEST_INTERVAL_UNIT);

        executorService.submit(() -> {
            try {
                process.waitFor();
            } catch (InterruptedException e) {
                e.printStackTrace();
            } finally {
                System.out.println("게임 종료");
                scheduledExecutorService.shutdown();
            }
        });
    }
}

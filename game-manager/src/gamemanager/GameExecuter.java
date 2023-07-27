package gamemanager;

import java.io.IOException;
import java.util.concurrent.*;

public class GameExecuter {
    private final Game game;
    HttpClientService httpClientService = new HttpClientService();

    public GameExecuter(Game game) {
        this.game = game;
    }

    public void execute() throws IOException {
        ProcessBuilder processBuilder = new ProcessBuilder(game.getPath().toString());
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
            httpClientService.addPlaytime(game.getId(), 1);
            System.out.println("백엔드에 요청 전송");
        }, 0, 1, TimeUnit.MINUTES);

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

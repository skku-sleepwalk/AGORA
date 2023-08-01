package gamemanager;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class GameManager {
    private List<Game> games;
    final private String fileName = "gamedata.bin";
    HttpClientService httpClientService = new HttpClientService();

    public GameManager() throws IOException, ClassNotFoundException {
        this.games = new ArrayList<>();
        loadFromFile();
    }

    public void installGame(String id) {
        Game game = httpClientService.getGame(id);
        GameInstaller installer = new GameInstaller(game);
        installer.install();
        try {
            addGame(game);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void executeGame(String id) {
      Game game = getGameById(id).orElseThrow();
      GameExecuter executer = new GameExecuter(game);
      try {
        executer.execute();
      } catch (IOException e) {
        e.printStackTrace();
      } catch (Exception e) {
        e.printStackTrace();
      }
    }

    private void addGame(Game game) throws IOException {
        games.add(game);
        saveToFile();
    }

    private void removeGame(Game game) throws IOException {
        games.remove(game);
        saveToFile();
    }

    private Optional<Game> getGameById(String id) {
        return games.stream().filter(game -> game.getId().equals(id)).findFirst();
    }

    private void saveToFile() throws IOException {
        try (ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream(fileName))) {
            out.writeObject(games);
        }
    }

    @SuppressWarnings("unchecked")
    private void loadFromFile() throws IOException, ClassNotFoundException {
        File file = new File(fileName);
        if (!file.exists()) {
            file.createNewFile();
            games = new ArrayList<>();
            return;
        } 
        if (file.length() > 0) {
            try (ObjectInputStream in = new ObjectInputStream(new FileInputStream(fileName))) {
                games = (List<Game>) in.readObject();
            }
        } else {
            games = new ArrayList<>();
        }
    }
}

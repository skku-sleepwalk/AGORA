package main;
import java.util.Map;

import gamemanager.GameManager;
import urlparser.AgoraUrlParser;

public class Main {
  
  private static String token;

  public static void main(String[] args) throws Exception {
    AgoraUrlParser parser = new AgoraUrlParser(args[0]);
    String pathName = parser.getPathName();
    Map<String, String> query = parser.getQuery();
    GameManager gameManager = new GameManager();

    token = query.get("token");
    String gameId = query.get("id");

    switch (pathName) {
      case "install":
        gameManager.installGame(gameId);
        break;
      case "execute":
        gameManager.executeGame(gameId);
        break;
      default:
        throw new Exception("Invalid path name");
    }
  }

  public static String getToken() {
    return token;
  }

}

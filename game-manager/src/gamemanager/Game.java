package gamemanager;

import java.io.Serializable;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.json.JSONObject;

public class Game implements Serializable {
    private static final long serialVersionUID = 1L;

    private String name;
    private String downloadUrl;
    private String executablePathString;
    private String id;

    public Game(JSONObject game) {
        try {
            this.name = game.getString("title");
            this.downloadUrl = game.getString("downloadUrl");
            this.executablePathString = game.getString("executablePath");
            this.id = game.getString("id");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String getName() {
        return name;
    }

    public String getId() {
        return id;
    }

    public Path getPath() {
        return Paths.get("games").resolve(name).resolve(Paths.get(executablePathString));
    }

    public Path getExecutablePath() {
        return Paths.get(executablePathString);
    }

    public String getDownloadUrl() {
        return downloadUrl;
    }

}

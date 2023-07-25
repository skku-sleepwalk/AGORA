package gamemanager;

import java.io.File;
import java.io.Serializable;

public class Game implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private String name;
    private String executablePath;
    private String id;

    public Game(String name, String id) {
        this.name = name;
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public String getId() {
        return id;
    }

    public String getPath() {
        return name + File.separator + executablePath;
    }
}

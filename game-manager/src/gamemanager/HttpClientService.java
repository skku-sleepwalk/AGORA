package gamemanager;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.json.JSONException;
import org.json.JSONObject;

import main.Main;

import java.io.IOException;

public class HttpClientService {
    private final HttpClient client;
    private final String baseUrl = "http://localhost:8000";

    public HttpClientService() {
        this.client = HttpClient.newHttpClient();
    }

    public Game getGame(String id) {
        try {   
            JSONObject response = sendRequest("GET", "/game-store/id/" + id, null);
            return new Game(response);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public void addPlaytime(String id, int minutes) {
        try {
            JSONObject body = new JSONObject();
            body.put("gameStoreId", id);
            body.put("additionalPlaytime", minutes);
            sendRequest("PATCH", "/game-store/playtimeRelations", body);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private JSONObject sendRequest(String method, String endpoint, JSONObject requestBody) throws IOException, InterruptedException, JSONException {
        HttpRequest.Builder builder = HttpRequest.newBuilder()
            .uri(URI.create(baseUrl + endpoint))
            .header("Authorization", "Bearer " + Main.getToken());

        HttpRequest.BodyPublisher bodyPublisher = requestBody != null
            ? HttpRequest.BodyPublishers.ofString(requestBody.toString())
            : HttpRequest.BodyPublishers.noBody();

        if (method.equalsIgnoreCase("GET")) {
            builder.GET();
        } else if (method.equalsIgnoreCase("POST")) {
            builder.POST(bodyPublisher);
        } else if (method.equalsIgnoreCase("PUT")) {
            builder.PUT(bodyPublisher);
        } else if (method.equalsIgnoreCase("DELETE")) {
            builder.DELETE();
        } else if (method.equalsIgnoreCase("PATCH")) {
            builder.method("PATCH", bodyPublisher);
        } else {
            throw new IllegalArgumentException("Invalid HTTP method: " + method);
        }

        HttpRequest request = builder.build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() != 200) {
            throw new IOException("Unexpected HTTP status: " + response.statusCode());
        }

        return new JSONObject(response.body());
    }

}

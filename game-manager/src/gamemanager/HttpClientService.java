package gamemanager;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import main.Main;

import java.io.IOException;

public class HttpClientService {
    private final HttpClient client;
    private final String baseUrl = "http://localhost:8000";

    public HttpClientService() {
        this.client = HttpClient.newHttpClient();
    }

    public String getGame() throws IOException, InterruptedException {
        return sendRequest("/game");
    }

    private String sendRequest(String endpoint) throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(baseUrl + endpoint))
            .header("Authorization", "Bearer " + Main.getToken())
            .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() != 200) {
            throw new IOException("Unexpected HTTP status: " + response.statusCode());
        }

        return response.body();
    }
}

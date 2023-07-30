package urlparser;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;

public class AgoraUrlParser {

    private String pathName;
    private Map<String, String> query;

    public AgoraUrlParser(String urlString) throws URISyntaxException {
        urlString = urlString.replaceFirst(":/{1,2}", ":/"); 
        URI uri = new URI(urlString);
        if (!uri.getScheme().equals("agoragame")) {
            throw new URISyntaxException(urlString, "Invalid scheme");
        }

        pathName = uri.getPath().substring(1);
        query = uri.getQuery() == null ? new HashMap<>() : parseQuery(uri.getQuery());
    }

    private Map<String, String> parseQuery(String query) throws URISyntaxException {
        Map<String, String> result = new HashMap<>();
        String[] pairs = query.split("&");
        for (String pair : pairs) {
            String[] keyValue = pair.split("=");
            if (keyValue.length != 2) {
                throw new URISyntaxException(pair, "Invalid query");
            }
            result.put(keyValue[0], keyValue[1]);
        }
        return result;
    }

    public String getPathName() {
        return pathName;
    }

    public Map<String, String> getQuery() {
        return query;
    }
}

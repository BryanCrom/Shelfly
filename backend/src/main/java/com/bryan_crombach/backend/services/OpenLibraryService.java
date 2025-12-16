package com.bryan_crombach.backend.services;

import com.bryan_crombach.backend.models.OpenLibraryResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Slf4j
@Service
public class OpenLibraryService {

    private final RestTemplate restTemplate =  new RestTemplate();

    public OpenLibraryResponse search(String query) {

        if (query == null || query.trim().length() < 3) {
            return OpenLibraryResponse.empty();
        }

        URI uri = UriComponentsBuilder
                .fromUriString("https://openlibrary.org/search.json")
                .queryParam("q", query)
                .queryParam("limit", 20)
                .queryParam("fields",
                        "cover_edition_key,title,author_name,first_publish_year"
                )
                .build()
                .encode()
                .toUri();
        System.out.println(uri);
        try {
            return restTemplate.getForObject(uri, OpenLibraryResponse.class);
        } catch (HttpClientErrorException e) {
            log.warn("Open Library query failed: {}", e.getStatusCode());
            return OpenLibraryResponse.empty();
        }
    }
}

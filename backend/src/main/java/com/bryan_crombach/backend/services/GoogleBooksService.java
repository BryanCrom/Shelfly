package com.bryan_crombach.backend.services;

import com.bryan_crombach.backend.configs.GoogleBooksConfig;
import com.bryan_crombach.backend.models.GoogleBooksResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Slf4j
@Service
public class GoogleBooksService {

    private final RestTemplate restTemplate;
    private final GoogleBooksConfig properties;

    public GoogleBooksService(GoogleBooksConfig properties) {
        this.restTemplate = new RestTemplate();
        this.properties = properties;
    }

    public GoogleBooksResponse search(String q) {

        if (q == null) {
            return GoogleBooksResponse.empty();
        }



        URI uri = UriComponentsBuilder
                .fromUriString("https://www.googleapis.com/books/v1/volumes")
                .queryParam("q", q)
                .queryParam("fields", "items(id,volumeInfo(title,authors,industryIdentifiers,publisher,publishedDate,description,pageCount,categories,imageLinks(thumbnail),language))")
                .queryParam("maxResults", 40)
                .queryParam("key", properties.getApiKey())
                .build()
                .encode()
                .toUri();

        System.out.println(uri);

        try {
            return restTemplate.getForObject(uri, GoogleBooksResponse.class);
        } catch (HttpClientErrorException e) {
            log.warn("Google Books query failed: {}", e.getStatusCode());
            return GoogleBooksResponse.empty();
        }
    }
}

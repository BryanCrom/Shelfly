package com.bryan_crombach.backend.configs;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix="google.books")
@Getter
@Setter
public class GoogleBooksConfig {

    private String apiKey;

}

/*
Author: Bryan Crombach
Purpose: configure the algolia index for the algolia service class
 */

package com.bryan_crombach.backend.configs;

import com.algolia.search.DefaultSearchClient;
import com.algolia.search.SearchClient;
import com.algolia.search.SearchIndex;
import com.bryan_crombach.backend.models.Book;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AlgoliaConfig {

    @Value("${algolia.appId}")
    private String adminAppId;

    @Value("${algolia.apiKey}")
    private String adminApiKey;

    @Value("${algolia.indexName}")
    private String indexName;
    
    @Bean
    public SearchClient algoliaClient() {
        return DefaultSearchClient.create(adminAppId, adminApiKey);
    }

    @Bean
    public SearchIndex<Book> algoliaIndex(SearchClient client) {
        return client.initIndex(indexName, Book.class);
    }
}

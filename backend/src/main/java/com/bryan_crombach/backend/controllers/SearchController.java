/*
Author: Bryan Crombach
Purpose: api routes for the search function
 */

package com.bryan_crombach.backend.controllers;

import java.util.List;
import com.algolia.search.models.indexing.SearchResult;
import com.bryan_crombach.backend.mappers.GoogleBooksMapper;
import com.bryan_crombach.backend.models.GoogleBooksResponse;
import com.bryan_crombach.backend.services.AlgoliaService;
import com.bryan_crombach.backend.models.Book;
import com.bryan_crombach.backend.services.GoogleBooksService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SearchController {

    private final AlgoliaService algoliaService;
    private final GoogleBooksService googleBooksService;

    public SearchController(AlgoliaService algoliaService, GoogleBooksService googleBooksService) {
        this.algoliaService = algoliaService;
        this.googleBooksService = googleBooksService;
    }

    @RequestMapping("/search")
    public SearchResult<Book> search(@RequestParam String q) {
        System.out.println("Searching for: " + q);

        GoogleBooksResponse response = googleBooksService.search(q);

        System.out.println("GoogleBooks Response: " + response);

        List<Book> books = GoogleBooksMapper.normaliseGoogleBooks(response);

        System.out.println("GoogleBooks Books: " + books);

        algoliaService.saveBooks(books);

        return algoliaService.searchBook(q);
    }
}

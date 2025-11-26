/*
Author: Bryan Crombach
Purpose: api routes for the search function
 */

package com.bryan_crombach.backend.controllers;

import com.algolia.search.models.indexing.SearchResult;
import com.bryan_crombach.backend.Services.AlgoliaService;
import com.bryan_crombach.backend.models.Book;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SearchController {

    private final AlgoliaService algoliaService;

    public SearchController(AlgoliaService algoliaService) {
        this.algoliaService = algoliaService;
    }

    @RequestMapping("/search")
    public SearchResult<Book> search(@RequestParam String q) {
        System.out.println("Searching for: " + q);
        return algoliaService.searchBook(q);
    }
}

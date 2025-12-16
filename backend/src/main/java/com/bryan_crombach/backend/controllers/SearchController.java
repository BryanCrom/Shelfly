/*
Author: Bryan Crombach
Purpose: api routes for the search function
 */

package com.bryan_crombach.backend.controllers;

import java.util.List;
import com.algolia.search.models.indexing.SearchResult;
import com.bryan_crombach.backend.mappers.OpenLibraryMapper;
import com.bryan_crombach.backend.services.AlgoliaService;
import com.bryan_crombach.backend.services.OpenLibraryService;
import com.bryan_crombach.backend.models.Book;
import com.bryan_crombach.backend.models.OpenLibraryResponse;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SearchController {

    private final AlgoliaService algoliaService;
    private final OpenLibraryService openLibraryService;

    public SearchController(AlgoliaService algoliaService, OpenLibraryService openLibraryService) {
        this.algoliaService = algoliaService;
        this.openLibraryService = openLibraryService;
    }

    @RequestMapping("/search")
    public SearchResult<Book> search(@RequestParam String q) {
        System.out.println("Searching for: " + q);

        OpenLibraryResponse response = openLibraryService.search(q);

        System.out.println("OpenLibrary Response: " + response);

        List<Book> books = OpenLibraryMapper.normaliseOpenLibrary(response);

        System.out.println("OpenLibrary Books: " + books);

        algoliaService.saveBooks(books);

        return algoliaService.searchBook(q);
    }
}

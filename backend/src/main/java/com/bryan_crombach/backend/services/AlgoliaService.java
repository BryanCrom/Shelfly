/*
Author: Bryan Crombach
Purpose: service that controls all algolia functionality
 */

package com.bryan_crombach.backend.services;

import com.algolia.search.models.indexing.Query;
import com.algolia.search.models.indexing.SearchResult;
import com.bryan_crombach.backend.models.Book;
import com.algolia.search.SearchIndex;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlgoliaService {

    private final SearchIndex<Book> algoliaIndex;

    public AlgoliaService(SearchIndex<Book> algoliaIndex) {
        this.algoliaIndex = algoliaIndex;
    }

    public void saveBooks(List<Book> books) {
        algoliaIndex.saveObjects(books).waitTask();
    }

    public SearchResult<Book> searchBooks(String query) { return algoliaIndex.search(new Query(query)); }
}

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

    public void saveBook(Book book) {
        algoliaIndex.saveObject(book).waitTask();
    }

    public void saveBooks(List<Book> books) {
        algoliaIndex.saveObjects(books).waitTask();
    }

    public void deleteBook(String bookId) {
        algoliaIndex.deleteObject(bookId).waitTask();
    }

    public SearchResult<Book> searchBook(String query) {
        return algoliaIndex.search(new Query(query));
    }
}

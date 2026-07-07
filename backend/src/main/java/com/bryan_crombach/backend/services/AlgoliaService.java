/*
Author: Bryan Crombach
Purpose: service that controls all algolia functionality
 */

package com.bryan_crombach.backend.services;

import com.algolia.search.models.indexing.Query;
import com.algolia.search.models.indexing.SearchResult;
import com.bryan_crombach.backend.models.Book;
import com.algolia.search.SearchIndex;
import com.bryan_crombach.backend.models.BookResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlgoliaService {

    private final SearchIndex<BookResponse> algoliaReadIndex;
    private final SearchIndex<Book> algoliaWriteIndex;

    public AlgoliaService(SearchIndex<BookResponse> algoliaReadIndex, SearchIndex<Book> algoliaWriteIndex ) {
        this.algoliaReadIndex = algoliaReadIndex;
        this.algoliaWriteIndex = algoliaWriteIndex;
    }

    public void saveBooks(List<Book> books) {
        algoliaWriteIndex.partialUpdateObjects(books).waitTask();
    }

    public SearchResult<BookResponse> searchBooks(String query) { return algoliaReadIndex.search(new Query(query)); }

    public BookResponse getBook(String ObjectId) {
        return algoliaReadIndex.getObject(ObjectId);
    }
}

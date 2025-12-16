package com.bryan_crombach.backend.mappers;

import com.bryan_crombach.backend.models.Book;
import com.bryan_crombach.backend.models.OpenLibrary;
import com.bryan_crombach.backend.models.OpenLibraryResponse;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class OpenLibraryMapper {
    public static List<Book> normaliseOpenLibrary(OpenLibraryResponse response) {

        List<Book> books = new ArrayList<>();

        for (OpenLibrary openLibrary : response.getDocs()) {
            String objectID = "openlib_" + openLibrary.getCover_edition_key();

            String author = (openLibrary.getAuthor_name() != null && !openLibrary.getAuthor_name().isEmpty() ? openLibrary.getAuthor_name().getFirst() : null);

            String isbn10 = null;
            String isbn13 = null;

//            if(openLibrary.getIsbn() != null){
//                for (String isbn : openLibrary.getIsbn()) {
//                    if (isbn.length() == 10 && isbn10 == null) isbn10 = isbn;
//                    if (isbn.length() == 13 && isbn13 == null) isbn13 = isbn;
//                }
//            }

            books.add(new Book(objectID, openLibrary.getTitle(), author, isbn10, isbn13, openLibrary.getFirst_publish_year(), "Open_Library"));
        }

        return books;
    }
}

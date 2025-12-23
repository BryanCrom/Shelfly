package com.bryan_crombach.backend.mappers;

import com.bryan_crombach.backend.models.Book;
import com.bryan_crombach.backend.models.GoogleBooks;
import com.bryan_crombach.backend.models.GoogleBooksResponse;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
public class GoogleBooksMapper {
    public static List<Book> normaliseGoogleBooks(GoogleBooksResponse response) {

        List<Book> books = new ArrayList<>();

        for(GoogleBooks book: response.getItems()){
            String isbn10 = "";
            String isbn13 = "";

            if(book.getIndustryIdentifiers() != null){
                for(Map.Entry<String, String> entry: book.getIndustryIdentifiers()){
                    if(entry.getKey().equals("isbn10")){
                        isbn10 = entry.getValue();
                    }
                    if(entry.getKey().equals("isbn13")){
                        isbn13 = entry.getValue();
                    }
                }
            }

            books.add(new Book(book.getId(), book.getTitle(), book.getAuthors(), book.getPublisher(), book.getPublishedDate(), book.getDescription(), isbn10, isbn13, book.getPageCount(), book.getCategories(), book.getThumbnail(), book.getLanguage()));

        }

        return books;
    }
}

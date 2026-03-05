package com.bryan_crombach.backend.mappers;

import com.bryan_crombach.backend.models.*;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class GoogleBooksMapper {
    public static List<Book> normaliseGoogleBooks(GoogleBooksResponse response) {

        List<Book> books = new ArrayList<>();

        for(GoogleBooks book: response.getItems()){

            String id = book.getId();
            VolumeInfo volumeInfo = book.getVolumeInfo();
            String title = volumeInfo.getTitle();
            String[] authors = volumeInfo.getAuthors();
            String publisher = volumeInfo.getPublisher();
            String publishedDate = volumeInfo.getPublishedDate();
            String description = volumeInfo.getDescription();
            int pageCount = volumeInfo.getPageCount();
            String[] categories = volumeInfo.getCategories();
            ImageLinks imageLinks = volumeInfo.getImageLinks();
            String language = volumeInfo.getLanguage();

            if(id == null || title == null || authors == null || publisher == null || publishedDate == null || description == null || categories == null || imageLinks == null || language == null || pageCount == 0){
                continue;
            }

            String thumbnail = imageLinks.getThumbnail();

            Book newBook = new Book(id, title, authors, publisher, publishedDate, description, Integer.toString(pageCount), categories, thumbnail, language);

            books.add(newBook);

        }
        return books;
    }
}

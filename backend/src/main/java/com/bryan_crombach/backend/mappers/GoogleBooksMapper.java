package com.bryan_crombach.backend.mappers;

import com.bryan_crombach.backend.models.*;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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
            IndustryIdentifiers[] industryIdentifiers = volumeInfo.getIndustryIdentifiers();
            String pageCount = volumeInfo.getPageCount();
            String[] categories = volumeInfo.getCategories();
            ImageLinks imageLinks = volumeInfo.getImageLinks();
            String language = volumeInfo.getLanguage();

            if(id == null || title == null || authors == null || publisher == null || publishedDate == null || description == null || industryIdentifiers == null || categories == null || imageLinks == null || language == null){
                continue;
            }

            String isbn10 = null;
            String isbn13 = null;

            for(IndustryIdentifiers industryIdentifier: industryIdentifiers){
                if(Objects.equals(industryIdentifier.getType(), "isbn10")){
                    isbn10 = industryIdentifier.getIdentifier();
                }
                if(Objects.equals(industryIdentifier.getType(), "isbn13")){
                    isbn13 = industryIdentifier.getIdentifier();
                }
            }

            String thumbnail = imageLinks.getThumbnail();

            Book newBook = new Book(id, title, authors, publisher, publishedDate, description, isbn10, isbn13, pageCount, categories, thumbnail, language);

            books.add(newBook);

        }
        return books;
    }
}

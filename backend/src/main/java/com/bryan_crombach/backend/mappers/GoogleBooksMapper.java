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

            VolumeInfo volumeInfo = book.getVolumeInfo();

            String isbn10 = "";
            String isbn13 = "";
            String thumbnailUrl = "";

            if(volumeInfo.getIndustryIdentifiers() != null){
                for(IndustryIdentifiers identifier: volumeInfo.getIndustryIdentifiers()){
                    if(identifier.getType().equals("isbn10")){
                        isbn10 = identifier.getIdentifier();
                    }
                    if(identifier.getType().equals("isbn13")){
                        isbn13 = identifier.getIdentifier();
                    }
                }
            }

            if(volumeInfo.getImageLinks() != null){
                thumbnailUrl = volumeInfo.getImageLinks().getThumbnail();
            }

            books.add(new Book(book.getId(), volumeInfo.getTitle(), volumeInfo.getAuthors(), volumeInfo.getPublisher(), volumeInfo.getPublishedDate(), volumeInfo.getDescription(), isbn10, isbn13, volumeInfo.getPageCount(), volumeInfo.getCategories(), thumbnailUrl, volumeInfo.getLanguage()));
        }

        return books;
    }
}

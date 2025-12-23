/*
Author: Bryan Crombach
Purpose: book object denotes the shape of the search hit
 */

package com.bryan_crombach.backend.models;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Book {
    private String objectID;
    private String title;
    private String[] authors;
    private String publisher;
    private String publishedDate;
    private String description;
    private String isbn10;
    private String isbn13;
    private String pageCount;
    private String[] Categories;
    private String coverURL;
    private String language;

}

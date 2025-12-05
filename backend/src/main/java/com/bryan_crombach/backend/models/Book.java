/*
Author: Bryan Crombach
Purpose: book object denotes the shape of the search hit
 */

package com.bryan_crombach.backend.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Book {
    private String objectID;
    private String title;
    private String url;
    private String poster_path;
    private String overview;
//    private String publisher;
//    private String description;
//    private String genre;
//    private String isbn10;
//    private String isbn13;
}

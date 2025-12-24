package com.bryan_crombach.backend.models;

import lombok.Data;

@Data
public class VolumeInfo {
    private String title;
    private String[] authors;
    private String publisher;
    private String publishedDate;
    private String description;
    private IndustryIdentifiers[] industryIdentifiers;
    private String pageCount;
    private String[] categories;
    private ImageLinks imageLinks;
    private String language;
}

package com.bryan_crombach.backend.models;

import lombok.Data;

import java.util.*;

@Data
public class GoogleBooks {
    private String id;
    private String title;
    private String[] authors;
    private String publisher;
    private String publishedDate;
    private String description;
    private Map.Entry<String, String>[] industryIdentifiers;
    private String pageCount;
    private String[] categories;
    private String thumbnail;
    private String language;
}

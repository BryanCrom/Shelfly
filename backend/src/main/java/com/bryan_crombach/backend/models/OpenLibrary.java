package com.bryan_crombach.backend.models;

import lombok.Data;

import java.util.List;

@Data
public class OpenLibrary {
    private String cover_edition_key;
    private String title;
    private List<String> author_name;
    private int first_publish_year;
}



package com.bryan_crombach.backend.models;

import lombok.Data;

import java.util.List;

@Data
public class GoogleBooksResponse {
    private List<GoogleBooks> items = List.of();

    public static GoogleBooksResponse empty() { return new GoogleBooksResponse();}
}

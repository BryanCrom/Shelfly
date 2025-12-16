package com.bryan_crombach.backend.models;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class OpenLibraryResponse {
    private List<OpenLibrary> docs = List.of();

    public static OpenLibraryResponse empty() {
        return new OpenLibraryResponse();
    }
}


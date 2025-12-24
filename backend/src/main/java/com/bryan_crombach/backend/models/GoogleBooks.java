package com.bryan_crombach.backend.models;

import lombok.Data;

@Data
public class GoogleBooks {
    private String id;
    private VolumeInfo volumeInfo;
}

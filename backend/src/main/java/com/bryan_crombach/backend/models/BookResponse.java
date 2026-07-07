/*
Author: Bryan Crombach
Purpose: book response object denotes the shape of the frontend search hit
 */

package com.bryan_crombach.backend.models;

import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookResponse extends Book {
    private float avgRating;
    private int reviewCount;
}
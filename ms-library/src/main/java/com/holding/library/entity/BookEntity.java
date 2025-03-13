package com.holding.library.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;


@Component
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class BookEntity {
    @Id
    private int id;
    private String title;
    private String authors;
    private String gender;
    private double availability;



}


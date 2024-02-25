package com.bookstore.bookstoreapi.entity;

import javax.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "book")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "title")
    private String title;

    @Column(name = "author")
    private String author;

    @Column(name = "description")
    private String description;

    @Column(name = "copies")
    private int copies;

//    @Column(name = "copies_available")
//    private int copiesAvailable;
//
    @Column(name = "category")
    private String category;

    @Column(name = "img")
    private String img;

    @Column(name = "price")
    private float price;


    @Column(name = "discount_percent")
    private float discountPercent;

    public boolean isInStock() {
        return inStock;
    }

    public void setInStock(boolean inStock) {
        this.inStock = inStock;
    }

    @Column(name = "in_stock", nullable = true)
    private Boolean inStock;

    private float cost;

    public Book(Integer id){
        this.id = id;
    }

    @Transient
    public float getDiscountPrice(){
        if(discountPercent > 0){
            return price * ((100 - discountPercent)/100);
        }
        return this.price;
    }
}

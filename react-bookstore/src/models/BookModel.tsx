import { timeEnd } from "console";

class BookModel{
    id: number;
    title: string;
    author?: string;
    description?: string;
    copies?: string;
    price?: number;
    discountPercent?: number;
    category?: string;
    img?: string;
    inStock?: boolean;
    cost: number;
    discountPrice: number;

    constructor(id: number, title: string, author: string, description: string, copies: string 
        ,price: number, discountPercent: number, category: string, img: string, inStock:boolean,
         cost: number, discountPrice: number ){
                        this.id = id;
                        this.title = title;
                        this.author = author;
                        this.description = description;
                        this.price = price;
                        this.copies = copies;
                        this.discountPercent = discountPercent;
                        this.category = category;
                        this.img = img;
                        this.inStock = inStock;
                        this.cost = cost;
                        this.discountPrice = discountPrice;
                    }
}

export default BookModel;
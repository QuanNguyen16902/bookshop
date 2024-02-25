class BookRequest {
    title: string;
    author?: string;
    description?: string;
    price?: number;
    discountPercent?: number;
    category?: string;
    img?: string;

    constructor( title: string, author: string, description: string
        ,price: number, discountPercent: number, category: string){
                        this.title = title;
                        this.author = author;
                        this.description = description;
                        this.price = price;
                        this.discountPercent = discountPercent;
                        this.category = category;
                    }
}
export default BookRequest;
import BookModel from "./BookModel";

class CartItem {
  id: number;
  quantity: number;
  bookId: number;
  userId: number;
  subTotal: number;
  shippingCost: number;
  book: {
    title: string;
    description: string;
    price: number;
    discountPrice: number;
    id: number;
    img: string;
    cost: number,
    discountPercent: number
};
  constructor(
    id: number,
    quantity: number,
    bookId: number,
    userId: number,
    subTotal: number,
    shippingCost: number,
    book: {
      title: string;
      description: string;
      price: number;
      discountPrice: number;
      id: number;
      img: string;
      cost: number;
      discountPercent: number,
    },
  ) {
    this.id = id;
    this.quantity = quantity;
    this.bookId = bookId;
    this.userId = userId;
    this.book = book;
    this.subTotal = subTotal;
    this.shippingCost = shippingCost;
  }
}
export default CartItem;

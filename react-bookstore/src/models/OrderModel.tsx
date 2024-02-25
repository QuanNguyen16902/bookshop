class OrderModel{
    id: number;
    orderTime?: string;
    shippingCost?: number;
    bookCost?: number;
    subtotal?: number;
    tax?: number;
    total?: number;
    deliverDays?:number;
    deliverDate?: string;
    user: {
        id:number;
        email:string;
        username: string;
    };
    constructor( id: number,
        orderTime: string,
        shippingCost: number,
        bookCost: number,
        subtotal: number,
        tax: number,
        total: number,
        deliverDays:number,
        deliverDate: string,
        user: {
            id:number;
            email:string;
            username: string;
        }){
            this.id = id;
            this.orderTime = orderTime;
            this.shippingCost = shippingCost;
            this.bookCost = bookCost;
            this.subtotal = subtotal;
            this.tax = tax;
            this.total = total;
            this.deliverDays = deliverDays;
            this.deliverDate = deliverDate;
            this.user = user;
    }

};
export default OrderModel;
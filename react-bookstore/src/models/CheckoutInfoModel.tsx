class CheckoutInfoModel{
    bookCost: number;
    bookTotal: number;
    shippingCostTotal: number;
    paymentTotal: number;
    deliverDays: number;
    deliverDate: string;
    constructor( bookCost: number,bookTotal: number,
        shippingCostTotal: number,
        paymentTotal: number,
        deliverDays: number,
        deliverDate: string){
            this.bookCost = bookCost;
            this.shippingCostTotal = shippingCostTotal;
            this.paymentTotal = paymentTotal;
            this.deliverDays = deliverDays;
            this.deliverDate = deliverDate;
            this.bookTotal = bookTotal;
        }

}
export default CheckoutInfoModel;
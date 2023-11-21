export class PriceCalculation {
    static calculatePrice(lineItems) {
        let total = 0.0;
        lineItems.forEach(item => {
            let price = (item.variant.salePrice === '0' || item.variant.salePrice === '') ? item.variant.price : item.variant.salePrice;
            total += parseInt(item.quantity) * parseFloat(price);
        });
        return total;
    }
}
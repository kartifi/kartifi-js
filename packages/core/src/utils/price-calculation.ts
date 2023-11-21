export class PriceCalculator {
    public static calculateLineItemsTotal(lineItems) {
        let total = 0.0;
        lineItems.forEach(lineItem => {
            let salePrice = lineItem.variant.salePrice;
            let price = (salePrice === '0' || salePrice === '') ? lineItem.variant.price : lineItem.variant.salePrice;
            total += parseFloat(price) * parseInt(lineItem.quantity);
        });
        return total;
    }
}
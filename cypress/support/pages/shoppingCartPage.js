export class ShoppingCartPage{
    constructor(){ 
        this.showTotalPriceButton = '.css-n1d5pa > .chakra-button';
        this.goToCheckoutButton = '.css-641vkz > .chakra-button';
    };

    clickShowTotalPriceButton(){
        cy.get(this.showTotalPriceButton).click();
    };

    clickVerifyProduct(product){
        return cy.contains(`${product}`);
    };

    clickVerifyPrice(product, price){
        return cy.xpath(`//p[text()="${product}"]//following-sibling::p[text()=${price}]`);
    };

    clickGoToCheckout(){
        cy.get(this.goToCheckoutButton).click();
    }
};

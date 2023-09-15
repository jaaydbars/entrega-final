export class ProductsPage{
    constructor(){ 
        this.shoppingCartButton = '#goShoppingCart';
        this.closePopupButton = '#closeModal';
    };

    clickShoppingCartButton(){
        cy.get(this.shoppingCartButton).click();
    };

    clickClosePopupButton(){
        cy.get(this.closePopupButton).click();
    };

    clickAddToCartButton(product){
        cy.xpath(`//p[text()="${product}"]//following-sibling::button[text()="Add to cart"]`).click({force: true});
    };
};
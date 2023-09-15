export class CheckoutPage{
    constructor(){
        this.firstName = '#FirstName';
        this.lastName = '#lastName';
        this.cardNumber = '#cardNumber';
        this.purchaseButton = '.css-1kxonj9';
    };

    getFirstNameField(name){
        cy.get(this.firstName).type(name);
    };
    
    getLastNameField(lastName){
        cy.get(this.lastName).type(lastName);
    };
    
    getCardNumberField(creditCard){
        cy.get(this.cardNumber).type(creditCard);
    };

    clickPurchaseButton(){
        cy.get(this.purchaseButton).click();
    }
}
export class ReceiptPage{

    clickVerifyNameAndLastName(name){
        return cy.contains(`${name}`);
    };

    clickVerifyProduct(product){
        return cy.contains(`${product}`);
    };

    clickVerifyCreditCard(card){
        return cy.contains(`${card}`);
    };
    
    clickVerifyTotalPrice(){
        return cy.get('#totalPrice')
    };
};
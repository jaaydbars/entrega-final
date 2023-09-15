import {HomePage} from "../support/pages/homePage";
import {ProductsPage} from "../support/pages/productsPage";
import {ShoppingCartPage, shoppingCartPage} from "../support/pages/shoppingCartPage";
import {CheckoutPage} from "../support/pages/checkoutPage";
import {ReceiptPage} from "../support/pages/receiptPage.js";
const constants = require('../support/constants');

describe('Entrega', () => {
    let datos;
    const homePage = new HomePage();
    const productsPage = new ProductsPage();
    const shoppingCartPage = new ShoppingCartPage();
    const checkoutPage = new CheckoutPage();
    const receiptPage = new ReceiptPage();
    const username = 'user' + Math.floor(Math.random() * 1000);
    const password = '123456!';
    const gender = "Male";
    const day = '10';
    const month = 'October';
    const year = "1980";

    before('Cargando fixture', () =>{
        cy.fixture('datos').then(data => {
            datos = data;
        });
    });

it('Ingresar y verificar el precio acumulado de 2 productos, comprar y verificar los datos del recibo', () =>{
    
    cy.request({
        url: "https://pushing-it.onrender.com/api/register",
        method: "POST",
        body: {
            "username": username,
            "password": password,
            "gender": gender,
            "day": day,
            "month": month,
            "year": year
        }
    }).then(respuesta => {
        cy.log(respuesta)
        expect(respuesta.status).to.be.equal(200)
        expect(respuesta.body.newUser.username).to.be.equal(username)
        expect(respuesta.body.newUser.gender).to.be.equal(gender)
        expect(respuesta.body.newUser.day).to.be.equal(day)
        expect(respuesta.body.newUser.month).to.be.equal(month)
        expect(respuesta.body.newUser.year).to.be.equal(year)
    })

    cy.request({
            url: "https://pushing-it.onrender.com/api/login",
            method: "POST",
            body: {
                "username": username,
                "password": password
            }
        }).then(respuesta => {
            cy.log(respuesta.body),
            expect(respuesta.status).to.be.equal(200)
            window.localStorage.setItem('token', respuesta.body.token)
            window.localStorage.setItem('user', respuesta.body.user.username)
        })

    cy.visit('')
    homePage.clickOnlineShopButton();
    productsPage.clickAddToCartButton(datos.primerProducto.productName,{timeout:constants.TIMEOUT});
    productsPage.clickClosePopupButton();
    productsPage.clickAddToCartButton(datos.segundoProducto.productName, {timeout:constants.TIMEOUT});
    productsPage.clickClosePopupButton();
    productsPage.clickShoppingCartButton();
    
    shoppingCartPage.clickShowTotalPriceButton();
    shoppingCartPage.clickVerifyProduct(datos.primerProducto.productName).should('exist');
    shoppingCartPage.clickVerifyPrice(datos.primerProducto.productName, datos.primerProducto.price).should('exist');
    shoppingCartPage.clickVerifyProduct(datos.segundoProducto.productName).should('exist');
    shoppingCartPage.clickVerifyPrice(datos.segundoProducto.productName, datos.segundoProducto.price).should('exist');
    cy.get('#price > b').invoke('text').then(parseInt).should('eq', datos.primerProducto.price + datos.segundoProducto.price);
    shoppingCartPage.clickGoToCheckout();
    
    checkoutPage.getFirstNameField(datos.checkout.name);
    checkoutPage.getLastNameField(datos.checkout.lastName);
    checkoutPage.getCardNumberField(datos.checkout.creditCard);
    checkoutPage.clickPurchaseButton();
    cy.get('.chakra-progress__indicator', { timeout: 15000 }).should('not.exist');
    
    receiptPage.clickVerifyNameAndLastName(datos.checkout.name + " " + datos.checkout.lastName).should('exist');
    receiptPage.clickVerifyProduct(datos.primerProducto.productName).should('exist');
    receiptPage.clickVerifyProduct(datos.segundoProducto.productName).should('exist');
    receiptPage.clickVerifyCreditCard(datos.checkout.creditCard).should('exist');
    receiptPage.clickVerifyTotalPrice().invoke('text').should('contain', datos.primerProducto.price + datos.segundoProducto.price);
});

after('Eliminando Usuario', () =>{
    cy.request({
        url: "https://pushing-it.onrender.com/api/deleteuser/" + username,
        method: "DELETE"
    }).then(respuesta => {
        expect(respuesta.status).to.be.equal(200)
    });
}); 

});
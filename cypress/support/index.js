// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
require('cypress-xpath');
import '@shelex/cypress-allure-plugin'

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.Commands.add("addPet", ({method, url, headers, body}) => {
    cy.request({method: method, url: url, headers: headers, body: body, failOnStatusCode: false})
        .then((response) => {
        return response;  
    });
});

Cypress.Commands.add("getPet", ({method, url, headers}) => {
    cy.request({method: method, url: url, headers: headers, failOnStatusCode: false})
        .then((response) => {
        return response;  
    });
});


Cypress.Commands.add("updatePet", ({method, url, headers, petId}) => {
    cy.request({method: method, url: url, headers: headers, body: {
        "id": petId,
        "category": {
          "id": 0,
          "name": "rottweiller"
        },
        "name": "Topper",
        "photoUrls": [
          "string"
        ],
        "tags": [
          {
            "id": 0,
            "name": "string"
          }
        ],
        "status": "available"
       }, failOnStatusCode: false})
        .then((response) => {
        return response;  
    });
});

Cypress.Commands.add("SignUp", ({signUpId, signUsernameField, signpasswordField, signButton, randomUsername, randomPassword}) => {
    cy.log('Paso 1: Dar de alta un usuario')
    cy.get(signUpId).click();
    cy.get(signUsernameField).type(randomUsername,{force : true});
    cy.get(signpasswordField).type(randomPassword,{force : true});
    cy.get(signButton).click();
    cy.wait(4000);
});


Cypress.Commands.add("logIn", ({loginId, usernameId, username, passwordId, password, logInButtonId}) => {
    cy.log('Paso 2: Logearse con el usuario previamente creado')
    cy.get(loginId).click();
    cy.get(usernameId).type(username,{force : true});
    cy.get(passwordId).type(password,{force : true});
    cy.get(logInButtonId).click();
    cy.wait(500);
    cy.get('#nameofuser').should('have.text', `Welcome ${username}`)
});

Cypress.Commands.add("addLaptop", ({laptopId, laptopUrlAssertion, productXpath, productUrl, productNameSelector, productName, addProductButton, cartSelector, productXpathInTheCart}) => {
    cy.log('Paso 3: Ir a la seccion de laptops, agregar una laptop al carrito y verificar que se agregó correctamente.')
    cy.wait(500);
    cy.log('ingresar a la sección de laptos');
    cy.xpath(laptopId).click();
    cy.wait(500);
    cy.log('Verificar que la url de laptops haya cambiado, de ser cierto, se ingreso al menu de laptos correctamente!');
    cy.url().should('eq', laptopUrlAssertion);
    cy.log('Seleccionar la laptop')
    cy.xpath(productXpath).click();
    cy.wait(500);
    cy.log('Validar que la url actual haya cambiado tras seleccionar la laptop')
    cy.url().should('eq', productUrl);
    cy.log('validar el nombre de la laptop que se agregará al carrito')
    cy.get(productNameSelector).should('have.text', productName);
    cy.log('Agregar producto al carro de compras');
    cy.get(addProductButton).click();
    cy.on('window:confirm', () => true); 
    cy.get(cartSelector).click();
    cy.log('Validar que la laptop en el carrito es la misma que se agregó previamente')
    cy.xpath(productXpathInTheCart).within(() => {
    cy.xpath(productXpathInTheCart).should('have.text', productName);
    });
});

Cypress.Commands.add("logOut", ({logOutId, username}) => {
    cy.log('Paso 4: desloguearse')
    let n = cy.get('#nameofuser').should('have.text', `Welcome ${username}`);
    if (n) {
        cy.get(logOutId).click();
    }
});

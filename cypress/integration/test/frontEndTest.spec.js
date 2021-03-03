import{randomString} from '../../helpers/helper'

describe('Plan de pruebas', () => {
    
    describe('Dar de alta un usuario, loguearse, seleccionar la sección de laptops, seleccionar una laptop, y comprobar que esté en el carrito', () =>{
        let userValues = null;
    
        before(()=>{
            userValues = randomString(8);
            cy.visit('https://www.demoblaze.com/index.html');
        });
        
        beforeEach(() =>{
            cy.fixture('example.json').as('testValues');  
        });
    
        it('dar un usuario de alta', () => {
            cy.get('@testValues').then((testValues) => {
                cy.SignUp({signUpId:testValues.frontTestValues.signUpId,
                 signUsernameField:testValues.frontTestValues.signUsernameField,
                 signpasswordField:testValues.frontTestValues.signpasswordField,
                 signButton:testValues.frontTestValues.signButton,
                 randomUsername: userValues,
                 randomPassword: userValues
                });
            });
        });
    
        it('Validar que el usuario dado de alta pueda logearse y que se logee efectivamente', () =>{
            cy.get('@testValues').then((testValues) => {
                cy.logIn({loginId:testValues.frontTestValues.loginId, 
                usernameId: testValues.frontTestValues.usernameId, 
                username: userValues,
                passwordId: testValues.frontTestValues.passwordId,
                password: userValues,
                logInButtonId: testValues.frontTestValues.logInButtonId})      
            });
        });
    
        it('añadir la laptop y comprobar que se haya agregado al carrito', () => {
            cy.get('@testValues').then((testValues) => {
            cy.addLaptop({laptopId:testValues.frontTestValues.laptopId, 
                laptopUrlAssertion:testValues.frontTestValues.laptopUrlAssertion,
                productXpath: testValues.frontTestValues.productXpath,
                productUrl: testValues.frontTestValues.productUrl, 
                productNameSelector: testValues.frontTestValues.productNameSelector,
                productName: testValues.frontTestValues.productName, 
                addProductButton: testValues.frontTestValues.addProductButton, 
                cartSelector: testValues.frontTestValues.cartSelector, 
                productXpathInTheCart: testValues.frontTestValues.productXpathInTheCart});
            });
        });
    });

    describe('Dar de alta un usuario, loguearse y desloguearse', () => {
        let userValues = null;
        
        before(()=>{
            userValues = randomString(8);
            cy.visit('https://www.demoblaze.com/index.html');
        });
        
        beforeEach(() =>{
            cy.fixture('example.json').as('testValues');  
        });
    
        it('dar un usuario de alta', () => {
            cy.get('@testValues').then((testValues) => {
                cy.SignUp({signUpId:testValues.frontTestValues.signUpId,
                    signUsernameField:testValues.frontTestValues.signUsernameField,
                    signpasswordField:testValues.frontTestValues.signpasswordField,
                    signButton:testValues.frontTestValues.signButton,
                    randomUsername: userValues,
                    randomPassword: userValues
                });
            });
        });
    
        it('Validar que el usuario dado de alta pueda logearse y que se logee efectivamente', () =>{
            cy.get('@testValues').then((testValues) => {
                cy.logIn({loginId:testValues.frontTestValues.loginId, 
                usernameId: testValues.frontTestValues.usernameId, 
                username: userValues,
                passwordId: testValues.frontTestValues.passwordId,
                password: userValues,
                logInButtonId: testValues.frontTestValues.logInButtonId})      
            });
        });
    
        it.skip('desloguearse en la pagina', () =>{
            cy.get('@testValues').then((testValues) => {
                cy.logOut({logOutId: testValues.frontTestValues.logOutId, username: userValues})      
            });
        });
    });

});
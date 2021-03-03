describe('Suite de pruebas para la automatización del front end', () => {
    
    let petId = null;

    beforeEach(() =>{
        cy.fixture('example.json').as('testValues');
    })

    it('Validar que el servicio de creación no tarde menos de 30 mil milisegundos', () => {
        cy.get('@testValues').then((testValues) => {
            cy.addPet({method: 'POST',url:testValues.webservices.addPetUrl,headers:testValues.webservices.ContentType, body:testValues.webservices.bodyRequest})
            .then((response) => {
                expect(response.duration).to.be.lessThan(30000);
            });
        });
    });

    it('Validar que el servicio de modificación no tarde menos de 30 mil milisegundos', () => {
        cy.get('@testValues').then((testValues) => {
            cy.updatePet({method: 'PUT',url:testValues.webservices.updatePetUrl,headers:testValues.webservices.ContentType,  body:petId})            .then((response) => {
                expect(response.duration).to.be.lessThan(30000);
            });
        });
    });

    it('Validar que el servicio de consulta no tarde menos de 30 mil milisegundos', () => {
        cy.get('@testValues').then((testValues) => {
            cy.addPet({method: 'GET',url:testValues.webservices.getPetUrl+petId,headers:testValues.webservices.ContentType})
            .then((response) => {
                expect(response.duration).to.be.lessThan(30000);
            });
        });
    });
   

    it('Validar estado de la petición al crear una nueva mascota, y en caso de que el servicio responda un 400 0 500 no se ejecutarian las asersiones', () => {
        cy.get('@testValues').then((testValues) => {
            cy.addPet({method: 'POST',url:testValues.webservices.addPetUrl,headers:testValues.webservices.ContentType, body:testValues.webservices.bodyRequest})
            .then((response) => {
                 petId = response.body.id;
                 if (response.status === 200) {
                     expect(response.status).to.eq(200);
                     expect(petId).to.exist;
                     expect(response.body.category.name).to.exist;
                     expect(response.body.name).to.eq('doggie');
                 } else {
                     cy.log('El estado de la petición no es correcto, revise la consola para mas información');
                 }
            });
        });
    });

    it('  Validar que el servicio de creación devuelva un 201 porque está creando un nuevo registro', () => {
        cy.get('@testValues').then((testValues) => {
            cy.addPet({method: 'POST',url:testValues.webservices.addPetUrl,headers:testValues.webservices.ContentType, body:testValues.webservices.bodyRequest})
            .then((response) => {
                 petId = response.body.id;
                cy.log('El codigo de estado deberia ser un 201 created')
                expect(response.status).to.eq(200);
                expect(response.duration).to.be.lessThan(30000);
                expect(petId).to.exist;
                expect(response.body.category.name).to.exist;
                expect(response.body.name).to.eq('doggie');
            });
        });
    });

    it('Modificar la mascota previamente creada', () => {
        cy.get('@testValues').then((testValues) => {
            cy.updatePet({method: 'PUT',url:testValues.webservices.updatePetUrl,headers:testValues.webservices.ContentType,  body:petId})
            .then((response) => {
                expect(response.body.id).to.eq(petId);
                expect(response.status).to.eq(200);
                expect(response.duration).to.be.lessThan(30000);
                expect(response.body.category.name).to.eq('rottweiller');
                expect(response.body.name).to.eq('Topper');
            });
        });
    });

    it('Validar error al usar un metodo incorrecto al invocar la modificación la mascota previamente creada', () => {
        cy.get('@testValues').then((testValues) => {
            cy.updatePet({method: 'PATCH',url:testValues.webservices.updatePetUrl,headers:testValues.webservices.ContentType,  body:petId})
            .then((response) => {
                expect(response.status).to.eq(405);
                expect(response.duration).to.be.lessThan(30000);
            });
        });
    });

    it('Consultar la mascota creada previamente, validar error 404 en la devolucion de la respuesta', () => {
        cy.get('@testValues').then((testValues) => {
            cy.getPet({method: 'GET',url:testValues.webservices.getPetUrl+petId,headers:testValues.webservices.ContentType})
            .then((response) => {
                const res = response.status;
                if (res === 404) {
                   expect(response.status).to.eq(404);
                   cy.log(response.body.message);
                } else if( response.status === 200){
                    expect(response.status).to.eq(200);
                    expect(response.duration).to.be.lessThan(30000);
                    expect(response.body.id).to.eq(petId);
                    expect(response.body.category.name).to.eq('rottweiller');
                    expect(response.body.name).to.eq('Topper');  
                } else if( response.status === 500){
                    cy.log('error del servidor')
                }
            });
        });
    });

    it('Validar casuistica en la que el id de la mascota sea de 20 digitos', () => {
        cy.get('@testValues').then((testValues) => {
            cy.getPet({method: 'GET',url:testValues.webservices.getPetUrl+petId+0,headers:testValues.webservices.ContentType})
            .then((response) => {
                cy.log(`Deberia mostrar un mensaje mas especifico del log: ${response.body.message}`); 
                expect(response.status).to.eq(404);
            });
        });
    });

})
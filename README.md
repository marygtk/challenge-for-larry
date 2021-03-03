# challenge-for-larry
Automatización de front end y servicios web. 

Para abrir la interfaz de usuario de cypress utilice el comando npm run cy:open

Si desea correr las pruebas sin abrir la interfaz de usuario utilice el comando npm run cy:run

#Pruebas de API

Las suite de pruebas de la API expuesta, se encuentra en la altura cypress/integration/test/webServicesTests.spec.js dentro posee los casos de prueba, los mismos consisten en cubirir los casos en los que el servicio responda cualquier otro estado que no fuera 200. Se comprueban tiempos de ejecucion por debajo de los 30000 milisegundos. 

SwaggerUi  https://petstore.swagger.io/#/pet/updatePet

para correr las pruebas de el werbservice, correr el comando npm run cy:run:webServicesTests

#Pruebas de front end
La suite de pruebas del front evalua la pagina de demostracion https://www.demoblaze.com/index.html
Se valida dar de alta un usuario, logearse, y deslogearse. Tambien se deberá agregar un producto al carrito de compras y validar que se encuentre alli. 

para correr las pruebas de el frontend, correr el comando npm run cy:run:frontEndTests


#reportes de allure 

para generar reportes correr el comando cy:allure:run
para abrir la pagina de reportes html correr el comando create-report 
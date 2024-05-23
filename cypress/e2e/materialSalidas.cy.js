describe('Material SAlida API Tests', () => {
    it('Lista de categorias', () => {
        cy.request('GET', 'http://localhost:3000/ApiMinig/Categorias/Categorias')
          .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.Category).to.be.an('array');
            expect(response.body.Category).to.have.length.greaterThan(0);
          });
    });
    let id="";
    it('Crear nuevo material(Test)', () => {
      const newMaterial = {
        nombreMaterial: 'Test Material',
        precio: 10.5,
        cantidad: 100,
        udm:"u",
        detalle: 'Test Detail',
        categoria: 'test',
        fecha: new Date().toISOString()
      };
      cy.request('POST', 'http://localhost:3000/ApiMinig/Materiales/AddMaterial', newMaterial)
        .then((response) => {
          id=response.body.material._id;
          expect(response.status).to.eq(200);
          expect(response.body.material).to.have.property('_id');
        });
    });

    it('Crear nueva salida para el material(Test)', () => {
        const newSalida = {
            material_ID: id,
            salida:{
                fecha: new Date().toISOString(),
                nombreTrabajador:"Miguel Test",
                cantidad:50,
                observacion:"Test Detail"
            }
        };
        cy.request('POST', 'http://localhost:3000/ApiMinig/Materiales/AddSalida', newSalida)
          .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('message','Salida registrada');
        });
    });
    it('Actualizar el material(Test)', () => {
        const materialUpdate = {
          material_ID: id,
          nombreMaterial: 'Updated Test Material',
          precio: 15.5,
          cantidad: 80,
          udm:"kg",
          detalle: 'Updated Test Detail',
          categoria: 'test-updated',
          fecha: new Date().toISOString()
        };
    
        cy.request('PUT', 'http://localhost:3000/ApiMinig/Materiales/UpdateMaterial', materialUpdate)
          .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.material).to.have.property('nombreMaterial', 'Updated Test Material');
          });
    });
    it('Crear nueva salida para el material cuando el valor supere su cantidad(Test)', () => {
        const newSalida = {
            material_ID: id,
            salida:{
                fecha: new Date().toISOString(),
                nombreTrabajador:"Miguel Test",
                cantidad:300,
                observacion:"Test Detail"
            }
        };
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/ApiMinig/Materiales/AddSalida',
            body: newSalida,
            failOnStatusCode: false
        })
          .then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body).to.have.property('message','El valor esta fuera del límite en el inventario');
            expect(response.body).to.have.property('status',false);
        });
    });

    it('Borrar el material(test)', () => {
    cy.request('DELETE', `http://localhost:3000/ApiMinig/Materiales/DeleteMaterial/${id}`)
        .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('message', 'Material eliminado');
        });
    });
})
describe('Material API Tests', () => {
    it('Buscar todos los materiales', () => {
      cy.request('GET', 'http://localhost:3000/ApiMinig/Materiales/Materiales')
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.Material).to.be.an('array');
          expect(response.body.Material).to.have.length.greaterThan(0);
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
    it('Borrar el material(test)', () => {

      cy.request('DELETE', `http://localhost:3000/ApiMinig/Materiales/DeleteMaterial/${id}`)
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('message', 'Material eliminado');
        });
    });
});
  
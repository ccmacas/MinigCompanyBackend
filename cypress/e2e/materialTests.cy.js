describe('Material API Tests', () => {
    it('Buscar todos los materiales', () => {
      cy.request('GET', 'http://192.168.3.5:3000/ApiMinig/Materiales/Materiales')
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.Material).to.be.an('array');
          expect(response.body.Material).to.have.length.greaterThan(0);
        });
    });
});
  
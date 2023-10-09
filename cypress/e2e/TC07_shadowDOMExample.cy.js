describe('Shadow Dom Demo',() => {
    it('Demo of shadow dom',() => {
        cy.visit('https://radogado.github.io/shadow-dom-demo/')
        cy.get('#app').find('#container').find('p')
    })
})
describe('Alerts demo',() => {
    beforeEach(() => {
        cy.visit('https://demoqa.com/alerts')
    })

    it('Confirmation Alert - Click OK',() => {
        const stub = cy.stub()
        cy.on('window:confirm',stub)
        cy.get('#confirmButton').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Do you confirm action?')
        })

        // cy.on('window:confirm',() => true)
        // cy.get('#confirmResult').should('be.visible').and('contain','You selected Ok')

        cy.on('window:confirm',() => false)
        cy.get('#confirmResult').should('be.visible').and('contain','You selected Cancel')
    })
})
describe('Cypress Invoke Examples',() => {
    beforeEach(() => {
        cy.visit('https://demowebshop.tricentis.com/')
    })

    it('Get the value of Search store using invoke command',() => {
        //1. First way to check for the search store value
        cy.get('#small-searchterms').invoke('attr','value').should('equal','Search store')
        
        //2. 
        cy.get('#small-searchterms').as('searchStore')
        cy.get('@searchStore').invoke('attr','value').then( labelText => {
            cy.log(labelText)
            expect(labelText).to.be.equal('Search store')
        })

        //3.
        cy.get('@searchStore').invoke('attr','value').should('equal','Search store')
    })

    it('Get the text value for Register link',() => {
        cy.contains('Register').invoke('text').should('eq','Register')

        cy.contains('Register').invoke('prop','innerText').then(prop =>{
            expect(prop).contains('Register')
        })
    })
})
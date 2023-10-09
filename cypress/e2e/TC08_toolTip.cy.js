describe('Verify the tool tip in cypress',() => {
    beforeEach('Navigate to tooltips page',() => {
        cy.visit('https://demoqa.com/tool-tips')
    })
    it('Tool tip validation',() => {
        cy.get('#toolTipButton').trigger('mouseover')
        cy.get('.tooltip-inner').should('be.visible').and('contain','You hovered over the Button')
        cy.get('.tooltip-inner').then(toolTipText => {
            expect(toolTipText.text()).equals('You hovered over the Button')
        })
    })
})
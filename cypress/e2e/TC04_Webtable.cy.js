describe('Webtable Scenarios',() => {
    it('Handle Webtable',() => {
        cy.visit('https://the-internet.herokuapp.com/tables')

        //1. Check for a value anywhere in row and column
        cy.get('#table1 tr:nth-child(4)').find('td:nth-child(5)').contains('http://www.timconway.com').should('be.visible')

        //2. Iterate the table and get a specific value
        cy.get('#table1 tr td:nth-child(2)').each((ele,index) => {
            let fName = ele.text()
            if(fName === "Frank"){
                cy.wrap(ele).next().next().then($due => {
                    let dueAmount = $due.text()
                    expect(dueAmount).to.be.equal("$51.00")
                })
            }
        })
    })
})
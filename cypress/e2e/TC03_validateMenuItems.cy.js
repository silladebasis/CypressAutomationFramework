describe('validate the menu items',() => {
    it('fetch the menu items and assert the list',() => {
        cy.visit('https://demowebshop.tricentis.com/')
        cy.contains('Log in').click()
        cy.get('ul.list').find('li:nth-child(2) a').click()
        const items = []
        cy.get('.list .sublist li').each(item => {
            cy.log(item.text())
            items.push(item.text().trim())
            
        })
        cy.log(items)
        cy.wrap(items).should('deep.equal',['Desktops','Notebooks','Accessories'])
    })

    it('fetch the menu items and assert the list',() => {
        cy.visit('https://demowebshop.tricentis.com/')
        cy.contains('Log in').click()
        cy.get('ul.list').find('li:nth-child(2) a').click()
        cy.get('.list .sublist li').then((items) => {
            const itemsText = Array.from(items,(item) => item.innerText)
            expect(itemsText).to.include('Desktops')
        })
       
    })
})
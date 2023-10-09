describe('Login Test using cypress session',() => {

    const login = () => {
        cy.session('login',() => {
            cy.visit('/')
            cy.contains('Log in').click()
            cy.login('debasis@gmail.com','test@123')
        })
    }
    beforeEach(() => {
        login()
        cy.visit('/')
    })

    it('Get Title after login',() => {
        cy.title().should('include','Web Shop')
    })

    it('Search Product',() => {
        cy.get('#small-searchterms').type('Laptop')
        cy.get('.ui-menu-item a').then(($ele,index,list) => {
            let productText = $ele.text()
            cy.log(productText)
            cy.wrap($ele).click()
            cy.url().should('include','141-inch-laptop')
        })
        cy.get('.product-price span').then((price) => {
            let priceText = price.text()
            cy.log(priceText)
        })
    })
})
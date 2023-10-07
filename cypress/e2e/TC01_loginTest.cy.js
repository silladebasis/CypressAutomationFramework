describe('Validate Login Tests',function(){
    let userData;
    beforeEach(() => {
        cy.visit('https://demowebshop.tricentis.com/')
        cy.contains('Log in').click()
        cy.url().should('includes','/login')
        cy.fixture('testData.json').then(function(data){
            userData = data
        })
    })

    it('Valid Login Test',function(){
        cy.get('#Email').type('debasis@gmail.com')
        cy.get('#Password').type('test@123')
        cy.get('input[value="Log in"]').click()
        cy.contains('Log out').click()
    })

    it('Invalid Login Test',function(){
        cy.get('#Email').type('debasis@gmail.com')
        cy.get('#Password').type('test@12')
        cy.get('input[value="Log in"]').click()
        cy.get('.validation-summary-errors ').then($el => {
            expect($el.text()).to.contain('The credentials provided are incorrect')
        })
    })

    it('Login Test using custom command',function(){
        cy.login('debasis@gmail.com','test@123')
        cy.contains('Log out').click()
    })

    it('Login Test using fixtures',function(){
        cy.login(userData.email,userData.password)
        cy.contains('Log out').click()
    })
})
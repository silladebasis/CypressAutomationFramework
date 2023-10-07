describe('Search Product Tests',function(){
    let userData
    beforeEach(() => {
        cy.visit('https://demowebshop.tricentis.com/')
        cy.contains('Log in').click()
        cy.url().should('includes','/login')
        cy.fixture('testData.json').then((data) => {
            userData = data
        })
    })

    it('Search Product Test',function(){
        cy.login(userData.email,userData.password)
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

        cy.get('.add-to-cart [value="Add to cart"]').click().then(() => {
            cy.get('p.content').should('be.visible')
            cy.get('p.content').then(addToCartMsg => {
                expect(addToCartMsg.text()).to.equal(userData.addCartMsg)
            })
        })

        cy.contains('Shopping cart').click()
        cy.get('select[id="CountryId"]').select('India')
        cy.get('#termsofservice').check()
        cy.get('button[value="checkout"]').click()

        cy.get('select[name="billing_address_id"]').select('New Address')
        cy.get('select[id="BillingNewAddress_CountryId"]').select('India')
        cy.get('#BillingNewAddress_City').type('Delhi')
        cy.get('#BillingNewAddress_Address1').type('123 Main Street')
        cy.get('#BillingNewAddress_ZipPostalCode').type('191911')
        cy.get('#BillingNewAddress_PhoneNumber').type('1808373000')
        cy.get('[onclick="Billing.save()"]').click()

        cy.get('[onclick="Shipping.save()"]').click()
        cy.get('.method-list li')
        cy.get('.method-list li').should('have.length',3)
        cy.get('.method-list li').find('div label').each(($el,index)=>{
            cy.log($el.text())
            if($el.text() === "Next Day Air (0.00)"){
                cy.wrap($el).click()
            }
        })
        cy.get('[onclick="ShippingMethod.save()"]').click()
        cy.get('[onclick="PaymentMethod.save()"]').click()
        cy.get('[onclick="PaymentInfo.save()"]').click()
        cy.get('[onclick="ConfirmOrder.save()"]').click()
        cy.wait(2500)
        cy.get('.title').then(orderText => {
            expect(orderText.text().trim()).to.be.equal('Your order has been successfully processed!')
        })
        let orderNo
        cy.get('.details li').first().then(orderNumber => {
            orderNo = orderNumber.text().split(":")
            cy.log(orderNo[1].trim())
        })
        cy.contains('Click here for order details.').click()
        cy.get('.order-number').then(confirmOrderNo => {
            expect(confirmOrderNo.text().trim()).includes(orderNo[1].trim())
        })
    })

})
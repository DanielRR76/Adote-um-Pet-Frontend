describe ('GET A PET', () => {
    it ('should show the details of a pet', () => {
        cy.visit('http://localhost:3000/')
        cy.get('[href="/pet/15"]').click()
        cy.get('a').contains('criar').click()
    })
})
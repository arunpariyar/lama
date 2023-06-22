describe('The Home Page', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:4000/register', {name: 'llama', email: 'llama@dispostable.com', password: 'hello'})
    .its('body')
    .as('currentUser')
  })

  it('able to log in', function() {
    const { email } = this.currentUser;
    cy.visit('/login'),
    cy.get('input[name=email]').type(email);
    cy.get('input[name=pw]').type(`${'hello'}{enter}`);
    cy.url().should('include', '/dashboard')
  })
});
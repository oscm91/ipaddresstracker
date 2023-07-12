describe('ipaddresstracker', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the form', () => {
    cy.get('.tracker__form').should('be.visible');
    cy.get('.tracker__form--input').should('be.visible');
    cy.get('.tracker__form--btn').should('be.visible');
  });

  it('should display error message for invalid IP', () => {
    cy.get('.tracker__form--input').type('invalid-ip');
    cy.get('.tracker__form--btn').click();
    cy.get('.tracker__form--error-message').should('be.visible');
  });

  it('should display IP details for valid IP', () => {
    cy.get('.tracker__form--input').type('8.8.8.8');
    cy.get('.tracker__form--btn').click();
    cy.get('.tracker__results').should('be.visible');
    cy.get('.tracker__results--list').should('be.visible');
    cy.get('.tracker__results--card').should('have.length', 4);
  });

  it('should display map', () => {
    cy.get('.tracker__map').should('be.visible');
  });
});

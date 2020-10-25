/// <reference types="cypress" />

/**
 * Base class for page objects
 */
class Page {
  /** @type {string} */
  absoluteUrl;
  /** @type {string} */
  relativeUrl;

  constructor(relativeUrl) {
    this.relativeUrl = relativeUrl;
    this.absoluteUrl = Cypress.config().baseUrl + relativeUrl;
  }

  visit(options = {}) {
    cy.visit(this.relativeUrl, options);
    this.assertLoaded();
  }

  assertLoaded() {
    cy.url().should("eq", this.absoluteUrl);
  }
}

export { Page };

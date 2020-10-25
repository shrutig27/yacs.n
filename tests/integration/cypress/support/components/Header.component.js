/// <reference types="cypress" />

import { Component } from "./component";

class HeaderSignedInUser extends Component {
  constructor(parentSelector) {
    super(parentSelector, " [data-cy=signed-in-user]");
  }
}

class HeaderSemester extends Component {
  constructor(parentSelector) {
    super(parentSelector, " [data-cy=semester]");
  }
}

class Header extends Component {
  /**
   *
   * @param {string} parentSelector
   */
  constructor(parentSelector) {
    super(parentSelector, " [data-cy=header]");
  }

  // clickBrand() {
  //   cy.get(this.selector + " [data-cy=brand]");
  // }

  semester = new HeaderSemester();
  signedInUser = new HeaderSignedInUser("");

  goToSchedulePage() {
    cy.get(this.selector + " [data-cy=schedule]").click();
  }

  goToExplorePage() {
    cy.get(this.selector + " [data-cy=explore]").click();
  }

  /**
   *
   * @param {string} email
   * @param {string} password
   */
  login(email, password) {
    cy.get(this.selector + " [data-cy=login]").click();
    cy.get("[data-cy=login-form] [data-cy=email]").type(email);
    cy.get("[data-cy=login-form] [data-cy=password]").type(password);
    cy.get("[data-cy=login-form] [data-cy=submit]").click();
  }

  /**
   *
   * @param {string} fullName
   * @param {string} email
   * @param {string} password
   * @param {"Undergraduate"|"Graduate"} degree
   * @param {string} major
   */
  signUp(fullName, email, password, degree, major) {
    cy.get(this.selector + " [data-cy=sign-up]").click();
    cy.get("[data-cy=signup-form] [data-cy=full-name]").type(fullName);
    cy.get("[data-cy=signup-form] [data-cy=email]").type(email);
    cy.get("[data-cy=signup-form] [data-cy=password]").type(password);
    cy.get("[data-cy=signup-form] [data-cy=degree]").select(degree);
    cy.get("[data-cy=signup-form] [data-cy=major]").type(major);
  }

  signOut() {
    this.signedInUser.get().click();
    cy.get(this.selector + " [data-cy=sign-out]").click();
  }

  toggleDarkMode() {
    cy.get(this.selector + " [data-cy=darkmode-toggle]").click();
  }

  toggleNavbar() {
    cy.get(this.selector + " [data-cy=navbar-toggle]").click();
  }
}

export { Header };

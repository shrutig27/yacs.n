/// <reference types="cypress" />

/**
 * Base class for component objects
 */
class Component {
  /**
   * The "absolute path" of selectors to this component.
   * This is created by doing `parentSelector` + `componentSelector`
   *
   * E.g. for a `<Header>` component,
   * its `componentSelector` could be `[data-cy=header]`.
   * Its `parentSelector` path could be something like `[data-cy=app][data-cy=root]`.
   * Thus, `selector` will be `[data-cy=app][data-cy=root][data-cy=header]`.
   * The `selector` must be unique in the DOM so can Cypress find the element.
   *
   * @type {string}
   */
  selector;

  /**
   * Initializes the component given the `parentSelector` and `componentSelector`.
   * This is designed to be used internally by subclass constructors.
   * @param {string} parentSelector
   * @param {string} componentSelector
   */
  constructor(parentSelector, componentSelector) {
    this.selector = parentSelector + componentSelector;
  }

  /** Returns Cypress chainable for this instance */
  get() {
    return cy.get(this.selector);
  }
}

export { Component };

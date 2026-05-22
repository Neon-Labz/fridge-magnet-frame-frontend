/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    getVisible(selector: string): Chainable<JQuery<HTMLElement>>;
    typeSafe(selector: string, text: string): Chainable<void>;
    clickSafe(selector: string): Chainable<void>;
  }
}
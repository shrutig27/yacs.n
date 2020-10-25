/// <reference types="cypress" />

import qs from "qs";

import { Header } from "../components/Header.component";
import { Page } from "./page";

class CourseSchedulerPage extends Page {
  /** @type {string} e.g. FALL 2020 */
  semester;

  /**
   *
   * @param {string} semester
   */
  constructor(semester) {
    super("/");
    this.semester = semester;
  }

  header = new Header("");

  assertLoaded() {
    cy.url().should(
      "eq",
      this.absoluteUrl +
        qs.stringify({ semester: this.semester }, { addQueryPrefix: true })
    );
  }

  visit() {
    super.visit({
      qs: {
        semester: this.semester,
      },
    });
  }
}

export { CourseSchedulerPage };

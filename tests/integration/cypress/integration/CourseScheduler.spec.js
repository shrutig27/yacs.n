/// <reference types="cypress" />

import { CourseSchedulerPage } from "../support/pages/CourseScheduler.page";
import { CourseExplorerPage } from "../support/pages/CourseExplorerPage.page";

context("Course Scheduler Page", () => {
  const page = new CourseSchedulerPage("SUMMER 2020");

  beforeEach(() => {
    page.visit();
  });

  it("should go to explore page", () => {
    page.header.goToExplorePage();

    const explorePage = new CourseExplorerPage();
    explorePage.assertLoaded();
  });
});

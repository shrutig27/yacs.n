/// <reference types="cypress" />

import { CourseSchedulerPage } from "../support/pages/CourseScheduler.page";
import { CourseExplorerPage } from "../support/pages/CourseExplorerPage.page";

context("Course Explorer Page", () => {
  const page = new CourseExplorerPage();

  beforeEach(() => {
    page.visit();
  });

  it("should go to schedule page", () => {
    page.header.goToSchedulePage();

    const schedulePage = new CourseSchedulerPage("SUMMER 2020");
    schedulePage.assertLoaded();
  });
});

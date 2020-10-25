/// <reference types="cypress" />

import { Header } from "../components/Header.component";
import { Page } from "./page";

class CourseExplorerPage extends Page {
  constructor() {
    super("/explore");
  }

  header = new Header("");
}

export { CourseExplorerPage };

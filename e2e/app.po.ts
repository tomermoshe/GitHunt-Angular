import { browser, element, by } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getNavText() {
    return element(by.css('app-root div.navbar-header.active > a.navbar-brand')).getText();
  }
}

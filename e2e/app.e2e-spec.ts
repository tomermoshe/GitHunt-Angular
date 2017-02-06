import { AppComponentPage } from './app.po';

describe('AppComponent App', function() {
  let page: AppComponentPage;

  beforeEach(() => {
    page = new AppComponentPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('<%= prefix %> works!');
  });
});
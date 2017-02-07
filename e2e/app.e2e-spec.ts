import { AppPage } from './app.po';

describe('App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should have GitHunt in the navigation bar', () => {
    page.navigateTo();
    expect(page.getNavText()).toEqual('GitHunt');
  });
});

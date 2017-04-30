import { MlWebappPage } from './app.po';

describe('ml-webapp App', () => {
  let page: MlWebappPage;

  beforeEach(() => {
    page = new MlWebappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

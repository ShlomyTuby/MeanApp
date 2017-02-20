import { AngularSrcPage } from './app.po';

describe('Main Page', function() {
  let page: AngularSrcPage;

  beforeEach(() => {
    page = new AngularSrcPage();
  });

  it('should display Main Header on defult page [home]', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('MEAN Authentication App');
  });
});

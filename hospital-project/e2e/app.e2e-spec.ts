import { HospitalProjectPage } from './app.po';

describe('hospital-project App', () => {
  let page: HospitalProjectPage;

  beforeEach(() => {
    page = new HospitalProjectPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});

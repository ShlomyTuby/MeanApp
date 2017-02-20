import { AngularSrcPage } from './app.po';

describe('Login Page', function() {
  let page: AngularSrcPage;

  beforeEach(() => {
    page = new AngularSrcPage();
  });

  it('should display Login Text On Header', () => {
    page.navigateTo('login');
    expect(page.getPageHeaderText()).toEqual('Login');
  });

  it('should display error message on empty loginame', () => {
    page.navigateTo('login',true);
    page.clearInputValue('username');
    page.submitForm();
    page.getFlashMessage().then( res => {
      expect(res.type).toEqual('danger');
      expect(res.text).toContain('User not found');
    });
  });

  it('should display error message on empty password', () => {
    page.navigateTo('login',true);
    page.clearInputValue('password');
    page.setInputValue('username','shalomt');
    page.submitForm();
    page.getFlashMessage().then( res => {
      expect(res.type).toEqual('danger');
      expect(res.text).toContain('Username or password incurrect');
    });
  });

    it('should display error message on wrong loginame', () => {
    page.navigateTo('login',true);
    page.setInputValue('username','unCurrectUsername');
    page.submitForm();
    page.getFlashMessage().then( res => {
      expect(res.type).toEqual('danger');
      expect(res.text).toContain('User not found');
    });
  });
    

  it('should display error message on wrong password', () => {
    page.navigateTo('login',true);
    page.setInputValue('password','unCurrectPassword');
    page.setInputValue('username','shalomt');
    page.submitForm();
    page.getFlashMessage().then( res => {
      expect(res.type).toEqual('danger');
      expect(res.text).toContain('Username or password incurrect');
    });
  });


  it('should display info message on currect password and username', () => {
    page.navigateTo('login',true);
    page.setInputValue('password','123456');
    page.setInputValue('username','shalomt');
    page.submitForm();
    page.getFlashMessage().then( res => {
      expect(res.type).toEqual('info');
      expect(res.text).toContain('Login Seccessfuly');
    });
  });

  it('should navigated to dashboard on currect password and username', () => {
    page.navigateTo('login',true);
    page.setInputValue('password','123456');
    page.setInputValue('username','shalomt');
    page.submitForm();
    page.getCurrentUrl().then(url => {
      expect(url.substring(url.length-9,url.length)).toBe('dashboard');
    });
  });
    

});

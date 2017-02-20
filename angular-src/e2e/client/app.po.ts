import { browser, element, by, promise, $, protractor } from 'protractor';

export class AngularSrcPage {
  navigateTo(innerUrl?: string, reset?: boolean) {
    var url = 'http://localhost:4200/';
    if (reset) {
      browser.get(url);
    }
    if (innerUrl) {
      url += innerUrl;
    }
    console.log('browser navigateTo: ' + url);
    return browser.get(url);
  }

  getCurrentUrl(){
    return browser.getCurrentUrl();
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getPageHeaderText() {
    return element(by.css('.page-header')).getText();
  }

  getFlashMessage(): any {

    let p = new promise.Deferred();
    var m = browser.driver.findElement(by.css('.flash-message'));

    var a = m.getAttribute('class')
      .then((classs) => {
        let type: string;
        if (classs.indexOf('danger') >= 0) {
          type = 'danger'
        } else {
          type = 'success'
        }

        var result = {
          text: m.getText(),
          type: type
        }
        p.fulfill(result);

      });

    return p.promise;
  }

  /** form utils */
  clearInputValue(inputName: string) {
    element(by.name(inputName)).clear();
  }

  setInputValue(inputName: string, value: string) {
    element(by.name(inputName)).sendKeys(value);
  }

  submitForm(name?: string) {
    if (name) {
      var form = element(by.name(name));
      if (form) {
        form.submit();
      }
    } else {
      element.all(by.tagName('form')).submit();
    }
  }

}

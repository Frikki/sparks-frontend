declare module 'nightwatch' {
  export interface PageObjects {
    signin(): {
      navigate(): NightWatchBrowser;
    };
  }
}

export = {
  url: 'http://localhost:8080/connect',
  elements: {
    googleButton: {
      selector: '.c-btn-federated--google',
    },
    facebookButton: {
      selector: '.c-btn-federated--facebook',
    },
  },
};
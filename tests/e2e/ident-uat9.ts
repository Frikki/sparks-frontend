import {NightWatchBrowser} from 'nightwatch';

import * as admin from 'firebase-admin';

const {
        FIREBASE_DATABASE_URL,
        EMAIL_AND_PASSWORD_TEST_EMAIL, EMAIL_AND_PASSWORD_TEST_PASSWORD
      } = process.env;

function getAuthAdmin() {
  const serviceAccount = require('../../../firebase.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: FIREBASE_DATABASE_URL,
  });
  return admin.auth() as any;
}

let authAdmin: any = getAuthAdmin();

function createUser(email: string, pwd: string) {
  return authAdmin.createUser({
    email: email,
    emailVerified: false,
    password: pwd,
    displayName: email,
    disabled: false
  })
    .then(function (userRecord: any) {
      console.log("Successfully created a new user:", userRecord.emailInternal);
    })
    .catch(function (error: any) {
      console.error("Error creating new user:", error);
      throw error;
    });
}

function deleteIfExistsAndRecreateUser(email: string, pwd: string) {
  deleteUserAndReturnPromise(email)
    .catch(() => {
      // user does not exist already in the database - expected
    })
    .then(() => createUser(email, pwd))
  ;
}

function deleteUserAndReturnPromise(email: string) {
  return authAdmin.getUserByEmail(email)
    .then((userRecord: any) => {
      return authAdmin.deleteUser(userRecord.uid);
    })
}

function deleteUser(email: string) {
  deleteUserAndReturnPromise(email);
}

function testWrongPassword(browser: NightWatchBrowser) {
  browser
    .url('localhost:8080/signin')
    .waitForElementVisible('#page', 1000) // wait for the page to display
    .setValue('.c-textfield__input--email', EMAIL_AND_PASSWORD_TEST_EMAIL)
    .setValue('.c-textfield__input--password', EMAIL_AND_PASSWORD_TEST_PASSWORD + 'dummy')
    .click('.c-btn.c-btn--primary.c-sign-in__submit') // click submit button
    .pause(4000) // give it time to redirect
    .assert.urlContains('signin') // we are on the same page
    .assert.containsText('.c-textfield--errorfield', 'Wrong password')
}

function testWrongEmail(browser: NightWatchBrowser) {
  browser
    .url('localhost:8080/signin')
    .waitForElementVisible('#page', 1000) // wait for the page to display
    .setValue('.c-textfield__input--email', EMAIL_AND_PASSWORD_TEST_EMAIL + 'dummy')
    .setValue('.c-textfield__input--password', EMAIL_AND_PASSWORD_TEST_PASSWORD)
    .click('.c-btn.c-btn--primary.c-sign-in__submit') // click submit button
    .pause(4000) // give it time to redirect
    .assert.urlContains('signin') // we are on the same page
    .assert.containsText('.c-textfield--errorfield', 'Wrong email')
}

export = {
  before: deleteIfExistsAndRecreateUser(EMAIL_AND_PASSWORD_TEST_EMAIL, EMAIL_AND_PASSWORD_TEST_PASSWORD),
  after: deleteUser(EMAIL_AND_PASSWORD_TEST_EMAIL),
  'IDENT UAT 9: Sign in with email, incorrect u/p combination': function execTest(browser: NightWatchBrowser) {
    testWrongPassword(browser);
    testWrongEmail(browser);
    browser.end();
  }
};

import { EmailAddress } from './EmailAddress';

export class UserCandidate {
  private _emailAddress: EmailAddress;
  private _password: string;

  constructor(emailAddress: EmailAddress, password: string) {
    if (!password)
      throw new Error(`\`password\` required.`);

    this._emailAddress = emailAddress;
    this._password = password;
  }

  emailAddress(): EmailAddress {
    return this._emailAddress;
  }

  password(): string {
    return this._password;
  }
}
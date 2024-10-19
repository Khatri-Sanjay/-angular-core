export class User {

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    gender: string,
    contact: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.gender = gender;
    this.contact = contact;
  }

  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  gender?: string;
  contact?: string;
}

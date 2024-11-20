export interface ContactFormInputs {
  firstname: string;
  surname: string;
  email: string;
  telephonenumber: string;
  title: string;
  organisation: string;
  message: string;
  roles: string[]; // Array to hold multiple selections
  phoneValidated: boolean;
}

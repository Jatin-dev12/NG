
import { InjectionToken } from '@angular/core';
export const defaultErrors = {
  required: (error: any) => `this_field is required`,
  email: (error: any) => `Email address not valid`,
  maxlength: ({ requiredLength, actualLength }: any) => `Expect ${requiredLength} but got ${actualLength}`,
  minlength: ({ requiredLength, actualLength }: any) => `Expect ${requiredLength} but got ${actualLength}`,
  pattern: (error: any) => `this_field not valid`,
  min: (error: any) => `Min not valid`,
  max: (error: any) => `Max not valid`,
  minLength: ({ requiredLength, actualLength }: any) => `Expect ${requiredLength} but got ${actualLength}`,
  maxLength: ({ requiredLength, actualLength }: any) => `Expect ${requiredLength} but got ${actualLength}`,
  minLengthArray: ({ requiredLength, actualLength }: any) => `Expect ${requiredLength} but got ${actualLength}`,
  maxLengthArray: ({ requiredLength, actualLength }: any) => `Expect ${requiredLength} but got ${actualLength}`,
  urlValid: (error: any) => `Url not valid`,
  mustMatch: (error: any) => `this_field should be match`,
  url: (error: any) => `Url not valid`,
  passwordStrength: (error: any) => error,
  emailExistWithRole: (error: any) => error,
  emailExists: (error: any) => `Email already exists`,
  emailNotExists: (error: any) => `Email Not exists`,
  cannotContainSpace: (error: any) => `this_field cannot contain space`,
  trimValidatorStart: (error: any) => `this_field has leading whitespace`,
  trimValidatorEnd: (error: any) => `this_field has trailing whitespace`,
  isEmptyOrSpaces: (error: any) => `this_field should not be blank`,
  mustMatchPhone: (error: any) => `this.field should not be match`,
}

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => defaultErrors
});



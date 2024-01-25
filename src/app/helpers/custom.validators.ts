import { AbstractControl, UntypedFormArray, UntypedFormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {


	/*
		'hobbies':new FormArray([],ArrayValidators.minLength(2)) // Use it
	*/
	// max length
	public static maxLength(max: number): ValidatorFn | any {
		return (control: AbstractControl[]) => {
			if (!(control instanceof UntypedFormArray)) return;
			return control.length > max ? { maxLength: true } : null;
		}
	}

	// min length
	public static minLength(min: number): ValidatorFn | any {
		/*return (control: AbstractControl[]) => {
			if (!(control instanceof FormArray)) return;
			return control.length < min ? { minLength: true } : null;
		}*/
		return (c: AbstractControl): { [key: string]: any } | any => {
			//console.log('c.value?.length', c.value, c.value?.length, min)
			if (c.value?.length >= min) {
				return null;
			};
			return { minLength: true };
		}
	}

	// url validator
	public static url(control: AbstractControl) {
		if (!control.value?.startsWith('https') || (!control.value?.includes('.me') && !control.value?.includes('.com') && !control.value?.includes('.in'))) {
			return { urlValid: true };
		}
		return null;
	}

	public static minLengthArray = (min: number) => {
		return (c: AbstractControl): { [key: string]: any } | any => {
			if (c.value?.length >= min) {
				return null;
			};
			return { minLengthArray: true };
		}
	}

	public static maxLengthArray(max: number) {
		return (c: AbstractControl): { [key: string]: any } | any => {
			//console.log('c.value', c.value, max, (c.value?.length < max) )
			if (c.value?.length < max) {
				//console.log('c.value123', c.value, max )
				return null;
			};
			return { maxLengthArray: true };
		}
	}

	public static createPasswordStrengthValidator(): ValidatorFn | any {
		return (control: AbstractControl): ValidationErrors | null => {
			const value = control.value;
			if (!value) {
				return null;
			}
			const hasUpperCase = /[A-Z]+/.test(value);
			const hasLowerCase = /[a-z]+/.test(value);
			const hasNumeric = /[0-9]+/.test(value);
			const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;
			return !passwordValid ? { passwordStrength: true } : null;
		}
	}

	static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
		if ((control.value as string).indexOf(' ') >= 0) {
			return { cannotContainSpace: true }
		}
		return null;
	}

	static trimValidatorStart(control: AbstractControl): ValidationErrors | null {
		if ((control.value as string).startsWith(' ')) {
			return { trimValidatorStart: true }
		}
		return null;
	}

	static trimValidatorEnd(control: AbstractControl): ValidationErrors | null {
		if ((control.value as string).endsWith(' ')) {
			return { trimValidatorEnd: true }
		}
		return null;
	}
	static isEmptyOrSpaces(control: AbstractControl): ValidationErrors | null {
		let value = control.value as string;
		if (value === null || value.match(/^ *$/) !== null) {
			return { isEmptyOrSpaces: true }
		}
		return null;
	}
}


export function MustMatch(controlName: string, matchingControlName: string) {
	return (formGroup: UntypedFormGroup) => {
		const control = formGroup.controls[controlName];
		const matchingControl: any = formGroup.controls[matchingControlName];
		if (matchingControl.errors && !matchingControl.errors.mustMatch) {
			// return if another validator has already found an error on the matchingControl
			return;
		}
		// set error on matchingControl if validation fails
		if (control.value !== matchingControl.value) {
			matchingControl.setErrors({ mustMatch: true });
		} else {
			matchingControl.setErrors(null);
		}
	}
}

export function MustMatchPhone(controlName: string, matchingControlName: string) {
	return (formGroup: UntypedFormGroup) => {
		const control = formGroup.controls[controlName];
		const matchingControl: any = formGroup.controls[matchingControlName];
		if (matchingControl.errors && !matchingControl.errors.mustMatchPhone) {
			return;
		}
		if (control.value?.e164Number !== matchingControl.value?.e164Number) {
			matchingControl?.setErrors({ mustMatchPhone: true });
		} else {
			matchingControl?.setErrors(null);
		}
	}
}


export const PasswordStrengthValidator: any = function (control: AbstractControl): ValidationErrors | null {
	let value: string = control.value || '';
	if (!value) {
		return null
	}
	let minLength = 6;
	let msg = 'At least 8 characters. (Min 1 uppercase, 1 lowercase, 1 number and 1 special character)';
	if (value?.length <= minLength) {
		return { passwordStrength: msg };
	}
	let upperCaseCharacters = /[A-Z]+/g
	if (upperCaseCharacters.test(value) === false) {
		return { passwordStrength: msg };
	}
	let lowerCaseCharacters = /[a-z]+/g
	if (lowerCaseCharacters.test(value) === false) {
		return { passwordStrength: msg };
	}
	let numberCharacters = /[0-9]+/g
	if (numberCharacters.test(value) === false) {
		return { passwordStrength: msg };
	}
	let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
	if (specialCharacters.test(value) === false) {
		return { passwordStrength: msg };
	}
	return null;
}

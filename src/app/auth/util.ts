import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function emailValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    // if (control.errors && Object.keys(control.errors).filter(errorName => errorName !== 'email').length > 0) {
    //     return null;
    // }

    if (!value) {
        return null
    }

    if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
        return {
            email: true,
        }
    }
    return null;
}


export function passwordMatch(passwordFormControl: AbstractControl) {
    const validtorFn: ValidatorFn = (repassFormControl: AbstractControl) => {
        if (passwordFormControl.value !== repassFormControl.value) {
            return {
                passwordMissmatch: true
            }
        }

        return null;
    }

    return validtorFn;
}

export function passwordMatch2(passwordFormControl: AbstractControl): ValidationErrors | null {
    const passwordGroup = passwordFormControl.parent as FormGroup;

    if (!passwordGroup) {
        return null;
    }

    const { password, rePassword } = passwordGroup.controls;
    if (password.value !== rePassword.value) {
        return {
            passwordMatch2: true
        }
    }

    return null;
}
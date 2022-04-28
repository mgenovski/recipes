import { AbstractControl, ValidationErrors } from "@angular/forms";

export function urlValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) {
        return null
    }

    if (!/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(value)) {
        return {
            imgUrl: true,
        }
    }
    return null;
}
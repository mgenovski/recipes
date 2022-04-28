import { Directive, Inject } from "@angular/core";
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from "@angular/forms";
import { urlValidator } from "./util";

@Directive({
    selector: '[urlValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: UrlValidatorDirective, multi: true }]
})
export class UrlValidatorDirective implements Validator {

    constructor() {
    }

    validate(control: AbstractControl): ValidationErrors | null {
        return urlValidator(control);
    }
}
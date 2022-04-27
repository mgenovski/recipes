import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/user.service';
import { emailValidator, passwordMatch } from '../util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerError: string = ''

  passwordControl = new FormControl(null, [Validators.required, Validators.minLength(5)]);

  get passwordsGroup(): FormGroup {
    return this.registerFormGroup.controls['passwords'] as FormGroup;
  }

  registerFormGroup: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required, emailValidator]),
    'passwords': new FormGroup({
      'password': this.passwordControl,
      'repass': new FormControl(null, [Validators.required, passwordMatch(this.passwordControl)]),
    }),
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });



  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) { }


  ngOnInit(): void {
  }

  handleRegister(): void {
    this.registerError = '';
    this.userService.register$(this.registerFormGroup.value.email, this.registerFormGroup.value.passwords.password, this.registerFormGroup.value.name).subscribe({
      next: user => {
        localStorage.setItem('name', user.name);
        localStorage.setItem('email', user.email);
        localStorage.setItem('id', user._id);
        localStorage.setItem('accessToken', user.accessToken);
        this.router.navigate(['']);
      },
      complete: () => {},
      error: (err) => {
        this.registerError = err.error.message;
      }
    });
  }
}

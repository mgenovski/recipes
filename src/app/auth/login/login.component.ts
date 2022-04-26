import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/user.service';
import { emailValidator } from '../util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public loginError: string = ''

  loginFormGroup: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required, emailValidator]),
    password: new FormControl(null, [Validators.required, Validators.minLength(5)])
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) { }


  ngOnInit(): void {
  }

  handleLogin(): void {
    this.loginError = '';
    this.userService.login$(this.loginFormGroup.value).subscribe({
      next: user => {
        console.log(user);
        localStorage.setItem('name', user.name);
        localStorage.setItem('email', user.email);
        localStorage.setItem('accessToken', user.accessToken);
        this.router.navigate(['']);
      },
      complete: () => {
        console.log('login stream completed')
      },
      error: (err) => {
        this.loginError = err.error.message;
      }
    });
  }

}

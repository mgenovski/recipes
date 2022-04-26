import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailValidatorDirective } from './email-validator.directive';
import { UserService } from '../core/user.service';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    EmailValidatorDirective
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService
  ]
})
export class AuthModule { }

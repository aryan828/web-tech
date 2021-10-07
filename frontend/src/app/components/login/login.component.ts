import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";

import {UserService} from "../../shared/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {User} from "../../shared/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  login = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  });

  ngOnInit(): void {
  }

  getUser(data: FormGroup, directive: FormGroupDirective): void {
    this.userService.checkUser(data.value.email).subscribe(response => {
      if (response.password == data.value.password) {
        this.router.navigate(['/user'], {state: {data: response}});
      } else {
        this._snackBar.open('Wrong Password', 'DISMISS', {duration: 3000});
        data.value.password = '';
      }
    }, error => {
      if (error.status == 400)
        this._snackBar.open('Incorrect E-mail', 'DISMISS', {duration: 3000});
        data.reset();
        directive.resetForm();
    });

  }


}

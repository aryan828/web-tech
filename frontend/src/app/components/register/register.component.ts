import { Component, OnInit } from '@angular/core';
import {UserService} from "../../shared/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup} from "@angular/forms";
import {User} from "../../shared/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  selected: number = 1;

  constructor(private userService: UserService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  profile = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    old: new FormControl(''),
    newp: new FormControl(''),
    cnewp: new FormControl('')
  });
  contact = new FormGroup({
    phone: new FormControl(''),
    mobile: new FormControl(''),
    address: new FormControl('')
  });
  additional = new FormGroup({
    hobby: new FormControl(''),
    movie: new FormControl(''),
    series: new FormControl(''),
    game: new FormControl('')
  });

  newUser(): void {
    if (this.profile.value.name == '') {
      this.snackBar.open('Invalid Name', 'DISMISS', {duration: 3000});
    } else if (this.profile.value.email == '') {
      this.snackBar.open('Invalid Email', 'DISMISS', {duration: 3000});
    } else if (this.profile.value.newp == '') {
      this.snackBar.open('Password cannot be blank', 'DISMISS', {duration: 3000});
    } else if (this.profile.value.newp != this.profile.value.cnewp) {
      this.snackBar.open('Password not matching', 'DISMISS', {duration: 3000});
    } else {
      const user: User = {
        address: this.contact.value.address,
        email: this.profile.value.email,
        game: this.additional.value.game,
        hobby: this.additional.value.hobby,
        mobile: this.contact.value.mobile,
        movie: this.additional.value.movie,
        name: this.profile.value.name,
        password: this.profile.value.newp,
        phone: this.contact.value.phone,
        series: this.additional.value.series
      };
      console.log(user);
      this.userService.newUser(user).subscribe(result => {
        this.router.navigate(['']);
      }, error => {
        if (error.status == 400)
          this.snackBar.open('E-mail already in use.', 'DISMISS', {duration: 3000});
      });
    }
  }
}

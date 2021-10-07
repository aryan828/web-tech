import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../shared/user.service";
import {User} from "../../shared/user.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  selected: number = 1;
  email: string = '';

  constructor(private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  profile = new FormGroup({
    name: new FormControl(history.state.data.name),
    email: new FormControl({value: history.state.data.email, disabled: true}),
    old: new FormControl(),
    newp: new FormControl(),
    cnewp: new FormControl()
  });
  contact = new FormGroup({
    phone: new FormControl(history.state.data.phone),
    mobile: new FormControl(history.state.data.mobile),
    address: new FormControl(history.state.data.address)
  });
  additional = new FormGroup({
    hobby: new FormControl(history.state.data.hobby),
    movie: new FormControl(history.state.data.movie),
    series: new FormControl(history.state.data.series),
    game: new FormControl(history.state.data.game)
  });

  update(): void {
    const user: User = {
      _id: history.state.data._id,
      address: this.contact.value.address,
      email: history.state.data.email,
      game: this.additional.value.game,
      hobby: this.additional.value.hobby,
      mobile: this.contact.value.mobile,
      movie: this.additional.value.movie,
      name: this.profile.value.name,
      password: history.state.data.password,
      phone: this.contact.value.phone,
      series: this.additional.value.series
    };
    console.log(this.profile.value.newp);
    if (this.profile.value.newp && this.profile.value.newp == this.profile.value.cnewp) {
      if (this.profile.value.old != user.password)
        this.snackBar.open('Incorrect Password', 'DISMISS', {duration: 3000});
      else
        user.password = this.profile.value.newp;
    }
    this.userService.updateUser(user).subscribe();
    console.log(user);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  regForm = new FormGroup({
    firstname : new FormControl('', [Validators.required, Validators.min(2)]),
    lastname : new FormControl('', []),
    username : new FormControl('', [Validators.required]),
    password : new FormControl('', [Validators.required])
  });

  constructor() { }

  ngOnInit(): void {
  }

  onRegFormSubmit = (regFormDir: FormGroupDirective) => {
    // let user = new UserModel(
    //   this.regForm.controls['firstname'].value,
    //   this.regForm.controls['username'].value,
    //   this.regForm.controls['password'].value,
    //   this.regForm.controls['lastname'].value,
    // );
    // this.userService.addNewUser(user).subscribe(
    //   data=> {
    //     regFormDir.resetForm();
    //     alert("Registration successful");
    //   }, error => {
    //     console.log(JSON.stringify(error));
    //     alert("Registration unsuccessful");
    //   }
    // );
  }
}

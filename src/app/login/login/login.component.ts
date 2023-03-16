import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  enableLoginBlock = true;
  
  regForm = new FormGroup({
    firstname : new FormControl('', [Validators.required, Validators.min(2)]),
    lastname : new FormControl('', []),
    username : new FormControl('', [Validators.required]),
    password : new FormControl('', [Validators.required])
  });

  loginForm = new FormGroup({ 
    username : new FormControl('', [Validators.required]),
    password : new FormControl('', [Validators.required])
  });

  constructor(userService: UserService) { }

  ngOnInit(): void {
  }

  onLoginFormSubmit(loginFormDir: FormGroupDirective): void {
    let username:string = this.loginForm.controls['username'].value;
    username = username.trim().toLowerCase();
    let password = this.loginForm.controls['password'].value;
    if(username && password) {
      // this.userService.doLogin(username,password).subscribe(data=> {
      //   this.router.navigate(['/dashboard']);
      // }, error => {
      //   alert("Worng username or password!");
      //   loginFormDir.resetForm();
      // });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  hide = true;
  loginForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.submitted = true;
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  get f() { return this.formBuilder.control; }


  onSubmit() {

    if(this.loginForm.invalid) {
      return;
    }
   
    var username = this.loginForm.value.username;
    var pass = this.loginForm.value.password;
    console.log("username: " + username + "/pass: " +pass);

  }


  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }

}

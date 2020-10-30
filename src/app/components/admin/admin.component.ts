import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AppConfig } from 'src/app/app.config';
import { UserDto } from 'src/app/models/user-dto';
import { UtilsService } from 'src/app/services/utils.service';

import { RecuperoJsonService } from '../../services/recupero-json.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  hide = true;
  loginForm: FormGroup;
  submitted = false;
  userDTO: UserDto;
  logged: boolean = false;

  constructor(private formBuilder: FormBuilder, 
      private recuperoJsonService: RecuperoJsonService, 
      private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.submitted = true;
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  get f() { return this.formBuilder.control; }


  onSubmit() {

    if (this.loginForm.invalid) {
      return;
    }

    var username = this.loginForm.value.username;
    var pass = this.loginForm.value.password;

    this.recuperoJsonService.getDatiUtente(username, pass).subscribe(
      data => {
        this.userDTO.nome = data.nome;
        this.userDTO.dt_ultimo_login = this.utilsService.transformDate(data.dt_ultimo_login, AppConfig.DATA_ITA_NO_ORE_FORMAT);
        this.logged = true;
      }
    );
  }


  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }

}

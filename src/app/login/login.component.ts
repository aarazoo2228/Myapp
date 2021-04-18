import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login : FormGroup;

  constructor(private _auth:AuthService,private _router:Router) { }

  ngOnInit(): void {
    this.login = new FormGroup({
      uname:new FormControl(null,[Validators.required]),
      pswd:new FormControl(null,[Validators.required])
    })
 }

 onLoginUser(){
   console.log(this.login.value);
   
   this._auth.login(this.login.value);
 }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  signup:FormGroup;

  constructor(private _authService:AuthService,private _router:Router) { }

  username = {
    uname : "",
    pswd : ""
  }
  ngOnInit(): void {
    this.signup = new FormGroup({
      uname:new FormControl(null,[Validators.required,Validators.minLength(3)]),
      pswd:new FormControl(null,[Validators.required,Validators.minLength(3)])
    })
  }

  onSubmit(){
    this._authService.register(this.signup.value).subscribe(res=>{
      console.log(res);
      this.signup.reset();
      this._router.navigate(['/login']);
      
    })
  }
}

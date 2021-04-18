import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { user } from './user';
import { Observable } from 'rxjs';
import { book } from './book/book';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = "https://myprojectapi.herokuapp.com/api"
  bookurl = "https://myprojectapi.herokuapp.com/api/books/"
  constructor(private _http:HttpClient , private _router:Router) { }

  register(user:user):Observable<any>{
    return this._http.post<any>(this.url+"/registration",user);
  }

  login(user:user){
    return this._http.post<any>(this.url+"/login",user)
    .subscribe((res:any)=>{
        localStorage.setItem('token',res.token)
        this._router.navigate(['/book']);
    });
   }

   isLoggedIn():boolean{
      let token = localStorage.getItem('token');
      return (token) !== null ? true : false
   }

   logout(){
     if(localStorage.removeItem('token')==null){
       this._router.navigate(['/login'])
     } 
   }

   getBooks():Observable<any>{
     return this._http.get<book[]>(this.bookurl)
   }

   addBook(data:book):Observable<book>{
    console.log(data);
    return this._http.post<book>(this.bookurl,data);      
   }

    update(data:book):Observable<book>{
       return this._http.patch<book>(this.bookurl+data._id , data)
    }

   delete(data:book):Observable<book>{
      return this._http.delete<book>(this.bookurl+data._id)
    }

   getAccessToken(){
     return localStorage.getItem('token')
   }
}

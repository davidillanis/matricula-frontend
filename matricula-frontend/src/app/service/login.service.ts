import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  public login(username:string, password:string){
    if(username=="admin" && password =="1234"){
      sessionStorage.setItem('isLogget', "true");
    }
  }

  public logout(){
    sessionStorage.setItem('isLogget', "false");
  }

  public detroySession(){
    sessionStorage.clear();
  }

  public isLogget(){
    try {
      return sessionStorage.getItem('isLogget')=="true"; 
    } catch (error) {
      return false;
    }
  }
}

import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  auth = {
    email:'',
    password:''
  }
  error = false
  constructor(private api:ApiService,private router: Router){

  }
  inputHandler(event:any){
    this.error = false
    if(event.target.id === "email"){
      this.auth.email = event.target.value
    }
    if(event.target.id === "password"){
      this.auth.password = event.target.value
    }
  }

  async loginUser(event:any){
    event.preventDefault()
    try{
      const data = await this.api.loginStudent(this.auth)
      if(data.code === "ERR_BAD_REQUEST"){
        this.error = true
      }else{
        localStorage.setItem("token",data.data)
        this.router.navigate(['/students'])
      }

    }catch(err){
      this.error = true
    }



  }

}

import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import {Router} from "@angular/router"
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  /**
   Login component operations handler
   */

   // Object needed to authenticate student
  auth = {
    email:'',
    password:''
  }
  error = false
  constructor(private api:ApiService,private router: Router, private app: AppComponent){

  }
  inputHandler(event:any){
    /**
     Handles user input in the form
     */
    this.error = false
    if(event.target.id === "email"){
      this.auth.email = event.target.value
    }
    if(event.target.id === "password"){
      this.auth.password = event.target.value
    }
  }

  async loginUser(event:any){
    /**
     Function to handle login button clicked
     */
    event.preventDefault()
    try{
      // Dispatch login ApiService
      // If status is okay navigate to students
      // else display email or password is not correct
      const data = await this.api.loginStudent(this.auth)
      if(data.code === "ERR_BAD_REQUEST"){
        this.error = true
      }else{
        localStorage.setItem("token",data.data)
        this.app.status = true
        this.router.navigate(['/students'])
      }

    }catch(err){
      this.error = true
    }



  }

}

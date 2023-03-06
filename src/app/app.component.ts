import {Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  //login variable to check if current user is logged in
  status:boolean
  ngOnInit(){
    //when app starts it will check if token is available and sets the status
    const token = localStorage.getItem('token')
    if(token){
      this.status = true;
    }else{
      this.status = false;
    }

  }
  logout(){
    // When user logs out remove the token from local storage from browser
    localStorage.removeItem('token')
    this.status = false;
  }
}

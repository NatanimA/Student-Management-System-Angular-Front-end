import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  /**
    Api call service which will invoke CRUD functions when it is called
   */
  STUDENTS_URL = 'http://localhost:8080/api/students'
  SEARCH_URL = 'http://localhost:8080/api/search/?name='
  UPLOAD_URL = "http://localhost:8080/api/upload"
  LOGIN_URL = "http://localhost:8080/api/service/login"

  // Take the token if user previously logged in we can use this token to authenticate the user
  Token:string
  headers:any
  constructor(private http:HttpClient) {
    // Set the headers with the token
    if(this.Token === undefined){
      this.Token = localStorage.getItem("token")
    }
    this.headers = new HttpHeaders()
              .set('content-type', 'application/json')
              .set('Access-Control-Allow-Origin', '*')
              .set('Authorization', `Bearer ${this.Token}`);
   }

  getStudents(){
    /**
     Api call to get all the users from the repo
     */
    return this.http.get(this.STUDENTS_URL,{
      headers:this.headers
    })
  }

  getStudentById(id:number){
    /**
     Api call to get student by Id
     */
    return this.http.get(this.STUDENTS_URL + '/' + id,{
      headers:this.headers
    })
  }

  deleteStudent(id:number){
    /**
     Api call to delete student By Id
     */
    return this.http.delete(this.STUDENTS_URL + "/" + id,{
      headers:this.headers
    })
  }

  searchStudents(name:string){
    /**
     Api call to search for a student by name
     */
    return this.http.get(this.SEARCH_URL + name,{
      headers:this.headers
    });
  }

  uploadPhoto(photo:any){
    /**
     Api call to upload image
     */
    const data = axios.post(this.UPLOAD_URL,{file:photo},{
      headers:{
        "Content-Type": "multipart/form-data",
        "Authorization": "Bearer "+ this.Token
      }
    }).then(res => {
      return res.data
    }).catch(err => {
      return err
    })
    return data;
  }

  updateStudent(id:number,student:object){
    /**
     Api call to update student
     */
    const data = axios.put(this.STUDENTS_URL + '/' + id,student,{
      headers:{
        "Authorization": "Bearer "+ this.Token
      }
    }).then(res => {
      return res
    }).catch(err => {
      return err
    })
    return data;
  }

  loginStudent(user:object){
    /**
     Api call to login and receive token
     */
    const data = axios.post(this.LOGIN_URL,user,{
      headers:{
        "Content-type": 'application/json'
      }
    }).then(res => {
      return res
    }).catch(err => {
      return err
    })
    return data
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  STUDENTS_URL = 'http://localhost:8080/api/students'
  SEARCH_URL = 'http://localhost:8080/api/search/?name='
  UPLOAD_URL = "http://localhost:8080/api/upload"
  LOGIN_URL = "http://localhost:8080/api/service/login"
  Token = localStorage.getItem("token")
  headers= new HttpHeaders()
              .set('content-type', 'application/json')
              .set('Access-Control-Allow-Origin', '*')
              .set('Authorization', `Bearer ${this.Token}`);
  constructor(private http:HttpClient) { }

  getStudents(){
    console.log("headers: ",this.headers)
    return this.http.get(this.STUDENTS_URL,{
      headers:this.headers
    })
  }

  getStudentById(id:number){
    console.log("headers: ",this.headers)
    return this.http.get(this.STUDENTS_URL + '/' + id,{
      headers:this.headers
    })
  }

  deleteStudent(id:number){
    return this.http.delete(this.STUDENTS_URL + "/" + id,{
      headers:this.headers
    })
  }

  searchStudents(name:string){
    return this.http.get(this.SEARCH_URL + name,{
      headers:this.headers
    });
  }

  uploadPhoto(photo:any){
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

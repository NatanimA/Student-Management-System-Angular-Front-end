import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Router} from "@angular/router"
import axios from 'axios';
import {ActivatedRoute} from "@angular/router";
import { ApiService } from '../api.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit  {
  SERVER_URL = "http://localhost:8080/api/students";
  UPLOAD_URL = "http://localhost:8080/api/upload"
  STATUS = false
  update = false
  STUDENT_ID:number
  uploadForm: FormGroup
  data = {
    name: '',
    email: '',
    password: '',
    bio:'',
    photo:''
  }
  constructor(private formBuilder: FormBuilder,private router: Router,private route:ActivatedRoute,private api: ApiService) {
    this.route.params.subscribe(param =>{
      const keys = Object.keys(param)
      if(keys.includes('id')){
        this.update = true
        this.STUDENT_ID = param['id'];
      }
    })
  }
  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      photo: ['']
    });
  }
  inputHandler(event:any){
    if(event.target.id === 'name'){
      this.data.name = event.target.value
    }
    else if(event.target.id === 'bio'){
      this.data.bio = event.target.value
    }
    else if (event.target.id === 'email'){
      this.data.email = event.target.value
    }
    else if (event.target.id === 'password'){
      this.data.password = event.target.value
    }

  }
  async submitForm(event:any){
    if(this.update){
      if(this.data.photo !== ''){
        const data = await this.api.uploadPhoto(this.data.photo)
        this.data.photo = data
        const response = await this.api.updateStudent(this.STUDENT_ID,this.data)
        if(response.status === 200){
          this.router.navigate(['/students'])
        }
      }
      else{
        const response = await this.api.updateStudent(this.STUDENT_ID,this.data)
        if(response.status === 200){
          this.router.navigate(['/students'])
        }
      }

    }else{
      axios.post(this.UPLOAD_URL,{file:this.data.photo},{
      headers:{
        "Content-Type": "multipart/form-data",
      }
    })
    .then(res => {
      if(res.status == 200){
        this.data.photo = `${res.data}`
        axios.post(this.SERVER_URL,this.data)
        .then(res => {
        if(res.status = 200){
          this.router.navigate(['/students'])
        }
      } )
      .catch(err => console.log(err))
      }

    })
    .catch(err => console.log("Error: ",err))
    }

  }

  onFileSelect(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.data.photo = file;
    }
  }


  }


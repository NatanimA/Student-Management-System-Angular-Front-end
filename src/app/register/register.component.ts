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
  /**
   Component handler to handle registration operations
   */
  error = false
  SERVER_URL = "http://localhost:8080/api/students";
  UPLOAD_URL = "http://localhost:8080/api/upload"
  STATUS = false
  update = false
  STUDENT_ID:number
  uploadForm: FormGroup
  photo = ''
  data = {
    name: '',
    email: '',
    password: '',
    bio:'',
    photo:''
  }
  constructor(private formBuilder: FormBuilder,private router: Router,private route:ActivatedRoute,private api: ApiService) {
    // Checks if component is being rendered in Profile Component so that It will know the user is Updating not registering a new user
    this.route.params.subscribe(param =>{
      // Checks parameter if it have a key called is means /students/:id
      const keys = Object.keys(param)
      if(keys.includes('id')){
        // If Id exists it means the user is trying to update profile
        this.update = true
        this.STUDENT_ID = param['id'];
      }
    })
  }
  ngOnInit() {
    // Upload form to get the photo from the form
    this.uploadForm = this.formBuilder.group({
      photo: ['']
    });
  }
  inputHandler(event:any){
    /**
     Function that will handle user inputs in the form.
     */
    this.error = false
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
    /**
     Function to handle when user clicks on submit form
     */
    if(this.update){
      //if student is trying to update profile
      if(this.photo !== ''){
        // if there is a photo
        // first upload the photo
        const data = await this.api.uploadPhoto(this.photo)
        this.data.photo = data
        const response = await this.api.updateStudent(this.STUDENT_ID,this.data)
        if(response.status === 200){
          // On success navigate to /students
          this.router.navigate(['/students'])
        }
        else{
          this.error = true
        }
      }
      else{
        // if no image have been selected just update other infos
        const response = await this.api.updateStudent(this.STUDENT_ID,this.data)
        if(response.status === 200){
          // On success navigate to /students
          this.router.navigate(['/students'])
        }
        else{
          this.error = true
        }
      }

    }else{
      // If user is trying to register
      // first upload the image
      // then create the new student
      if(this.photo === ''){
        //If image is not given
       const res = await axios.post(this.SERVER_URL,this.data)
        if(res.data !== "Email is already taken."){
          // on success navigate to /login page
          this.router.navigate(['/login'])
        }
        else{
          this.error = true
        }
      }
      else {
        axios.post(this.UPLOAD_URL,{file:this.photo},{
      headers:{
        "Content-Type": "multipart/form-data",
      }
    })
    .then(res => {
      if(res.status == 200){
        this.data.photo = `${res.data}`
        console.log("Photo: ",res)
        axios.post(this.SERVER_URL,this.data)
        .then(res => {
        if(res.data !== "Email is already taken."){
          // on success navigate to /login page
          this.router.navigate(['/login'])
        }
        else{
          this.error = true
        }
      } )
      .catch(err => console.log(err))
      }

    })
    .catch(err => console.log("Error: ",err))
      }

    }

  }

  onFileSelect(event:any) {
    /**
     On image select set the photo key
     */
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.photo = file;
    }
  }


  }


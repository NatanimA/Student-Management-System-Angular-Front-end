import { Component,OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {ActivatedRoute} from "@angular/router";
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  IMAGE_URL = 'http://localhost:8080/api/image/';
  student:any
  id:number
  display = false
  constructor(private api: ApiService, private route: ActivatedRoute){
    this.route.params.subscribe(params => {
      this.id = params['id']
    })
  }

  ngOnInit(){
    this.api.getStudentById(this.id).subscribe((data) => {
        this.student=JSON.stringify(data)
        this.student = JSON.parse(this.student)
      })

  }
  displayEdit(){
    this.display = true;
  }
}

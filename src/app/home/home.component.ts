import { Component,OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormControl} from '@angular/forms';
import { ApiService } from '../api.service'
import {Router} from "@angular/router"
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class HomeComponent implements OnInit {
  IMAGE_URL = 'http://localhost:8080/api/image/';
  input: string
  userId: number
  users$: any;
	filter = new FormControl('', { nonNullable: true });

	constructor(private api:ApiService,private router: Router,config: NgbModalConfig, private modalService: NgbModal) {
		config.backdrop = 'static';
		config.keyboard = false;
	}
	ngOnInit(){
		this.api.getStudents().subscribe((data) => {
			this.users$= data
		})
	}
	open(content:any,event:any) {
		this.userId = event.target.id
		this.modalService.open(content);
	}

	searchInputHandler(event:any){
		this.input = event.target.value
	}
	deleteUser(id:number){
		this.api.deleteStudent(id).subscribe((data) => {
			let userList = this.users$.filter((user:any) => user.id != id)
			this.users$ = userList;
		})
	}

	searchUser(){
		this.api.searchStudents(this.input).subscribe((data) => {
			let userList = data;
			this.users$ = userList;
		})
	}

	showProfile(id:number){
		this.router.navigate(['/profile',id])
	}

}

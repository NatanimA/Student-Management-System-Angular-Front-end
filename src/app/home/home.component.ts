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
  /**
   home component operation handler
    */
  IMAGE_URL = 'http://localhost:8080/api/image/';
  input: string
  userId: number
  users$: any;
  //Search filter handler
  filter = new FormControl('', { nonNullable: true });

	constructor(private api:ApiService,private router: Router,config: NgbModalConfig, private modalService: NgbModal) {
		// Delete pop up configuration
		config.backdrop = 'static';
		config.keyboard = false;
	}
	ngOnInit(){
		/**
		 When component is loaded get students form repo
		 */
		this.api.getStudents().subscribe((data) => {
			this.users$= data
		})
	}
	open(content:any,event:any) {
		/**
		 Pop up modal function handler
		 */
		// Sets the userId selected to be removed
		this.userId = event.target.id
		this.modalService.open(content);
	}

	searchInputHandler(event:any){
		//Search input handler
		this.input = event.target.value
	}
	deleteUser(id:number){
		/**
		 Delete function handler to delete student by ID
		 */
		this.api.deleteStudent(id).subscribe((data) => {
			// After Deleting the student filter the new students and update the dom
			let userList = this.users$.filter((user:any) => user.id != id)
			this.users$ = userList;
		})
	}

	searchUser(){
		/**
		 Api Search Dispatched
		 */
		this.api.searchStudents(this.input).subscribe((data) => {
			let userList = data;
			// Update the user list and update the DOM
			this.users$ = userList;
		})
	}

	showProfile(id:number){
		// When student clicks on edit user navigate to /profile/:id
		this.router.navigate(['/profile',id])
	}

}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BookService } from '../book-service.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent {
  memberForm: FormGroup;
  members: any[] = []; // Store registered members

  ngOnInit(){
    this.fetchMember();
  }
  fetchMember(){
    this.bookService.getMembers().subscribe(
      (res:any)=>{
        this.members.push(...res);
      }
    )
  }

  constructor(private formBuilder: FormBuilder, private bookService: BookService) {
    this.memberForm = this.formBuilder.group({
      name: [''],
      email: ['']
    });
  }

  toggleMemberDetails(member: any) {
    member.showDetails = !member.showDetails;
  }

  
  registerMember() {
    const memberData = this.memberForm.value;
    memberData.issuedBooks = [];
    memberData.debt = 0;
    memberData.returnedBooks = [];
    memberData.showDetails = false; // Initialize the showDetails property

    this.members.push(memberData);
    this.memberForm.reset();
  }
}

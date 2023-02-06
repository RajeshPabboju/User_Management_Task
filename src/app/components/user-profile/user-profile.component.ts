import { Component, OnInit } from '@angular/core';
import { UserAPIService } from 'src/app/services/user-api.service';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedComponent } from '../shared/shared.component';
import { UserProfile } from '../../interfaces/userProfile.interface';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userProfiles!: UserProfile[];
  constructor(public userAPIService: UserAPIService, private confirmationService: ConfirmationService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.getUserProfiles();
  }

  getUserProfiles(){
    this.userAPIService.getUserProfiles().subscribe((res:any) => {
      this.userProfiles = res;
    })
  }

  confirm(user:UserProfile) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.userAPIService.deleteUserProfile(user).subscribe((res)=>{
          this.getUserProfiles();
        })
      }
    });
  }

  show(actionType: string,selectedUSer?:UserProfile) {
    const ref = this.dialogService.open(SharedComponent, {
      data: {
        buttonName: actionType === 'add' ? 'SAVE USER' : 'UPDATE USER',
        selectedUSer:selectedUSer
      },
      header: 'Add User Profile Here',
      width: '40%'
    });

    ref.onClose.subscribe(()=>{
      this.getUserProfiles();
    })
  }

}

import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import { UserAPIService } from 'src/app/services/user-api.service';
@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.css']
})
export class SharedComponent implements OnInit {
  userProfileForm:any;
  buttonName:string ='';

  constructor(public fb:FormBuilder,public ref:DynamicDialogRef,public config: DynamicDialogConfig,public userAPIService:UserAPIService){}

  ngOnInit(): void {
    this.buttonName = this.config.data.buttonName;
    this.userProfileForm = this.fb.group({
      id: [null,Validators.required],
      empName: ['',Validators.required],
      empCode: ['',Validators.required],
      designation: ['',Validators.required],
      location: ['',Validators.required]
    })

    if(this.buttonName === 'UPDATE USER'){
      this.userProfileForm.patchValue(this.config.data.selectedUSer) 
    }
  }

  get userProfileFormControl() {
    return this.userProfileForm.controls;
  }

  postUserProfile(){
    if(this.userProfileForm.valid){
      if(this.buttonName === 'SAVE USER'){
        const selectedUser = this.userProfileForm.value;
        this.userAPIService.postUserProfile(selectedUser).subscribe((res)=>{
          this.ref.close();
        })
      }else{
        const selectedUser = this.userProfileForm.value;
        this.userAPIService.putUserProfile(selectedUser).subscribe((res)=>{
          this.ref.close();
        })
      }
    }else{
      this.userProfileForm.markAllAsTouched();
    }
  }

}

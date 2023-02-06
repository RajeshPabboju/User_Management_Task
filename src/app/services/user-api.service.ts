import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from '../interfaces/userProfile.interface';
@Injectable({
  providedIn: 'root'
})
export class UserAPIService {

  mockAPI: string = "http://localhost:3000/users"

  constructor(public httpClient: HttpClient) { }

  getUserProfiles() {
    return this.httpClient.get(this.mockAPI);
  }

  postUserProfile(selectedUser: UserProfile) {
    return this.httpClient.post(this.mockAPI, selectedUser)
  }

  putUserProfile(selectedUser: UserProfile) {
    return this.httpClient.put(this.mockAPI + "/" + selectedUser.id, selectedUser)
  }

  deleteUserProfile(selectedUser: any) {
    return this.httpClient.delete(this.mockAPI + "/" + selectedUser.id, selectedUser)
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { ProfileService } from '../profile.service';
import { SessionService } from '../session.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  
  public resultMessage = '';
  public firstName = '';
  public lastName = '';
  public userName = '';
  public phoneNumber = '';
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    userName: new FormControl(''),
    phoneNumber: new FormControl('')
  });

  constructor(
    private _sessionService: SessionService,
    private _profile: ProfileService,
    private _activatedRoute: ActivatedRoute, 
    private _router: Router
  ) { }

  ngOnInit() {
    this._sessionService.jwt$.pipe(switchMap(
      token => this._profile.getProfile(token || '')
    )).subscribe((userProfile: any) => {
      this.firstName = userProfile.firstName;
      this.lastName = userProfile.lastName;
      this.userName = userProfile.userName;
      this.phoneNumber = userProfile.phoneNumber;
    });
  }

  async editProfile() {

    try {

      if( !this.profileForm.valid ) return;
      await this._sessionService.jwt$.pipe(switchMap(
        token => this._profile.editProfile(this.profileForm.value, token || ''))).toPromise();
    } catch(error) {
      this.resultMessage = error.payload.message;
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private _sessionService: SessionService,
    private _router: Router
  ) { }

  ngOnInit() {
  }
  isLoggedIn() {
    return this._sessionService.isLoggedIn();
  }
  logOut() {
    this._sessionService.logout();
    this._router.navigateByUrl('/login');
  }
  notes() {
    this._router.navigateByUrl('/notes');
  }
  password() {
    this._router.navigateByUrl('/editPassword');
  }
  profile() {
    this._router.navigateByUrl('/editProfile');
  }
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './sign-in/sign-in.component';
import { LogInComponent } from './log-in/log-in.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { ActivateComponent } from './activate/activate.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  { path: 'signin', component: SignInComponent },
  { path: 'login', component: LogInComponent },
  { path: 'notes', component: NotesListComponent },
  { path: 'activate', component: ActivateComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'changePassword', component: ChangePasswordComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

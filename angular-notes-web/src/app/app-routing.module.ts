import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './sign-in/sign-in.component';
import { LogInComponent } from './log-in/log-in.component';
import { NotesListComponent } from './notes-list/notes-list.component';

const routes: Routes = [
  { path: 'signin', component: SignInComponent },
  { path: 'login', component: LogInComponent },
  { path: 'notes', component: NotesListComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

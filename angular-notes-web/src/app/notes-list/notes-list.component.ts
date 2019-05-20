import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { Note } from '../note';
import { NoteService } from '../note.service';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {
  //notes: Note[];
  public notes: any[] = [];
  public resultMessage = '';
  public newNoteText = '';
  public newNoteTitle = '';
  noteForm = new FormGroup({
    title: new FormControl(''),
    text: new FormControl('')
  });
  constructor(
    private _sessionService: SessionService,
    private _note: NoteService
  ) { }

  ngOnInit() {
    this.notes = [];
    this._sessionService.jwt$.pipe(switchMap(
      token => this._note.getNotes(token || '')
    )).subscribe((newNote: any[]) => {
      this.notes = newNote;
      console.log(this.notes);
    });
  }
  createNote () {
    console.log(this.noteForm.value);
    this._sessionService.jwt$.pipe(switchMap(
      token => this._note.createNote(this.noteForm.value, token || '')
    )).subscribe((newNote: any) => {
      this.notes.unshift(newNote);
      //const title = this.notes[0].title
      console.log(this.notes);
      this.newNoteText = "";
      this.newNoteTitle = "";
      //console.log(newNote);
      //this.noteForm.value=null;
      //this.noteForm.va = '';
      //this.wallPosts.unshift(newPost);
    });
  }
}

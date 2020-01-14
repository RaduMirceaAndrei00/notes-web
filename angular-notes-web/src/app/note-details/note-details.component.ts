import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

import { Note } from '../note';
import { NoteService } from '../note.service';
import { SessionService } from '../session.service';
import { Token } from '@angular/compiler/src/ml_parser/lexer';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.css']
})
export class NoteDetailsComponent implements OnInit {

  public resultMessage = '';
  public newNoteText = '';
  public newNoteTitle = '';
  public notes_id = this._activatedRoute.snapshot.paramMap.get('id');
  noteForm = new FormGroup({
    title: new FormControl(''),
    text: new FormControl('')
  });
  constructor(
    private _sessionService: SessionService,
    private _note: NoteService,
    private _activatedRoute: ActivatedRoute, 
    private _router: Router

  ) { }

  ngOnInit() {

    this._sessionService.jwt$.pipe(switchMap(
      token => this._note.getNote(this.notes_id, token || '')
    )).subscribe((newNote: any) => {
      this.newNoteText = newNote.text;
      this.newNoteTitle = newNote.title;
    })
  }

  async editNote(){
    try{
      if( !this.noteForm.valid ) return;
      await this._sessionService.jwt$.pipe(switchMap(
        token => this._note.editNote(this.notes_id, this.noteForm.value, token || ''))).toPromise();
    } catch(error) {
      this.resultMessage = error.payload.message;
    }
  }

  async deleteNote() {
    try {
      await this._sessionService.jwt$.pipe(switchMap(
        token => this._note.deleteNote(this.notes_id, token || '')
      )).subscribe(() => {
        this._router.navigateByUrl('/notes');
      })
    } catch(error) {
      this.resultMessage = error.payload.message;
    }
  }

  backToNotes() {
    this._router.navigateByUrl('/notes');
  }
}

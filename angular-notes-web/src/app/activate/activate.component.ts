import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {
  public message = "Contul a fost activat cu succes! Acum va puteti bucura de serviciile aplicatiei BestNotes!";
  public linkMessage = "Va puteti loga aici!";
  constructor(
    private _regiser: RegisterService,
    private _activatedRoute: ActivatedRoute, 
    private _router: Router
  ) { }

  async ngOnInit() {
    try {
      var code = this._activatedRoute.snapshot.queryParams['code'];
      code = encodeURIComponent(code);
      await this._regiser.activate(code).toPromise();
    } catch (error) {
      this.message = "Codul este inexistent sau a expirat! Activarea nu s-a putut realiza!"
      this.linkMessage = "Accesati acest link si apasati apoi pe link-ul resetare parola pentru activarea contului!";
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

/**
* Defines the component responsible to manage the confirmation page.
*/
@Component({
  selector: 'confirmation',
  templateUrl: './confirmation.component.html'
})
export class ConfirmationComponent implements OnInit  {
  numCommande : number;
  nomClient : "";
  
  constructor(
    private route: ActivatedRoute
  ) {}
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
        this.numCommande = params.id;
        this.nomClient= params.firstName;
        this.nomClient+=" ";
        this.nomClient+=params.lastName;
      });
  }
}

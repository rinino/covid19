import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-non-trovata',
  templateUrl: './pagina-non-trovata.component.html',
  styleUrls: ['./pagina-non-trovata.component.css']
})
export class PaginaNonTrovataComponent implements OnInit {

  constructor(
   private router: Router
  ) { }

  ngOnInit(): void {
  }

  onClickTornaHome(): void {
    this.router.navigate(['']);
  }

}

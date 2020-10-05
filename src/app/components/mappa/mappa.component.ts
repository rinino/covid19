import { Component, OnInit } from '@angular/core';

declare var creaMappa: any;



@Component({
  selector: 'app-mappa',
  templateUrl: './mappa.component.html',
  styleUrls: ['./mappa.component.css']
})
export class MappaComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
    creaMappa()
  }






}

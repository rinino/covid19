import { Component, OnInit } from '@angular/core';
import { AccordionDecessiDTO } from 'src/app/models/accordion-decessi-dto';

import { RecuperoJsonService } from '../../services/recupero-json.service';

@Component({
  selector: 'app-accordion-decessi19',
  templateUrl: './accordion-decessi19.component.html',
  styleUrls: ['./accordion-decessi19.component.css']
})
export class AccordionDecessi19Component implements OnInit {

  constructor(
    private recuperoJsonService: RecuperoJsonService
  ) { }


  public datiAccordion: AccordionDecessiDTO[] = []

  ngOnInit(): void {
    this.getDatiAccordionDecessi()
    console.log(this.datiAccordion)
  }



  getDatiAccordionDecessi(): void {
    var datiAccordion: AccordionDecessiDTO; (
      this.recuperoJsonService.getDatiAccordionDecessi()).subscribe(
        data => {
          data.forEach((record: {
            ordine: number;
            header: string;
            path_image: string
          }) => {
            datiAccordion = new AccordionDecessiDTO();
            datiAccordion.ordine = record.ordine;
            datiAccordion.header = record.header;
            datiAccordion.path_image = record.path_image;
            if(record.ordine == 1) {
              datiAccordion.aperto = true;
            } else {
              datiAccordion.aperto = false;
            }
            this.datiAccordion.push(datiAccordion);
          });
          this.datiAccordion.sort((a, b) => a.ordine < b.ordine ? -1 : a.ordine > b.ordine ? 1 : 0);
        }
      );

  }



}

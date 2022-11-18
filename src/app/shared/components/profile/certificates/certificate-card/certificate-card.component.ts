import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-certificate-card',
  templateUrl: './certificate-card.component.html',
  styleUrls: ['./certificate-card.component.sass']
})
export class CertificateCardComponent implements OnInit {

  @Input()
  certificate: string;

  constructor() {
    console.log('cets', this.certificate)  
  }

  ngOnInit(): void {
  }

}

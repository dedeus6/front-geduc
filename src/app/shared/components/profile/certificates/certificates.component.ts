import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.sass']
})
export class CertificatesComponent implements OnInit {

  certificates: Array<string> = ['Evento 1', 'Evento 2', 'Evento 3', 'Evento 4'];

  constructor() { }

  ngOnInit(): void {
  }

}

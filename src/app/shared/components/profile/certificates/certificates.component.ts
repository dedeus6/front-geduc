import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.sass']
})
export class CertificatesComponent implements OnInit {

  certificates: Array<string> = ['Certificado 1', 'Certificado 2', 'Certificado 3', 'Certificado 4'];

  constructor() { }

  ngOnInit(): void {
  }

}

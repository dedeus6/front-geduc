import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CertificateModel } from 'src/app/models/certificate.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CertificateService {

    constructor(private http: HttpClient) { }

    getCertificates(registration: string){
        return this.http.get<Array<CertificateModel>>(environment.GEDUC_API + `/v1/certificate/${registration}`)
    }

    generateCertificate(eventNumber: string, registration: string){
        return this.http.post<void>(environment.GEDUC_API + `/v1/certificate/${eventNumber}/${registration}`, {});
    }

}
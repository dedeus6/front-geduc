import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CertificateModel } from 'src/app/models/certificate.model';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { NotificationService } from './notification.service';

@Injectable({
    providedIn: 'root'
})
export class CertificateService {

    constructor(private http: HttpClient, private notificationService: NotificationService) { }

    getCertificates(registration: string){
        return this.http.get<Array<CertificateModel>>(environment.GEDUC_API + `/v1/certificate/${registration}`)
    }

    generateCertificate(eventNumber: string, registration: string){
        return this.http.post<void>(environment.GEDUC_API + `/v1/certificate/${eventNumber}/${registration}`, {}).pipe(tap(() => {
            this.notificationService.getNotifications(registration).subscribe();
        }));
    }

}
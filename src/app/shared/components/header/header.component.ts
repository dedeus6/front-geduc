import { Component, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ModalNotificationComponent } from '../modal-notification/modal-notification.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  eventTitle: string;

  constructor(
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {}

  openModal() {
    const dialogRef = this.dialog.open(ModalNotificationComponent, {
    });

    dialogRef.afterClosed().subscribe((response) => {
    });
  }

  enterSubmit(event: any): void {
    if(event.keyCode === 13){
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/search-events'], {queryParams: {eventTitle: this.eventTitle}});
      }); 
    }
  }
}

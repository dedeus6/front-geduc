import { Component, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalNotificationComponent } from '../modal-notification/modal-notification.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openModal() {
    const dialogRef = this.dialog.open(ModalNotificationComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  enterSubmit(event: any): void {
    if(event.keyCode === 13){
      console.log(`cliquei enter`)
      this.router.navigate(['/search-events'])
    }
  }
}

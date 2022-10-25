import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { EventModel } from 'src/app/models/event.model';
import { Tech } from 'src/app/models/tech.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EventService } from 'src/app/shared/services/event.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-create-event-page',
  templateUrl: './create-event-page.component.html',
  styleUrls: ['./create-event-page.component.sass']
})
export class CreateEventPageComponent implements OnInit {

  files: Array<File> = [];
  techs: any[] = [];
  eventForm: FormGroup;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  addOnBlur = true;
  loggedUser: Usuario;

  constructor(private fb: FormBuilder, private authService: AuthService, private storageService: StorageService, private eventService: EventService) {
    this.eventForm = this.fb.group(
      {
        eventTile: ['', [Validators.required]],
        eventDescription: ['', [Validators.required]],
        duration: ['', [Validators.required]]
      }
    )
  }
  
  ngOnInit(): void {
    this.loggedUser = this.authService.getLoggedUser();
  }

  inputFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      this.files.push(event.target.files[0]);
      console.log(event.target.files);
    }
  }

  deleteFileOnList(file: File) {
    this.files = this.files.filter(item => item.name !== file.name);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.techs.push(value);
    }

    event.input.value = "";

  }

  remove(tech: Tech): void {
    const index = this.techs.indexOf(tech);

    if (index >= 0) {
      this.techs.splice(index, 1);
    }
  }

  createEvent() {
    const formData = new FormData();
    this.files.forEach(file => {
      formData.append('files', file);
    })

    this.storageService.sendFiles(formData).subscribe(response => {
      const eventRequest: EventModel = {
        creatorRegistration: this.loggedUser.registration,
        description: this.eventForm.get('eventDescription').value,
        title: this.eventForm.get('eventTile').value,
        duration: this.eventForm.get('duration').value,
        filesId: response.filesId,
        techs: this.techs
      }

      this.eventService.createEvent(eventRequest).subscribe();
    })
  }

}

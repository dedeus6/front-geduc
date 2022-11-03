import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { EventModel } from 'src/app/models/event.model';
import { getEventModel } from 'src/app/models/getEvent.model';
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
  origem: string;
  eventReceived: any;
  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private storageService: StorageService, 
    private eventService: EventService, 
    private snackBar: MatSnackBar, 
    private router: Router,
    private route: ActivatedRoute
    ) {
    this.eventForm = this.fb.group(
      {
        eventTitle: ['', [Validators.required]],
        eventDescription: ['', [Validators.required]],
        duration: ['', [Validators.required]],
        techs: [[], [Validators.required]],
        file: [[], [Validators.required]]
      }
    )
  }
  
  ngOnInit(): void {
    this.origem = this.route.snapshot.queryParamMap.get('origem');
    this.verificarOrigem();
    this.loggedUser = this.authService.getLoggedUser();
  }

  verificarOrigem(): void {
    if(this.origem !== "incluir"){
      this.origem = "alterar";
      this.route.queryParams.subscribe((params) => {
        this.eventReceived = params
      })
      this.eventForm.get('eventTitle').setValue(this.eventReceived.title);
      this.eventForm.get('eventDescription').setValue(this.eventReceived.description);
      this.eventForm.get('duration').setValue(this.eventReceived.duration);
      this.techs = this.eventReceived.techs
      this.eventForm.get('techs').setValue(this.techs);
      console.log('recebi', this.eventReceived)
    }
  }

  getEvents(usuarioLogado: Usuario): void {
    const filtro = {
      nome: "creatorRegistration",
      valor: usuarioLogado.registration
    }
    this.eventService.getEvents(filtro).subscribe((response) => {
      console.log(response)
    })
  }

  inputFileChange(event) {
    if (event.target.files.length > 1){
      for(let i = 0; i < event.target.files.length; i++) {
        this.files.push(event.target.files[i]);
      }
      this.eventForm.get('file').setValue(this.files);
    } 
    else if (event.target.files && event.target.files[0]) {
      this.files.push(event.target.files[0]);
      this.eventForm.get('file').setValue(this.files);
    }
  }

  deleteFileOnList(file: File) {
    const index = this.files.indexOf(file)
    if(index >= 0) {
      this.files.splice(index,1);

    }
    this.eventForm.get('file').setValue(this.files);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.techs.push(value);
      this.eventForm.get('techs').setValue(this.techs);
    }

    event.input.value = "";

  }

  remove(tech: Tech): void {
    const index = this.techs.indexOf(tech);

    if (index >= 0) {
      this.techs.splice(index, 1);
      this.eventForm.get('techs').setValue(this.techs);
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
        title: this.eventForm.get('eventTitle').value,
        duration: this.eventForm.get('duration').value,
        filesId: response.filesId,
        techs: this.eventForm.get('techs').value
      }
      
      this.eventService.createEvent(eventRequest).subscribe((response) => {
        this.snackBar.open("Evento criado com Sucesso", 'X', {
          duration: 3000,
          panelClass: ['green-snackbar']
        });
        this.router.navigate(['home'])
      }) 
    })
  }

  voltar(): void{
    window.history.back();
  }

}

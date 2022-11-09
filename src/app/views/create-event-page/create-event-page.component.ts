import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { EventModel } from 'src/app/models/event.model';
import { Files } from 'src/app/models/files.model';
import { getEventModel } from 'src/app/models/getEvent.model';
import { UploadFileResponse } from 'src/app/models/storage.model';
import { Tech } from 'src/app/models/tech.model';
import { User } from 'src/app/models/user.model';
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
  tempForm: FormGroup;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  addOnBlur = true;
  loggedUser: User;
  isUpdate: boolean;
  eventReceived: EventModel;
  eventNumber: string;
  sendingEvent: boolean = false;
  hasChangeOn: boolean = false;
  
  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private storageService: StorageService, 
    private eventService: EventService, 
    private snackBar: MatSnackBar, 
    private router: Router,
    private route: ActivatedRoute
    ) {

  }
  
  ngOnInit(): void {
    this.eventNumber = this.route.snapshot.queryParamMap.get('eventNumber');
    this.isUpdate = this.eventNumber !== null ? true : false;
    if(this.isUpdate){
      this.eventService.getEvents(this.eventNumber).subscribe((response) => {
        this.eventReceived = response.find(obj => {return obj.eventNumber === this.eventNumber});
        this.eventReceived.techs.forEach((tag ) => this.techs.push(tag))
        this.loadForm();
        this.getFilesOfEVent(this.eventReceived.filesId);
        
      });
    } else {
      this.loadForm();
    }
    this.loggedUser = this.authService.getLoggedUser();
  }
  
  loadForm(): void {
    
    this.eventForm = this.fb.group(
      {
        eventTitle: [this.isUpdate?this.eventReceived.title:'', [Validators.required]],
        eventDescription: [this.isUpdate?this.eventReceived.description:'', [Validators.required]],
        duration: [this.isUpdate?this.eventReceived.duration:'', [Validators.required]],
        techs: [this.techs, [Validators.required]],
        file: [this.files, [Validators.required]]
      }
    );
    this.onCreateGroupFormValueChange();
  }


  getEvents(usuarioLogado: User): void {
    const filtro = {
      nome: "creatorRegistration",
      valor: usuarioLogado.registration
    }
    this.eventService.getEvents(filtro).subscribe(() => {})
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
    this.hasChangeOn = true;
  }

  deleteFileOnList(file: File) {
    const index = this.files.indexOf(file)
    if(index >= 0) {
      this.files.splice(index,1);

    }
    this.eventForm.get('file').setValue(this.files);
    this.hasChangeOn = true;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.techs.push(value);
      this.eventForm.get('techs').setValue(this.techs);
    }

    event.input.value = "";
    this.hasChangeOn = true;
  }

  remove(tech: Tech): void {
    const index = this.techs.indexOf(tech);

    if (index >= 0) {
      this.techs.splice(index, 1);
      this.eventForm.get('techs').setValue(this.techs);
    }
    this.hasChangeOn = true;
  }

  createEvent(origin: string) {
    this.sendingEvent = true;
    var mensagem = '';
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
      
      if(origin === 'create'){
        this.eventService.createEvent(eventRequest).subscribe(() => {
          mensagem = "Evento criado com Sucesso. "
        },
        (error) => {
          this.sendingEvent = false;
          error.status === 500 ? mensagem = "Um erro inesperado aconteceu. Tente novamente!" : mensagem = "Erro ao alterar evento. "+ error.message
        });
      } else {
        //chama o alterar
        this.eventService.editEvents(eventRequest, this.eventNumber).subscribe(()=>{
          mensagem = "Evento alterado com Sucesso. "
        },
        (error) => {
          this.sendingEvent = false;
          error.status === 500 ? mensagem = "Um erro inesperado aconteceu. Tente novamente!" : mensagem = "Erro ao alterar evento. "+ error.message
        });
      }
    }, 
    (error) => {
      this.sendingEvent = false;
      error.status === 500 ? mensagem = "Um erro inesperado aconteceu. Tente novamente!" : mensagem = "Erro ao salvar arquivos. "+ error.message
    });
    this.disparaMensagem(mensagem, this.sendingEvent);
  }

  onCreateGroupFormValueChange(){
    if(this.isUpdate){
      const initialValue = this.eventForm.value
      const TempForm = this.eventForm;
      TempForm.valueChanges.subscribe(value => {
        delete initialValue.techs;
        delete initialValue.file;
        delete value.techs;
        delete value.file;
        if (JSON.stringify(initialValue) === JSON.stringify(value)) {
          this.hasChangeOn = false
        } else {
          this.hasChangeOn = true
        }
      });
    }
  }

  voltar(): void{
    window.history.back();
  }

  getFilesOfEVent(filesId: string): void {
    this.storageService.getFiles(filesId).subscribe((response) => {
      response.files.forEach((file) => {
        this.b64toBlob(file.bytes, file.contentType, '',file.name)
      })
      
      this.loadForm();
      this.eventForm.get('file').setValue(this.files);
    })
  }

  b64toBlob(b64Data, contentType, sliceSize, name): Blob {
    contentType = contentType || 'video/*';
    sliceSize = sliceSize || 512;
  
    var byteCharacters = atob(b64Data);
    var byteArrays = [];
  
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
    
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
      }
    
      var byteArray = new Uint8Array(byteNumbers);
    
      byteArrays.push(byteArray);
    }
  
    var blob = new Blob(byteArrays, {type: contentType});
    blob = blob.slice(0, blob.size, contentType)
    var file = new File([blob], name, {type: contentType} )
    this.files.push(file)
    return blob;
  }

  disparaMensagem(mensagem: string, sendingEvent: boolean): void {
    if(!sendingEvent){
      this.snackBar.open(mensagem, 'X', {
        panelClass: ['red-snackbar']
      });
    } else {
      this.snackBar.open(mensagem, 'X', {
        duration: 3000,
        panelClass: ['green-snackbar']
      });
      this.router.navigate(['home'])
    }
  }
}

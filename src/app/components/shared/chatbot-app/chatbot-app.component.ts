import { Component, DoCheck, ViewChild,OnInit, ElementRef, AfterViewChecked, Input}   from '@angular/core';
import { BrowserAnimationsModule }                     from '@angular/platform-browser/animations';
import { trigger, state, style, animate, transition }  from '@angular/animations';
import { ChatBotService, AuthService }                 from '../../../services/index';

@Component({
  selector: 'app-chatbot-app',
  templateUrl: './chatbot-app.component.html',
  styleUrls: ['./chatbot-app.component.css'],
  animations: [
    trigger('btnState', [
      state('inactive', style({
        transform: 'scale(1)'
      })),
      state('active',   style({
        transform: 'scale(0)'
      })),
      transition('inactive <=> active', animate('300ms ease-in-out'))
    ]),
    trigger('divState', [
      state('active', style({
        transform: 'translateY(0)'
      })),
      state('inactive',   style({
        transform: 'translateY(38em)'
      })),
      transition('inactive <=> active', animate('300ms ease-in-out'))
    ])
  ]
})

export class ChatbotAppComponent implements OnInit, DoCheck {

  oldLog:boolean = this._authService.userLog.getValue();

  esconder:boolean = true;
  public state = 'inactive';

  htmlEscribiendo:string = "";
  @ViewChild("listaSms") listaSms:ElementRef;
  @ViewChild("imgChat") imgChat;
  @ViewChild("espDialog") espDialog;

  constructor( public _chatService: ChatBotService, private _authService:AuthService) { }

  ngOnInit() {
    this.setResponse(this._chatService.Chatbot.getValue()[3]);
  }

  ngDoCheck(){
    if(this.oldLog != this._authService.userLog.getValue()){
      this.reiniciar();
      this.oldLog = this._authService.userLog.getValue();
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  inputSms(e) {
    if(e.keyCode == 13 && e.target.value != "" && (e.target.value).trim() != ""){
      this.enviarSms(e.target.value);
      e.target.value = "";
    }
  }
  enviarSms(s:string){
    s = this.evitarInjections(s);
    this.setInput(s);
    this.htmlEscribiendo = "está escribiendo...";
    setTimeout(()=>{
      this._chatService.enviarMensaje(s)
        .then( res =>{
          this.setResponse(res as string);
          this.htmlEscribiendo = "";
        });
    }, 500)
  }
  evitarInjections(entrada){
    return entrada.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  setInput(s:string) {
    var res = '<li class="bocadilloDerecha"><div class="flechaDerecha"></div><p>'+s+'</p></li>';
    res+='<div class="limpiar"></div>';
    this.mostrarSms(res);
  }
  setResponse(r:string) {
    var res = '<li class="bocadilloIzquierda"><div class="flechaIzquierda"></div><p>'+r+'</p></li>';
    res+='<div class="limpiar"></div>';
    this.mostrarSms(res);
  }
  mostrarSms(res:string){
    this.listaSms.nativeElement.insertAdjacentHTML('beforeend', res);
  }

  scrollToBottom(){
    try {
      this.espDialog.nativeElement.scrollTop = this.espDialog.nativeElement.scrollHeight;
    } catch(err) { }
  }

  abrir_cerrar_chat(i){
    this.state = this.state === 'active' ? 'inactive' : 'active';
    setTimeout(()=>{ this.esconder = i }, 300);
  }
  limpiarChat(){
    while (this.listaSms.nativeElement.firstChild) {
      this.listaSms.nativeElement.removeChild(this.listaSms.nativeElement.firstChild);
    }
    this.setResponse(this._chatService.Chatbot.getValue()[3]);
  }
  cerrar_y_limpiar(){
    this.abrir_cerrar_chat(false);
    this.limpiarChat();
  }
  reiniciar(){
    this.state = 'inactive';
    this._chatService.reiniciar();
    this.limpiarChat();
  }

}

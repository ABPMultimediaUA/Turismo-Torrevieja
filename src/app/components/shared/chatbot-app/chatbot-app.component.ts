import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked }   from '@angular/core';
import { BrowserAnimationsModule }                    from '@angular/platform-browser/animations';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ChatBotService, AuthService }                from '../../../services/index';

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

export class ChatbotAppComponent implements OnInit {

  esconder:boolean        =  true;
  nombresChatBot:string[] =  ["Marta", "David"];
  nombreBot:string;
  urlImgBot:string;
  htmlEscribiendo:string = "";


  public state = 'inactive';

  @ViewChild("listaSms") listaSms:ElementRef;
  @ViewChild("imgChat") imgChat;
  @ViewChild("espDialog") espDialog;

  constructor( private _chatService: ChatBotService, private _authService:AuthService) {
    // this.nombreBot = this._authService.Chatbot.getValue()[1];
    this.nombreBot = "Marta";
    this.urlImgBot = this._authService.Chatbot.getValue()[2];
  }

  ngOnInit() {
    var s = "¡Hola! Mi nombre es Marta y soy tu asesora personal de GVENT, "+
            "la aplicación que te permitirá gestionar y administrar tu empresa de eventos con facilidad. "+
            "Pregúntame cualquier duda que tengas sobre nuestra aplicación o nuestros servicios ofrecidos "+
            "y yo intentaré resolverla.";
    this.setResponse(s);
    let o = this.imgChat.nativeElement as HTMLImageElement;
    o.src = '..\\..\\assets\\ImgChatbots\\marta.JPG';
    // o.src = this.urlImgBot;
  }

  abrir_cerrar_chat(i){
    this.state = this.state === 'active' ? 'inactive' : 'active';
    setTimeout(()=>{ this.esconder = i }, 300);
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
    this.htmlEscribiendo = "Escribiendo...";
    // setTimeout(()=>{
      this._chatService.enviarMensaje(s)
        .then( res =>{
          this.setResponse(res as string);
          this.htmlEscribiendo = "";
        });
    // }, 500)
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

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  scrollToBottom(){
    try {
      this.espDialog.nativeElement.scrollTop = this.espDialog.nativeElement.scrollHeight;
    } catch(err) { }
  }

}

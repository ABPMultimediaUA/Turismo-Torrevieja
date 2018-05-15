import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, style, animate, transition } from '@angular/animations';

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
        transform: 'scale(0.5)'
      })),
      transition('inactive <=> active', animate('300ms ease-in-out'))
    ]),
    trigger('chatState', [
      state('inactive', style({
        transform: "translateY(0%)"
      })),
      state('active',   style({
        transform: "translateY(100%)"
      })),
      transition('inactive <=> active', animate('1000ms ease-in-out' ))
    ]),
    trigger('chatState', [
      transition('void => *',[
        style({ transform: "translateY(0%)" }),
        animate(1000, style({ transform: "translateY(100%)" }))

          // style({ backgroundColor: 'red', opacity: 0 }),
          // animate(300, style({  backgroundColor: 'yellow', opacity: 1 })),
      ])
    ])
  ]
})
export class ChatbotAppComponent implements OnInit {

  esconder:boolean        =  true;
  nombresChatBot:string[] =  ["Marta", "David"];
  nombreBot:string;

  public state = 'inactive';

  constructor() {
    this.nombreBot = this.nombresChatBot[0];
  }

  ngOnInit() {
  }

 // abrir_cerrar_chat(i){
 //    this.state = this.state === 'active' ? 'inactive' : 'active';
 //    setTimeout(()=>{ this.esconder = i }, 300);
 //  }
 abrir_cerrar_chat(i){
    var v = document.getElementById("ventanaChat");
    if(v.className == "esconder") {
      v.className = "";
    }else{
      v.className = "esconder";
    }
  }
}

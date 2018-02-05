
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatbotsComponent } from './chatbots.component'
import { BodyComponent } from './body/body.component';
import { ChatCarlosComponent } from './chat-carlos/chat-carlos.component';
import { FooterComponent } from './footer/footer.component';

import { HttpModule } from '@angular/http';

import { ChatbotsRoutingModule } from './chatbots-routing.module';

@NgModule({

  imports: [
    CommonModule,
    ChatbotsRoutingModule
  ],
  declarations: [
    ChatbotsComponent,
    FooterComponent,
    BodyComponent,
    ChatCarlosComponent
  ],
  providers: [

  ]
})

export class ChatbotsModule { }

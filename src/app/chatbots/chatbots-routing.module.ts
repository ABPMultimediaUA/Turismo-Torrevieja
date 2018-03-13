import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { ChatbotsComponent }    from './chatbots.component';
import { BodyComponent }        from './body/body.component';
import { ChatCarlosComponent }  from './chat-carlos/chat-carlos.component';

const chatbots_Routes: Routes = [
  {
    path: '', children:[
      { path: '', component: ChatbotsComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(chatbots_Routes)
  ],
  exports: [
    RouterModule
  ]
})

export class ChatbotsRoutingModule {}

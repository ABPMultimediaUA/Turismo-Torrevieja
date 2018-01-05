import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';
import { ChatMartaComponent } from './chat-marta/chat-marta.component';
import { ChatCarlosComponent } from './chat-carlos/chat-carlos.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HeaderComponent, FooterComponent, BodyComponent, ChatMartaComponent, ChatCarlosComponent]
})
export class ChatbotsModule { }

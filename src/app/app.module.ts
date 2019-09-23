import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DataTableModule} from 'primeng/datatable';
import{routing} from './app.routing';
import {Routes, RouterModule} from "@angular/router";
import { AppComponent } from './app.component';
import { CadastroClienteComponent } from './cliente/cadastro-cliente/cadastro-cliente.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListaClienteComponent } from './cliente/lista-cliente/lista-cliente.component';
import { InputTextModule, ButtonModule, DialogModule } from 'primeng/primeng';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


const APP_ROUTES: Routes = [
        
            {path: 'CadastroCliente', component:CadastroClienteComponent},

];

@NgModule({
  declarations: [
    AppComponent,  
        CadastroClienteComponent,
        ListaClienteComponent
  ],
  imports: [
    
    ReactiveFormsModule,
    BrowserModule,
    AngularFontAwesomeModule,
    DialogModule,
    BrowserModule,
  
InputTextModule,
    FormsModule,
    BrowserAnimationsModule, 
    DataTableModule,
 
    HttpModule,
  
    routing,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

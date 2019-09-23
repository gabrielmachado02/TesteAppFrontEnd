
import{ Routes, RouterModule } from '@angular/router';
import{ModuleWithProviders} from '@angular/core';

import{CadastroClienteComponent}from './cliente/cadastro-cliente/cadastro-cliente.component';
import { ListaClienteComponent } from './cliente/lista-cliente/lista-cliente.component';



const APP_ROUTES: Routes = [
        
            {path: 'CreateOrEditCliente', component:CadastroClienteComponent},
            {path: 'CreateOrEditCliente/:id', component:CadastroClienteComponent},
            {path: 'Listar', component:ListaClienteComponent},

];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
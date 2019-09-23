import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../clienteService';
import { cliente} from '../cliente';
import { toastrService} from 'angular-toastr';
import {LazyLoadEvent} from 'primeng/components/common/api';
import {FilterMetadata} from 'primeng/components/common/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.css'],
  providers: [ClienteService,]
})
export class ListaClienteComponent implements OnInit {
 
  router: Router;
  public fullname: string;
  public editClienteId: any;
  displayDeleteDialog: boolean;
  totalRecords: number;
  private rowData: any[];
toastrService: toastrService;
datasource: cliente[];

  constructor(private  service:ClienteService, router: Router) { 

    this.router = router;
  }

  ngOnInit() {
    this.editClienteId = 0;
    
    this.service.getClientes()
    .subscribe(response=>{
      this.rowData =response;
      this.totalRecords = this.datasource.length;
      this.rowData= this.datasource.slice(0, 10);
   });

  }

  // ao carregar todos clientes na pagina ele ira mostrar sò os 10 primeiros
  //a variavel cliente passada no this.cliente que irá ser declarada no html e ira carregar os clientes 
  showDialogToDelete(cliente:cliente) {
    this.fullname = cliente.nome;
    this.editClienteId = cliente.id;
    this.displayDeleteDialog = true;
    console.log(this.fullname);
}
//ira carregar o id e o nome do cliente 
loadData(){

  this.service.getClientes()
  .subscribe(cliente=>{
    this.rowData =cliente;
 });
}

//metodo boolean por que ira mostrar um dialog confirmado sim ou nao a exclusao
//ao confirmar a exclusao a variavel editContactId do metodo delete pro incrivel que pareça
//recebera o Id do metodo showDialogToDelete

okDelete(isDeleteConfirm: boolean) {
  if (isDeleteConfirm) {
      this.service.Delete(this.editClienteId)
          .subscribe(response => {
              this.editClienteId = 0;
              this.loadData();
      
          });
      this.toastrService.error('Deletado com sucesso!!');
  }
  this.displayDeleteDialog = false;
}

Edit(cliente) {
  console.log(cliente.id);
  this.router.navigate(['/CreateOrEditCliente/' + cliente.id]);
}

loadClienteLazy(event: LazyLoadEvent) {

  setTimeout(() => {
      if(this.datasource) {
          this.rowData = this.datasource.slice(event.first, (event.first + event.rows));
      }
  }, 250);
}
}



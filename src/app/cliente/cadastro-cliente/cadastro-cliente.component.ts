import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../clienteService';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { cliente } from '../cliente';




@Component({

    selector: 'app-cadastro-cliente',
    templateUrl: './cadastro-cliente.component.html',
    styleUrls: ['./cadastro-cliente.component.css'],
    providers: [ClienteService,],


})
export class CadastroClienteComponent implements OnInit {

    
    private gridOptions: any = [];
    busy: boolean = false;
    id: number;
    clientes: string;
    title: string = "Create";
    meuForm: FormGroup;
    clienteService: ClienteService;
    route: ActivatedRoute;
    router: Router;
    mensagem: string = '';
    cliente: cliente=new cliente();
    nome: string;
    data_cadastro: string;
    Telefone: string;
    Telefone2: string;
    Celular: string;
    errorMessage: any;

    constructor(clienteService: ClienteService, private fb: FormBuilder, route: ActivatedRoute, router: Router) {

        this.clienteService = clienteService;
        this.route = route;
        this.router = router;

        if (this.route.snapshot.params["id"]) {
            this.id = this.route.snapshot.params["id"];
        }

        this.meuForm = this.fb.group({
            NAME: [this.cliente.nome, [Validators.required]],
            CPF: ['', [Validators.required]],
            DATANASCIMENTO: ['', [Validators.required]],
            EMAIL: ['', [Validators.required]],
            LOGRADOURO: ['', [Validators.required]],
            CEP: ['', [Validators.required]],
            CIDADE: ['', [Validators.required]],
            NUMERO: ['', [Validators.required]],
        })
    }
  


    ngOnInit() {

        if (this.id > 0) {
            this.title = "Edit";
            this.clienteService.getCliente(this.id)
                .subscribe(resp => {    
                  this.cliente=resp;    

                    
         console.log(resp)
         console.log(this.cliente)
                  
                        , error => this.errorMessage = error
                });
        }

    }



    Salvar(event) {

        event.preventDefault();

        if (this.title == "Create") {
            console.log(this.cliente);
            this.clienteService
                .PostCliente(this.cliente)
                
                .subscribe(res => {
                    this.mensagem = res.mensagem;
                    this.cliente = new cliente();
console.log(this.cliente);
                }, erro => console.log(erro));
        }

        else if (this.title == "Edit") {

            this.clienteService
                .putCliente(this.cliente)
                .subscribe(res => {
                    this.mensagem = res.mensagem;
                    this.cliente = new cliente();

                })
        }
    }
}







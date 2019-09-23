import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { cliente} from '../cliente/cliente';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';




@Injectable()

export class ClienteService {
   

    headers: Headers;
    _http: Http;
    constructor(_http: Http) {

        this._http = _http;
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }
    getClientes() {

        return this._http.get(' https://localhost:44349/api/Cliente/GetAll').map((response: Response) => response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

      getCliente(id: number) {

        return this._http.get('https://localhost:44349/api/Cliente/GetById/' +id).map((response: Response) => response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    PostCliente(cliente: cliente): Observable<MensagemCadastro> {
        return this._http.post('https://localhost:44349/api/Cliente/PostCliente', JSON.stringify(cliente), { headers: this.headers })
            .map(() => new MensagemCadastro('Cliente Cadastrado', true));

    }


   putCliente(cliente: cliente): Observable<MensagemCadastro> {
        return this._http.put('https://localhost:44349/api/Cliente/PutCliente/', JSON.stringify(cliente), { headers: this.headers })
        .catch(this.errorHandler);  
    }

   Delete(id:number): Observable<MensagemCadastro> {
        return this._http.delete('https://localhost:44349/api/Cliente/DeleteCliente/'
        + id , { headers: this.headers })
            .map(() => new MensagemCadastro('Cliente removido', true));

    }

    errorHandler(error: Response) {  
        console.log(error);  
        return Observable.throw(error);  
    }  
}

export class MensagemCadastro {

     constructor(private _mensagem: string, private _inclusao: boolean) {

        this._mensagem = _mensagem;
        this._inclusao = _inclusao;
    }

    get mensagem(): string {
        return this._mensagem;
    }

    get inclusao(): boolean {

        return this._inclusao;
    }


}
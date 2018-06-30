import{Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Cuentas } from './cuentas';


@Injectable()
export class CuentasService{

    constructor(private http:HttpClient){

    }

    
    getCuentas(token:string){
        return this.http.get('http://' + window.location.hostname + ':3000/api/cuentas_kgs', {headers: {"Authorization" : token }});   
    }


    postCuentas(cuentas:Cuentas, token:string){
        return this.http.post('http://' + window.location.hostname +  ':3000/api/cuentas_kgs', cuentas, {headers: {"Authorization" : token }});
    }

    putCuentas(cuentas:Cuentas, token:string){
        return this.http.put('http://' + window.location.hostname + ':3000/api/cuentas_kgs/'+cuentas.codigo, cuentas, {headers: {"Authorization" : token }});
    }

    
    deleteCuenta(cod_cuentas:string, token:string){
        const url='http://' + window.location.hostname + ':3000/api/cuentas_kgs/'+cod_cuentas;
        return this.http.delete(url, {headers: {"Authorization" : token }});
    }

    getTipoCuentas(token:string){
        return this.http.get('http://' + window.location.hostname +  ':3000/api/Tipocuentas', {headers: {"Authorization" : token }});
    }
   
   
}
import { Component, OnInit} from '@angular/core';

import {Cuentas} from '../../cuentas';
import { CookieService } from 'ngx-cookie-service';

import {CuentasService} from '../../cuentas.service';

import {Router} from '@angular/router';
import 'usuarios.js';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { TipoCuentas } from '../../tipocuentas';
declare var usuariosScript: any;

@Component({
    selector: 'cuentas-table',
    templateUrl: './cuentas.component.html',
})

export class CuentasComponent implements OnInit{

private cuentas: Cuentas;
private cuentass: Cuentas[] = [];
private tipoCuentas: TipoCuentas[] = [];
private CuentaNuevo : Cuentas;
private cuentaEditada: Cuentas;

private codigoNuevo: number;
private nombreNuevo: string;
private descripcionNuevo: string;
private tipoCuentaNuevo: number;

private codigoEditar: number;
private nombreEditar: string;
private descripcionEditar: string;
private tipoCuentaEditar: number;

private authLevel = 1;

 constructor(private cuentasService: CuentasService, private cookieService:CookieService, private spinnerService: Ng4LoadingSpinnerService, private router: Router) {
       this.cuentas = new Cuentas(0,0, '','');
       console.log('Tipo : ' + this.cookieService.get('tipoCuentas'));
       if(parseInt(this.cookieService.get('tipoCuentas')) != this.authLevel)
           this.router.navigate(['panel']);
}

   

    ngOnInit() {
        this.spinnerService.show();
        this.cuentasService.getCuentas(this.cookieService.get('token')).subscribe(
            (data: Cuentas[])=>{
                console.log(data);
                this.cuentass=data;

                this.cuentasService.getTipoCuentas(this.cookieService.get('token')).subscribe(
                    (tipoc:TipoCuentas[])=>{
                        console.log(tipoc);
                        this.tipoCuentas=tipoc;
        
                        this.cuentass.forEach(cuenta => {
                            console.log(this.tipoCuentas.find(x => x.codTipocuentas == cuenta.codTipocuentas));
                            cuenta.tipoRol = this.tipoCuentas.find(x => x.codTipocuentas == cuenta.codTipocuentas).descripcion;
                        });
                        this.spinnerService.hide();
                    },
                    (error)=>{
                        console.log("Error al recuperar del api");
                        this.spinnerService.hide();
                    }
                   )

            },
            (error)=>{
                console.log("Error al recuperar del api");
                this.spinnerService.hide();
            }
        )
      }

      onChange(newValue){
        console.log(newValue);
        this.tipoCuentaNuevo= parseInt(newValue);
        this.tipoCuentaEditar= parseInt(newValue);
    }


    crearCuenta()
      {        
          this.CuentaNuevo = new Cuentas(this.codigoNuevo,this.tipoCuentaNuevo, this.nombreNuevo, this.descripcionNuevo);
              console.log(this.CuentaNuevo);
          this.cuentasService.postCuentas(this.CuentaNuevo,this.cookieService.get('token')).subscribe((response) => {
              console.log(response)              
              usuariosScript.ocultarCrear();
              location.reload();
             
            });

           
      }


      eliminarCuenta(codCuenta:string){
        this.cuentasService.deleteCuenta(codCuenta,this.cookieService.get('token')).subscribe((response) => {
            console.log(response);
            console.log("Borrado");
            window.alert("Cuenta eliminada");
            location.reload();

            
          });
    }

    mostrarEditar(codigo: number)
    {
       var p = this.cuentass.find(x => x.codigo == codigo);
       
       this.codigoEditar=p.codigo;
       this.nombreEditar=p.nombre;
       this.descripcionEditar=p.descripcion;
       this.tipoCuentaEditar = p.codTipocuentas;
       usuariosScript.mostrarEditar(codigo);
   }
  
   editarCuenta()
   {
       this.cuentaEditada = new Cuentas(this.codigoEditar, this.tipoCuentaEditar,this.nombreEditar,
         this.descripcionEditar);
       console.log(this.codigoEditar);
       console.log(this.cuentaEditada);
       this.cuentasService.putCuentas(this.cuentaEditada,this.cookieService.get('token')).subscribe((response) => {
           console.log(response);
           usuariosScript.ocultaEditar();
           location.reload();
       });
   }


      /*guardar(){
        console.log('guardar');
        this.cuentasService.postCuentas(this.cuentas).subscribe(
        (res) =>{
          this.cuentass.push(this.cuentas);
          window.alert('Agregado Exitosamente');
          location.reload();
    
        },
    
        (error)=>{
            console.log(error);
          window.alert('Error al agregar');
    
        });
    }*/


     
}

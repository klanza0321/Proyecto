import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';

import {Router} from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

import { UsuariosComponent } from './usuarios/usuarios.component';

import { DashboardComponent } from './dashboard.component'; 


@Component({
     selector: 'panel-page',
     templateUrl: './panel.component.html',
})

export class PanelComponent implements OnInit{
    private usuarios = false;
    private dashboard = false;
    private esAdministrador = false;

    constructor(private cookieService:CookieService, private router: Router) {
        if(cookieService.get('token') != "")
        {
            console.log("Hay una sesion panel");
            console.log(cookieService.get('token'));
            if(parseInt(cookieService.get('tipoUsuario')) == 1)
                this.esAdministrador = true;
                if(parseInt(cookieService.get('tipoCuentas')) == 1)
                this.esAdministrador = true;

            if(this.router.url == "/panel")
            {
                this.dashboard = true;
            }
            else if(this.router.url == "/panel/usuarios")
            {
                this.usuarios = true;
            }
        }
        else
        {
            console.log("Debe hacer login primero");
            this.router.navigate(['']);
        }
    }

    logout()
    {
        this.usuarios = false;
        this.dashboard = false;
        this.router.navigate(['logout']);
    }

    ngOnInit() {

    }
    
}
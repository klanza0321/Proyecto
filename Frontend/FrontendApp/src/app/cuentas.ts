export class Cuentas{

    public codigo: number;
    public codTipocuentas: number;
    public nombre: string;
    public descripcion: string;
    public tipoRol: string;
   

    constructor(codigo: number, codTipocuentas: number, nombre: string,
                descripcion: string){
        
        this.codigo = codigo;
        this.codTipocuentas = codTipocuentas;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.tipoRol = "";
        
            
    }
}
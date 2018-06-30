export class TipoCuentas{
    public codTipocuentas: number;
    public nombre:string;
    public descripcion:string;

    /**
     *
     */
    constructor(codTipocuentas, nombre, descripcion) {
        this.codTipocuentas=codTipocuentas;
        this.nombre=nombre;
        this.descripcion=descripcion;
    }
}
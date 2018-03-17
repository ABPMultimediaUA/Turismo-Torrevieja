
export interface Usuario
{
    identificador:string;
    nombreUsuario:string;
    apodo:string;
    correo:string;
    password:string;
    password_confirmation:string;
    esVerificado:number;
    //key$?:string; identificador es la key
    rol:number;

}

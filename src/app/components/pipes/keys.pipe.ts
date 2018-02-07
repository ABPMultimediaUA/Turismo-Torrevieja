import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys',
  pure:false//esto es para que este pendiente
            //tambiend el ciclo de cambios que hace angular
})
export class KeysPipe implements PipeTransform {

  transform(value: any): any {

    let keys = [];
    for( let key in value){ //value es el objeto que viene de firebase o
      keys.push(key)
    }
    return keys;
  }

}

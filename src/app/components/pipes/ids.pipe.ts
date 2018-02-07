import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ids',
  pure:false//esto es para que este pendiente
            //tambiend el ciclo de cambios que hace angular
})
export class IdsPipe implements PipeTransform {

  transform(value: any): any {

    let ids = [];
    for( let id in value){
      ids.push(id)
    }
    return ids;
  }

}

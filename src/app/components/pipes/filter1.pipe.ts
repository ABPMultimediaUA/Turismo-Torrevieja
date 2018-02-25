import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter1',
    pure: false
})
export class Filter1Pipe implements PipeTransform {
    transform(resultados: any[], filter): any {
        if (!resultados || !filter) {
            return resultados;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return resultados.filter(resul => resul.nombreEvento.indexOf(filter.nombreEvento) !== -1);
    }
}

import { Pipe, PipeTransform } from '@angular/core';
import { Cartera }  from "../../interfaces/cartera.interface";

@Pipe({
    name: 'myfilter',
    pure: false
})
export class CarterasFilterPipe implements PipeTransform {
    transform(items: any[], filter: Cartera): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out

        console.log(items);
        console.log(filter);
        console.log(items[0].title);

        return items.filter(item => item.title.indexOf(filter.estado) !== 3);
    }
}

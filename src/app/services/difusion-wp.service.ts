import { Injectable } from '@angular/core';

@Injectable()
export class DifusionWpService {

  host:any = 'http://tudominio.com/wp-json/wp/v2/posts/';
  data:any[] = [];

  header = new Headers ({
    'Content-Type':'application/json',
    'Content-Length':'2',
    'Authorization':btoa('wpTorrevieja:ar@&78Gl7)^EIR3jk*LHqtuU'),
  });
  constructor(  ) { }

}

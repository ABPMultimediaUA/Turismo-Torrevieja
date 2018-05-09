export interface PaginasInterface {
  access_token: string; //page_access_token
  name: string; //nombre de la pagina
  id: string; //id de la pagina
  perms: Array<Perms>; //permisos del usuario sobre esta pagina
  category: string; //categoria principal de la pagina
  category_list: Array<Categories>; //lista de categorias de la pagina ppaly secundarias
}
export interface Perms {
  name: string; //nombre del permiso
}
export interface Categories {
  id: number; //id de la categoria
  name: string; //nombre de la categoria
}

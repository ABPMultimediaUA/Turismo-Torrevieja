export interface PaginacionInterface
{
  count:number;
  current_page:number;
  links:LinkInterface;
  per_page:number;
  total:number;
  total_pages:number;
}
interface LinkInterface{
  previous:string;
  next:string;
}

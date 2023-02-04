import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const baseUrl=environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  
  constructor(private http:HttpClient) { }

  getProduct(){
    const endpoint=`${baseUrl}/products`
    return this.http.get(endpoint);
  }

  saveProduct(body:any){
    const endpoint=`${baseUrl}/products`;
    return this.http.post(endpoint,body);
  }

  updateProduct(body:any,id:any){
    const endpoint=`${baseUrl}/products/${id}`;
    return this.http.put(endpoint,body);
  }

  delete(id:any){
    const endpoint=`${baseUrl}/products/${id}`;
    return this.http.delete(endpoint);
  }

  getByName(name:any){
    const endpoint=`${baseUrl}/products/filter/${name}`;
    return this.http.get(endpoint);
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/modules/shared/services/product.service';

export interface ProductElement{
  id:number;
  name:string;
  price:number;
  account: number;
  category: any;
  picture:any;
}
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  displayedColumns: string[] = ['id','name','price','account','category','picture','actions'];
  dataSource = new MatTableDataSource<ProductElement>;

  @ViewChild(MatPaginator)
  paginator!:MatPaginator;

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProduct().subscribe(data=>{
      console.log("respuesta productos: ",data);
      this.proccesProductResponse(data);
    },error=>{
      console.log(error);
    })
  }

  proccesProductResponse(response:any){
    const dateProduct: ProductElement[]=[];
    if(response.metadata[0].code=="00"){
      let listProduct=response.products.products;
      listProduct.forEach((element:ProductElement)=>{
        element.category=element.category.name;
        element.picture= 'data:image/jpeg;base64,'+element.picture;
        dateProduct.push(element);
      });

      this.dataSource= new MatTableDataSource<ProductElement>(dateProduct);
      this.dataSource.paginator=this.paginator;
    }
  }

}

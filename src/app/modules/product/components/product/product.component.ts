import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ConfrmComponent } from 'src/app/modules/shared/components/confrm/confrm.component';
import { ProductService } from 'src/app/modules/shared/services/product.service';
import { NewProductComponent } from '../new-product/new-product.component';

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

  constructor(private productService:ProductService,public dialog: MatDialog,
    private snacknar: MatSnackBar) { }

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
        //element.category=element.category.name;
        element.picture= 'data:image/jpeg;base64,'+element.picture;
        dateProduct.push(element);
      });

      this.dataSource= new MatTableDataSource<ProductElement>(dateProduct);
      this.dataSource.paginator=this.paginator;
    }
  }

  openProductDialog(){
    const dialogRef = this.dialog.open(NewProductComponent , {
      width:'450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result==1){
        this.openSnackBar("Producto agregado","Exitosa");
        this.getProducts();
      }else if(result==2){
        this.openSnackBar("Se produjo un error al guardar producto","Error");
      }
    });
  }

  openSnackBar(message:string, action:string):MatSnackBarRef<SimpleSnackBar>{
    return this.snacknar.open(message,action,{
      duration:2000,

    })
  }

  edit(id:number,name:string,price:number,account:number,category:any){
    const dialogRef = this.dialog.open(NewProductComponent , {
      width:'450px',
      data:{
        id:id,
        name:name,
        price:price,
        account:account,
        category:category,
        
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result==1){
        this.openSnackBar("Producto editado","Exitosa");
        this.getProducts();
      }else if(result==2){
        this.openSnackBar("Se produjo un error al editar producto","Error");
      }
    });
  }

  delete(id:any){
    const dialogRef = this.dialog.open(ConfrmComponent , {
      width:'450px',
      data:{
        id:id,
        flag:"product"        
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result==1){
        this.openSnackBar("Producto eliminado","Exitosa");
        this.getProducts();
      }else if(result==2){
        this.openSnackBar("Se produjo un error al eliminar producto","Error");
      }
    });
  }

}

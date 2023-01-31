import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

import{ConfrmComponent} from '../../../shared/components/confrm/confrm.component';

export interface CategoryElement{
  id:number;
  name:string;
  description:string;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService, public dialog: MatDialog,
              private snacknar: MatSnackBar) { }

  ngOnInit(): void {
    this.getCategories();
  }

  displayedColumns: string[] = ['id','name','description','actions'];
  dataSource = new MatTableDataSource<CategoryElement>;

  @ViewChild(MatPaginator)
  paginator!:MatPaginator;

  getCategories(){
    this.categoryService.getCategories().subscribe(data =>{
      //console.log("respuesta categories: ",data);
      this.processCategoriesResponse(data);


    },(error => {console.log("error: ",error)}))
  }

  processCategoriesResponse(resp:any){
      const dataCategory: CategoryElement[]=[];
      if(resp.metadata[0].code=="00"){
        let listCategory = resp.categoryResponse.category;
        listCategory.forEach((element: CategoryElement)=>{
          dataCategory.push(element);
        });

        this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
        this.dataSource.paginator=this.paginator;
      }
  }

  openCategoryDialog(){
    const dialogRef = this.dialog.open(NewCategoryComponent , {
      width:'450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result==1){
        this.openSnackBar("Categoria agregada","Exitosa");
        this.getCategories();
      }else if(result==2){
        this.openSnackBar("Se produjo un error al guardar categoria","Error");
      }
    });
  }

  openSnackBar(message:string, action:string):MatSnackBarRef<SimpleSnackBar>{
    return this.snacknar.open(message,action,{
      duration:2000,

    })
  }

  edit(id:number,name:string,description:string){
    const dialogRef = this.dialog.open(NewCategoryComponent , {
      width:'450px',
      data:{
        id:id,
        name:name,
        description:description,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result==1){
        this.openSnackBar("Categoria actualizada","Exitosa");
        this.getCategories();
      }else if(result==2){
        this.openSnackBar("Se produjo un error al actualizar categoria","Error");
      }
    });

  }

  delete(id:any){
    const dialogRef = this.dialog.open(ConfrmComponent , {
      data:{
        id:id,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result==1){
        this.openSnackBar("Categoria borrada","Exitosa");
        this.getCategories();
      }else if(result==2){
        this.openSnackBar("Se produjo un error al borrar categoria","Error");
      }
    });
  }

  search(id:string){
    if(id.length==0){
      return this.getCategories();
    }

    this.categoryService.getCategoryById(id).subscribe(data=>{
      this.processCategoriesResponse(data);
    })
  }

}

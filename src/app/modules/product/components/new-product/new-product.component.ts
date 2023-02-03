import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { ProductService } from 'src/app/modules/shared/services/product.service';

export interface Category{
  id:number;
  name:string;
  description:string
}
@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  categories:Category[]=[];
  title:string
  public productForm: FormGroup;
  selecteFile:any;
  nameImage:string='';
  constructor(private fb: FormBuilder, private productService:ProductService,private categoryService: CategoryService, private dialogRef: MatDialogRef<NewProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { 
      this.productForm=this.fb.group({
        name:['',Validators.required],
        price:['',Validators.required],
        account:['',Validators.required],
        category:['',Validators.required],
        picture:['',Validators.required],
      });
      this.title="Añadir producto";
    }

  ngOnInit(): void {
    this.getCategories();
  }

  onSave(){
    let data = {
      name:this.productForm.get('name')?.value,
      price:this.productForm.get('price')?.value,
      account:this.productForm.get('account')?.value,
      category:this.productForm.get('category')?.value,
      picture:this.selecteFile 
    }

    const uploadImageData= new FormData();
    uploadImageData.append('picture',data.picture, data.picture.name);
    uploadImageData.append('name', data.name);
    uploadImageData.append('price',data.price);
    uploadImageData.append('account',data.account);
    uploadImageData.append('categoryId',data.category);

    //llamamos al servicio para guardar 
    this.productService.saveProduct(uploadImageData).subscribe((data:any)=>{
      this.dialogRef.close(1);
    },error=>{
      this.dialogRef.close(2);
    })


  }

  onCancel(){
    this.dialogRef.close(3);
  }

  getCategories(){
    this.categoryService.getCategories().subscribe((data:any)=>{
      this.categories=data.categoryResponse.category;
    },error=>{
      console.log("error al consultar categorias")
    })
  }

  onFileChange(event:any){
    this.selecteFile=event.target.files[0];
    console.log(this.selecteFile);
    this.nameImage=event.target.files[0].name;
  }



}

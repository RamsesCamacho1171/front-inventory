import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-confrm',
  templateUrl: './confrm.component.html',
  styleUrls: ['./confrm.component.css']
})
export class ConfrmComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<ConfrmComponent>, @Inject(MAT_DIALOG_DATA) public data:any,
              private categoryService: CategoryService, private productservice:ProductService) { }

  ngOnInit(): void {
  }

  onNoClick(){
    this.dialogRef.close(3)
  }

  delete(){
    if(this.data!=null){
      if(this.data.flag=="category"){
        this.categoryService.deleteCategory(this.data.id).subscribe((data=>{
          this.dialogRef.close(1);
        }),(error=>{
          this.dialogRef.close(2);
        }))
      }else if(this.data.flag=="product"){
        this.productservice.delete(this.data.id).subscribe(data=>{
          this.dialogRef.close(1);
        },error=>{
          this.dialogRef.close(2);
        })
      }
      
    }else{
      this.dialogRef.close(2);
    }
  }

}

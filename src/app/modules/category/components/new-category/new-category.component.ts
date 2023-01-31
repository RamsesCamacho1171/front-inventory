import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  public title:string;
  public categoryForm: FormGroup;
  constructor(private fb: FormBuilder, private categoryService: CategoryService, private dialogRef: MatDialogRef<NewCategoryComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any) { 

    this.categoryForm= this.fb.group({
      name:['', Validators.required],
      description:['',Validators.required]
    });

    this.title="Agregar nueva categoria";


    if(data != null){
      this.title="Actualizar Categoria"
      this.updateForm(data);
    }


  }

  ngOnInit(): void {
  }

  onSave(){
    let data ={
      name:this.categoryForm.get('name')?.value,
      description:this.categoryForm.get('description')?.value,
    }

    if(this.data != null){
      this.categoryService.updateCategory(data, this.data.id).subscribe((data:any)=>{
        this.dialogRef.close(1);
      },(error=>{
        this.dialogRef.close(2);
      }))
    }else{
      this.categoryService.saveCategory(data).subscribe( data=> {
        //console.log(data);
        this.dialogRef.close(1);
      },(error=>{
        this.dialogRef.close(2);
      }));
    }
  }

  onCancel(){
    this.dialogRef.close(3);
  }

  updateForm(data:any){
    this.categoryForm= this.fb.group({
      name:[data.name, Validators.required],
      description:[data.description,Validators.required]
    });
  }

}

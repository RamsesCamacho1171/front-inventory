import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ConfrmComponent } from './components/confrm/confrm.component';



@NgModule({
  declarations: [
    SidenavComponent,
    ConfrmComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule
  ],
  exports:[SidenavComponent]
})
export class SharedModule { }

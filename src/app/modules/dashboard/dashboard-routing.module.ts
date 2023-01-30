import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard.component';

const routes : Routes=[
    {
        path: 'dashboard', 
        component:DashboardComponent,
        loadChildren: () => import('./router-child.modules').then(m => m.RouterChildModule)
    },
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class DashboardRoutingModule { }

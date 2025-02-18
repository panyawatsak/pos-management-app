import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './component/home/home.component';
import {CategoryComponent} from './component/category/category.component';
import {ProductComponent} from './component/product/product.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'product', component: ProductComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
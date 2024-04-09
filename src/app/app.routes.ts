import {Routes} from '@angular/router';
import {HomeComponent} from "./components/pages/home/home.component";
import {AddProductComponent} from "./components/pages/add-product/add-product.component";
import {CartComponent} from "./components/pages/cart/cart.component";

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "products/add",
    component: AddProductComponent
  },
  {
    path: "cart",
    component: CartComponent
  },
];

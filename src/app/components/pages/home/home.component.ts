import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {Product} from "../../../types";
import {CommonModule} from "@angular/common";
import {ProductCardComponent} from "../../product-card/product-card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private productService: ProductService) {
  }

  products: Product[] = [];
  loading: boolean = true;

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: products => {
        console.log(products);
        this.products = products;
        this.loading = false;
      },
      error: error => {
        console.log(error)
        this.loading = false;
      },
    })
  }

}

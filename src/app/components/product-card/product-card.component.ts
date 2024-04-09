import {Component, Input} from '@angular/core';
import {Product} from "../../types";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    RouterLink

  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: Product;
}

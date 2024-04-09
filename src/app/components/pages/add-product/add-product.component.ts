import {Component, Input, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {ProductCardComponent} from "../../product-card/product-card.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProductService} from "../../../services/product.service";
import {Product} from "../../../types";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    NgForOf,
    ProductCardComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit {
  @Input() product: Product | undefined = undefined;
  editMode: boolean = false;

  formGroup: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    price: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    image: new FormControl("", [Validators.required]),
    category: new FormControl("", [Validators.required]),
  });

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.editMode = !!(this.route.snapshot.queryParams['edit'] && this.route.snapshot.queryParams['product']);
    console.log(this.editMode);
    // console.log(this.route.snapshot.fragment);
    if (this.editMode) {
      this.productService.getSingleProduct(this.route.snapshot.queryParams['product']).subscribe({
        next: product => {
          console.log(product);
          this.product = product;
          this.formGroup = new FormGroup({
            name: new FormControl(this.product ? this.product.title : "", [Validators.required]),
            price: new FormControl(this.product ? this.product?.price : "", [Validators.required]),
            description: new FormControl(this.product ? this.product?.description : "", [Validators.required]),
            image: new FormControl(this.product ? this.product?.image : "", [Validators.required]),
            category: new FormControl(this.product ? this.product?.category : "", [Validators.required]),
          });
        },
        error: (error) => console.log(error)
      })
    }
  }

  onSubmit() {
    console.log(this.formGroup.value);
    const data: Product = {
      title: this.formGroup.value.name,
      description: this.formGroup.value.description,
      image: this.formGroup.value.image,
      price: this.formGroup.value.price,
      category: this.formGroup.value.category
    }
    if (this.editMode && this.product) {
      this.productService.updateProduct(this.product.id!, data).subscribe({
        next: product => {
          console.log("Edited Successfully!")
          console.log(product)
        },
        error: err => console.log(err)
      })
    }else{
      this.productService.addProduct(data).subscribe({
        next: product => {
          console.log("Added Successfully!")
          console.log(product)
        },
        error: err => console.log(err)
      })
      this.formGroup.reset()
    }
  }
}

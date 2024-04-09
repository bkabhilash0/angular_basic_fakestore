import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../types";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private URL = "https://fakestoreapi.com/products"

  constructor(private httpClient: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get(this.URL, {}) as Observable<Product[]>;
  }

  getSingleProduct(id:number): Observable<Product> {
    return this.httpClient.get(`${this.URL}/${id}`, {}) as Observable<Product>;
  }

  addProduct(product: Product): Observable<Product> {
    return this.httpClient.post(this.URL, product) as Observable<Product>;
  }

  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    return this.httpClient.patch(`${this.URL}/${id}`, product) as Observable<Product>;
  }

  deleteProduct(id: number): Observable<Product> {
    return this.httpClient.delete(`${this.URL}/${id}`) as Observable<Product>;
  }
}

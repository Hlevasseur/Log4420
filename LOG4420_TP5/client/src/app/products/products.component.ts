import { Component, OnInit } from '@angular/core';
import {Product, ProductsService} from '../services/products.service';

/**
 * Defines the component responsible to manage the display of the products page.
 */
@Component({
  selector: 'products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit{
  productsList: Product[];
  sortingCriteria = "price-asc";
  category = "";
  
  constructor(private productService: ProductsService) { }
 
  ngOnInit() {
    this.getProducts();
  }
 
  getProducts(): void {
    this.productService.getProducts(this.sortingCriteria,this.category)
        .then(products => this.productsList = products);
  }
  
  
}

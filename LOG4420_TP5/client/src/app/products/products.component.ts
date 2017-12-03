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
  selectedCriteria="Prix (bas-haut)";
  selectedCategory="Tous les produits";
  categoryList = [ 
    "Appareils photo",
    "Consoles",
    "Écrans",
    "Ordinateurs",
    "Tous les produits"
  ];
  classementList = [ 
    "Prix (bas-haut)",
    "Prix (haut-bas)",
    "Nom (A-Z)",
    "Nom (Z-A)"
  ];
  
  constructor(private productService: ProductsService) { }
 
  ngOnInit() {
    this.getProducts();
  }
 
  getProducts(): void {
    this.productService.getProducts(this.sortingCriteria,this.category)
        .then(products => this.productsList = products);
  }
  
  updateCategory(category:string):void {
    if(category==="Tous les produits"){
      this.category="";
    }else if(category==="Appareils photo"){
      this.category="cameras";
    }else if(category==="Ordinateurs"){
      this.category="computers";
    }else if(category==="Consoles"){
      this.category="consoles";
    }else if(category==="Écrans"){
      this.category="screens";
    }
    this.selectedCategory = category;
    this.getProducts();
  }
  updateClassement(classement:string):void {
    if(classement==='Prix (bas-haut)'){
      this.sortingCriteria = "price-asc";
    }else if(classement==='Prix (haut-bas)'){
      this.sortingCriteria = "price-dsc";
    }else if(classement==='Nom (A-Z)'){
      this.sortingCriteria = "alpha-asc";
    }else if(classement==='Nom (Z-A)'){
      this.sortingCriteria = "alpha-dsc";
    }
    this.selectedCriteria=classement;
    this.getProducts();
  }
  
}

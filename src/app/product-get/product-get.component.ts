import { Component, OnInit } from '@angular/core';
import Product from '../Product';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-get',
  templateUrl: './product-get.component.html',
  styleUrls: ['./product-get.component.scss']
})
export class ProductGetComponent implements OnInit {
  products: Product[];
  constructor(private productService: ProductsService) {}

  deleteProduct(id) {
    this.productService.deleteProduct(id).subscribe(res => {
      this.products.splice(id, 1);
    });
  }

  ngOnInit() {
    this.productService
      .getProducts()
      .subscribe((data: Product[]) => (this.products = data));
  }
}

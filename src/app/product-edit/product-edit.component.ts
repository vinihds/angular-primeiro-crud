import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  angForm: FormGroup;
  product: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.formBuilder.group({
      ProductName: ['', Validators.required],
      ProductDescription: ['', Validators.required],
      ProductPrice: ['', Validators.required]
    });
  }

  updateProduct(ProductName, ProductDescription, ProductPrice, id) {
    this.route.params.subscribe(params => {
      this.productService.updateProduct(
        ProductName,
        ProductDescription,
        ProductPrice,
        params.id
      );
      this.router.navigate(['products']);
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productService
        .editProduct(params['id'])
        .subscribe(res => (this.product = res));
    });
  }
}

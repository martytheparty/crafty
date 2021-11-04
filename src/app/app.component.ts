import { Component } from '@angular/core';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CRAFTY-BY-MELISSA';
  products = [];
  crossReferences = {};
  images = {};

  constructor(private ps: ProductsService) {
    ps.products.subscribe(
      (productListing) => {
        this.products = productListing;
        this.updateProducts();
      }
    );

  }

  updateProducts() {
    // products are updated any time data is updated
  }
}

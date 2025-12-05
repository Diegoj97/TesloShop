import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { ProductsService } from '../../../products/services/products.service';

@Component({
  selector: 'app-product-page',
  imports: [CommonModule],
  templateUrl: './product-page.html',
  styleUrls: ['./product-page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPage { 


  route = inject(ActivatedRoute);
  productService = inject(ProductsService);

  productId$ = this.route.params.pipe(map(params => params['id']));

  productResponse$ = this.route.params.pipe(
    map(params => params['id']),
    switchMap(id => this.productService.getProductById({ id }))
  );

}

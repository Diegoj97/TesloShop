import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductCard } from '../../../products/components/product-card/product-card';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../products/services/products.service';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, ProductCard],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {

  
productService = inject(ProductsService);
productsResponse$ = this.productService.getProducts();
products$ = this.productsResponse$.pipe(map(res => res.products))



 }



import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductsService } from '../../../products/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { ProductResponse } from '../../../products/interfaces/product-response';
import { ProductCard } from '../../../products/components/product-card/product-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCard, CommonModule],
  templateUrl: './gender-page.html',
  styleUrls: ['./gender-page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenderPage implements OnInit, OnDestroy {
  route = inject(ActivatedRoute);
  productService = inject(ProductsService);

  gender = signal<string>('');
  products = signal<ProductResponse[] | null>(null);

  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const genderParam = params['gender'];
        this.gender.set(genderParam);
        this.products.set(null);
        this.productService.getProducts({ gender: genderParam })
          .pipe(takeUntil(this.destroy$))
          .subscribe(resp => {
            this.products.set(resp.products);
          });
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

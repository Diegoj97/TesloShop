import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { ProductResponse } from '../../interfaces/product-response';

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [RouterLink, TruncatePipe],
  template: `<div class="ts-card ts-rounded ts-p-4">
  <figure style="margin-bottom:1rem;">
    <img
      [src]="'http://localhost:3000/api/files/products/' + product()?.images?.[0]" 
      [alt]="product()?.title || 'product image'" style="width:100%;border-radius:0.5rem;max-height:180px;object-fit:cover;" />
  </figure>
  <div>
    <div class="title">{{ product()?.title || 'Untitled' }}</div>
    <span class="ts-badge ts-mt-3">NEW</span>
    <p>{{ product()?.description ? (product()?.description | truncate:70) : 'No description available.' }}</p>
    <p class="meta">{{ '$' + (product()?.price ?? 0) }}</p>
    <div style="display:flex;justify-content:end;gap:0.5rem;">
      <span class="ts-badge">{{ product()?.gender || product()?.tags?.[0] || 'General' }}</span>
      <a [routerLink]="['/product', product()?.slug]" class="ts-btn ts-btn-outline ts-rounded">more</a>
    </div>
  </div>
</div>`,
  styleUrls: ['./product-card.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCard {
  product = input<ProductResponse>();
}


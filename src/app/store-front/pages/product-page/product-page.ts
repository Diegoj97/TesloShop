import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-product-page',
  imports: [],
  templateUrl: './product-page.html',
  styleUrls: ['./product-page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPage { }

import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductResponse } from '../interfaces/product-response';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    private apiUrl = 'http://localhost:3000/api/products';
    private http = inject(HttpClient);

  getProducts(): Observable<{ products: ProductResponse[]; total: number; pages: number;  }> {
  return this.http.get<{ products: ProductResponse[]; total: number; pages: number; }>(this.apiUrl);
}

}
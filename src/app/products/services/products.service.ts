import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductResponse } from '../interfaces/product-response';
import { environment } from '../../../environments/environment';


interface options {    
    limit?: number;
    offset?: number;
    gender?: string;
}

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
 
    private apiUrl = environment.baseUrl + '/products';
    private http = inject(HttpClient);


  getProducts(options: options): Observable<{ products: ProductResponse[]; total: number; pages: number;  }> {

  const { limit = 10, offset = 0, gender = '' } = options;

  return this.http.get<{ products: ProductResponse[]; total: number; pages: number; }>(this.apiUrl,
    {
      params: {
        limit: limit,
        offset: offset,
        gender: gender 
      }
    });
}

getProductById({ id }: { id: string }): Observable<ProductResponse> {
  console.log('ID recibido en el servicio:', id);
  return this.http.get<ProductResponse>(`${this.apiUrl}/${id}`);
}

getProductsBygender(options: options): Observable<{ products: ProductResponse[]; total: number; pages: number;  }> {
  return this.getProducts(options);

}
}
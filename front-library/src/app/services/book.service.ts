
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

interface Book {
  id: number;
  title: string;
  authors: string;
  gender: string;
  availability: boolean;
}
interface User {
  idNumber: number;
  firstName: string;
  lastName: string;
  loanDate: string;
  returnDate: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'http://localhost:8088/api/holding' ;

  constructor(private http: HttpClient) {}

  private username: string = 'juan';
  private password: string = 'abc123'; 

  getAuthHeaders(): HttpHeaders {
    const base64Credentials = btoa(`${this.username}:${this.password}`);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Basic ${base64Credentials}`
    });
  }

  list(): Observable<Book[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Book[]>(`${this.apiUrl}/list`, { headers });
  }
  
  
  save(product: Book): Observable<HttpResponse<void>> {
    const headers = this.getAuthHeaders();
    return this.http.post<void>(this.apiUrl, product, { headers, observe: 'response' });
  }
  
  update(book: Book): Observable<HttpResponse<void>> {
    const headers = this.getAuthHeaders();
    return this.http.put<void>(`${this.apiUrl}/updateBook`, book, { headers, observe: 'response' });
  }
  
  delete(productId: number): Observable<HttpResponse<void>> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${productId}`, { headers, observe: 'response' });
  }
  
  getProductId(productId: number): Observable<HttpResponse<void>> {
    const headers = this.getAuthHeaders();
    return this.http.get<void>(`${this.apiUrl}/${productId}`, { headers, observe: 'response'});
  }

  saveShedule(user: User): Observable<HttpResponse<void>> {
    const headers = this.getAuthHeaders();
    return this.http.post<void>(`${this.apiUrl}/schedule`, user, { headers, observe: 'response' });
  }

  

}

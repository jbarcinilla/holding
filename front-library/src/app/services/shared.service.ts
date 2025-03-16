import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private idSource = new BehaviorSubject<number | null>(null);
  currentId$ = this.idSource.asObservable();

  // Método para cambiar el ID
  setId(id: number) {
    this.idSource.next(id);
  }
}

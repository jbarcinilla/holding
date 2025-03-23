// user.service.ts
import { Injectable } from '@angular/core';

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
export class UserService {
  constructor() {}

  /**
   * Valida que el campo idNumber del usuario sea siempre 1.
   * @param user Objeto de tipo User a validar.
   * @returns true si el idNumber es 1 (o '1'), false en caso contrario.
   */
  validateIdNumber(user: User): boolean {
    if (user.idNumber===1) {
      return true;
    }
    // Permite comparar tanto el número 1 como el string "1"
    return false;
  }
}

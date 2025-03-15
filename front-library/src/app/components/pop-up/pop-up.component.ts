import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-pop-up',
  standalone: true, // Componente independiente
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class PopUpComponent {
  loanForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loanForm = this.fb.group(
      {
        nombres: ['', Validators.required],
        apellidos: ['', Validators.required],
        cedula: ['', Validators.required],
        fechaPrestamo: ['', Validators.required],
        fechaDevolucion: ['', Validators.required]
      },
      { validators: this.dateValidator }
    );
  }

  dateValidator(formGroup: FormGroup) {
    const fechaPrestamo = new Date(formGroup.get('fechaPrestamo')?.value);
    const fechaDevolucion = new Date(formGroup.get('fechaDevolucion')?.value);

    if (fechaPrestamo && fechaDevolucion) {
      const diffInTime = fechaDevolucion.getTime() - fechaPrestamo.getTime();
      const diffInDays = diffInTime / (1000 * 60 * 60 * 24);

      if (diffInDays < 0 || diffInDays > 3) {
        return { dateError: true };
      }
    }
    return null;
  }

  onSubmit() {
    if (this.loanForm.valid) {
      console.log('Datos del formulario:', this.loanForm.value);
      alert('Formulario enviado con éxito');
    }
  }
}


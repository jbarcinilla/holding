import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Component,  OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-pop-up',
  standalone: true, // Componente independiente
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class PopUpComponent implements OnInit {
  loanForm: FormGroup;
  id: number | null = null;
  constructor(private fb: FormBuilder, private sharedService: SharedService) {
    this.loanForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      idNumber: ['',],
      loanDate: ['', Validators.required],
      returnDate: ['', Validators.required]
    });


  }



  ngOnInit() {
    this.sharedService.currentId$.subscribe((id) => {
      this.id = id; // Recibe el ID desde el servicio
      if (id !== null) {
        // Establece el valor del campo idNumber
        this.loanForm.patchValue({
          idNumber: id
        });
      }
      console.log('ID recibido y seteado en el formulario:', id);
    });
  }
  


  onSubmitForm() {
    if (this.loanForm.valid) {
      console.log('Form submitted:', this.loanForm.value);
      Swal.fire({
        icon: 'success',
        title: 'Submission Successful',
        text: 'The form has been submitted successfully!'
      });
    } else {
      console.log('Invalid form', this.loanForm.errors);
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill out all required fields correctly before submitting.'
      });
    }
  }
}

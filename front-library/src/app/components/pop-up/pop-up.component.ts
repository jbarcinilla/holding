import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Component,  OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { BookService } from '../../services/book.service';
import Swal from 'sweetalert2';
import { HttpResponse } from '@angular/common/http'
import { UserService } from '../../services/user-service.service';

@Component({
  selector: 'app-pop-up',
  standalone: true, // Componente independiente
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class PopUpComponent implements OnInit {
  loanForm: FormGroup;
  id: boolean | null = null;
  constructor(private fb: FormBuilder, private sharedService: SharedService, private bookService: BookService, private userService: UserService) {
    this.loanForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      idNumber: ['',  ],
      loanDate: ['', Validators.required],
      returnDate: ['', Validators.required]
    });

this.ngOnInit();
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

    });
  }
 
  onSubmitForm(): void {
    if (this.loanForm.valid && this.userService.validateIdNumber(this.loanForm.value)) {
      this.bookService.saveShedule(this.loanForm.value).subscribe(
        (response: HttpResponse<void>) => {
          console.log('Response:', response);
          if (response.status === 200) {
            Swal.fire({
              icon: 'success',
              title: 'Submission Successful',
              text: 'The form has been submitted successfully!',
              timer: 2000,            // Tiempo en milisegundos
              showConfirmButton: false // Oculta el botón de confirmación
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Submission Error',
              text: `Unexpected response code: ${response.status}`
            });
          }
        },
        (error) => {
          console.error('Error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Submission Error',
            text: 'There was an error submitting the form.'
          });
        }
      );
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

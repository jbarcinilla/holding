import { Component } from '@angular/core';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http'
import { PopUpComponent } from '../pop-up/pop-up.component';
import { SharedService } from '../../services/shared.service';
interface Book {
  id: number;
  title: string;
  authors: string;
  gender: string;
  availability: boolean;
}


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, HttpClientModule,
    PopUpComponent, // Asegúrate de importar el componente aquí
    // Otros módulos o componentes necesarios
  ],
})
export class BookListComponent {
  selectedId: number | undefined; // Este valor se pasa al popup
  books: Book[] = [];
  bookForm: FormGroup;
  editando: boolean = false;
  bookEditando: Book | null = null;

  constructor(private bookService: BookService, private fb: FormBuilder, private sharedService: SharedService) {
    this.bookForm = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      authors: ['', Validators.required],
      gender: ['', Validators.required],
      availability:  [Validators.required, Validators.pattern('^[01]$')],

    });

    this.bookService.list().subscribe(data => {
      this.books = data;
    });
  }

  async saveBook(): Promise<void> {
    if (this.bookForm.valid) {
      const newProduct: Book = this.bookForm.value;
      const productId = await this.getBookIdExecute(newProduct.id);
      if(productId==204){//204 no content
         this.saveBookServiceExecute(newProduct);
      }if(productId==200){//200 content
        this.updateBookTable(newProduct);
        this.updateBookServiceExecute(newProduct);
      }

    } else {
      this.bookForm.markAllAsTouched();
    }
  }

  getBookIdExecute(id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.bookService.getProductId(id).subscribe(
        (response: HttpResponse<void>) => {
          console.log('code response getProductIdExecute:', response.status);
          resolve(response.status);
        },
        error => {
          console.error('error search getProductIdExecute:', error);
          resolve(500);
        }
      );
    });
  }
 

  editBook(product: Book): void {
    this.bookForm.setValue(product);
    this.editando = true;
    this.bookEditando = product;
  }

  deleteBook(id: number): void {
    this.books = this.books.filter(p => p.id !== id);
    this.bookService.delete(id).subscribe(
      (response: HttpResponse<void>) => {
        console.log('code response deleteBook:', response.status);
        this.bookForm.reset();
      },
      error => {
        console.error('error delete book:', error);
      }
    );

  }

  async saveBookServiceExecute(newBook: Book): Promise<void> {
    try {
      const response = await this.bookService.save(newBook).toPromise();
      console.log('code response saveBookServiceExecute:', response?.status);
      this.books.push(newBook);
      this.bookForm.reset();
    } catch (error) {
      console.error('Error creating product:', error);
    }
  }
  
  async updateBookServiceExecute(newBook: Book): Promise<void> {
    try {
      const response = await this.bookService.update(newBook).toPromise();
      console.log('code response updateBookServiceExecute', response?.status);
      this.bookForm.reset();
    } catch (error) {
      console.error('error save book:', error);
    }
  }



updateBookTable(updatedBook: Book): void {
  const productIndex = this.books.findIndex(p => p.id === updatedBook.id);
  if (productIndex !== -1) {
    this.books[productIndex] = updatedBook;
    console.log('Book update:', this.books[productIndex]);
  } else {
    console.error('Book  not found.');
  }
}

openPopup(id: boolean) {
    this.sharedService.setId(id); // Establece el valor del ID
  }
}
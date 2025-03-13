package com.holding.library.controlles;


import com.holding.library.entity.BookEntity;
import com.holding.library.services.BookServices;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/holding")
@CrossOrigin(origins = "http://localhost:4200") // Permitir Angular
@Tag(name = "Ejemplo API", description = "Operaciones de prueba")
public class BookController {

    @Autowired
    private BookServices bookService;

    @PostMapping()
    @Tag(name = "Save a new book", description = "Provide a book to be saved")
    public ResponseEntity<Void> saveBook(@RequestBody BookEntity newBook) {
        bookService.saveBook(newBook);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/updateBook")
    @Tag(name = "Update an existing book", description = "Provide a book to be updated")
    public ResponseEntity<Void> updateBook(@RequestBody BookEntity book) {
        BookEntity update = bookService.saveBook(book);
        if (update != null) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @DeleteMapping("/{id}")
    @Tag(name = "Delete a book by ID", description = "Provide an ID to delete a specific book")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Tag(name = "Get a book by ID", description = "Provide an ID to retrieve a specific book")
    public ResponseEntity<Void> getBookId(@PathVariable Long id) {
        Optional<BookEntity> op = bookService.getBookById(id);
        if (op.isPresent()) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/list")
    @Tag(name = "Get a list of all books")
    public List<BookEntity> list() {
        return bookService.getAllBook();
    }
}

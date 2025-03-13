package com.holding.library.controlles;


import com.holding.library.entity.BookEntity;
import com.holding.library.services.BookServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/holding")
@CrossOrigin(origins = "http://localhost:4200") // Permitir Angular
public class BookController {

    @Autowired
    private BookServices bookService;

    /**
     * Guarda un nuevo libro en la base de datos.
     *
     * @param newBook Información del nuevo libro a guardar.
     * @return ResponseEntity con estado HTTP 201 (CREATED) si el libro se guarda exitosamente.
     */
    @PostMapping()
    public ResponseEntity<Void> saveBook(@RequestBody BookEntity newBook) {
        bookService.saveBook(newBook);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /**
     * Actualiza la información de un libro existente.
     *
     * @param book Información del libro a actualizar.
     * @return ResponseEntity con estado HTTP 200 (OK) si el libro se actualiza exitosamente, o 204 (NO CONTENT) si no se encuentra el libro.
     */
    @PutMapping("/updateBook")
    public ResponseEntity<Void> updateBook(@RequestBody BookEntity book) {
        BookEntity update = bookService.saveBook(book);
        if (update != null) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    /**
     * Elimina un libro por su ID.
     *
     * @param id ID del libro a eliminar.
     * @return ResponseEntity con estado HTTP 200 (OK) si el libro se elimina exitosamente.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Obtiene la información de un libro por su ID.
     *
     * @param id ID del libro a obtener.
     * @return ResponseEntity con estado HTTP 200 (OK) si se encuentra el libro, o 204 (NO CONTENT) si no se encuentra el libro.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Void> getBookId(@PathVariable Long id) {
        Optional<BookEntity> op = bookService.getBookById(id);
        if (op.isPresent()) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * Obtiene una lista de todos los libros en la base de datos.
     *
     * @return Lista de todos los libros.
     */
    @GetMapping("/list")
    public List<BookEntity> list() {
        return bookService.getAllBook();
    }



}

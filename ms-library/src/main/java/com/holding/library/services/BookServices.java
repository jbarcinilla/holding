package com.holding.library.services;


import com.holding.library.entity.BookEntity;
import com.holding.library.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.print.Book;
import java.util.List;
import java.util.Optional;

@Service
public class BookServices {

    private final BookRepository bookRepository;

    @Autowired
    public BookServices(BookRepository bookServices) {
        this.bookRepository = bookServices;
    }


    public BookEntity saveBook(BookEntity bookEntity) {
        return bookRepository.save(bookEntity);
    }

    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }

    public List<BookEntity> getAllBook() {
        return bookRepository.findAll();
    }


    public Optional<BookEntity> getBookById(Long id) {
        return bookRepository.findById(id);
    }

    public boolean scheduleBook(Long id) {
        Optional<BookEntity> book = bookRepository.findById(id);
        if (book.isPresent()) {
            // Lógica para agendar el libro
            book.get().setAvailability(0);
            bookRepository.save(book.get());
            return true;
        }
        return false;
    }
}

package com.holding.library.services;


import com.holding.library.entity.BookEntity;
import com.holding.library.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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
}

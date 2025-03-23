package com.holding.library.services;

import com.holding.library.entity.BookEntity;
import com.holding.library.entity.UserEntity;
import com.holding.library.repository.BookRepository;
import com.holding.library.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserServices {

    private final BookRepository bookRepository;

    private final UserRepository userRepository;

    @Autowired
    public UserServices(BookRepository bookServices, UserRepository userRepository) {
        this.bookRepository = bookServices;
        this.userRepository=userRepository;
    }

    public UserEntity saveUser(UserEntity userEntity) {

        return userRepository.save(userEntity);
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

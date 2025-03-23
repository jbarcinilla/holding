package com.holding.library.controlles;

import com.holding.library.entity.UserEntity;
import com.holding.library.services.UserServices;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/holding")
@CrossOrigin(origins = "http://localhost:4200") // Permitir Angular
@Tag(name = "Ejemplo API", description = "Operaciones de prueba")
public class UserController {

//    @Autowired
//    private UserServices userService;
//
//    @PostMapping("/schedule")
//    @Tag(name = "Permit agent a book")
//    public ResponseEntity<String> scheduleBook(@RequestBody UserEntity user) {
//
//        boolean scheduled = userService.scheduleBook((long)user.getIdNumber());
//        if (scheduled) {
//            userService.saveUser(user);
//            return ResponseEntity.ok("Book agent witch success");
//        } else {
//            return ResponseEntity.badRequest().body("No agent book present error.");
//        }
//    }
}

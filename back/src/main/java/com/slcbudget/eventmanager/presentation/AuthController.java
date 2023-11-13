package com.slcbudget.eventmanager.presentation;

import com.slcbudget.eventmanager.Security.jwt.JwtUtils;
import com.slcbudget.eventmanager.domain.dto.ValidTokenDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping("/validateToken")
    public ResponseEntity<String> validateToken(@RequestParam("token") String token) {
        if (jwtUtils.isTokenValid(token)) {
            return ResponseEntity.ok("Token válido");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token inválido");
        }
    }

}

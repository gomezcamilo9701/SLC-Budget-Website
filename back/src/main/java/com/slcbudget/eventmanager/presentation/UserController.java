package com.slcbudget.eventmanager.presentation;

import com.slcbudget.eventmanager.domain.ERole;
import com.slcbudget.eventmanager.domain.Event;
import com.slcbudget.eventmanager.domain.RoleEntity;
import com.slcbudget.eventmanager.domain.UserEntity;
import com.slcbudget.eventmanager.domain.dto.AddContactDTO;
import com.slcbudget.eventmanager.domain.dto.CreateUserDTO;
import com.slcbudget.eventmanager.domain.dto.EditUserDTO;
import com.slcbudget.eventmanager.domain.dto.UserResponseDTO;
import com.slcbudget.eventmanager.domain.projections.EventProjection;
import com.slcbudget.eventmanager.persistence.EventRepository;
import com.slcbudget.eventmanager.persistence.UserRepository;
import com.slcbudget.eventmanager.service.StorageService;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private StorageService storageService;

    @Autowired
    private EventRepository eventRepository;

    @GetMapping("/all")
    public List<UserEntity> getAllUsers() {
        return (List<UserEntity>) userRepository.findAll();
    }

    @GetMapping("/{id}")
    public UserEntity getUserById(@PathVariable Long id) {
        return userRepository.findById(id).get();
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<UserResponseDTO> getUserByEmail(@PathVariable String email) {
        Optional<UserEntity> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            UserEntity userEntity = user.get();
            UserResponseDTO userResponse = new UserResponseDTO(userEntity.getId(), userEntity.getName(),
                    userEntity.getLastName(), userEntity.getEmail(), userEntity.getUsername(),
                    userEntity.getProfileImage());
            return ResponseEntity.ok(userResponse);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<String> updateUser(@PathVariable Long id,
            @RequestPart EditUserDTO updatedUser,
            @RequestPart(required = false) MultipartFile profileImage) {
        // Recuperar el usuario existente de la base de datos
        Optional<UserEntity> optionalUser = userRepository.findById(id);

        if (optionalUser.isPresent()) {
            UserEntity existingUser = optionalUser.get();

            if (profileImage != null && !profileImage.isEmpty()) {
                try {
                    String imageName = storageService.store(profileImage);

                    existingUser.setProfileImage(imageName);
                } catch (IOException e) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al almacenar la imagen");
                }
            }

            // Actualizar los campos del usuario con los nuevos valores
            existingUser.setName(updatedUser.getName());
            existingUser.setLastName(updatedUser.getLastName());
            existingUser.setUsername(updatedUser.getUsername());
            existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));

            // Guardar el usuario actualizado en la base de datos
            userRepository.save(existingUser);

            return ResponseEntity.ok("Usuario actualizado correctamente");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> createUser(@Valid @RequestPart(required = false) MultipartFile profileImage,
            @RequestPart("createUserDTO") CreateUserDTO createUserDTO) {

        if (userRepository.existsByEmail(createUserDTO.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El correo electrónico ya está en uso.");
        }
        String imageUrl = null;
        try {
            if (profileImage != null && !profileImage.isEmpty()) {
                imageUrl = storageService.store(profileImage);
            }
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al guardar la imagen de perfil");
        }

        Set<RoleEntity> roles = createUserDTO.getRoles().stream()
                .map(role -> RoleEntity.builder()
                        .name(ERole.valueOf(role))
                        .build())
                .collect(Collectors.toSet());

        UserEntity userEntity = UserEntity.builder()
                .username(createUserDTO.getUsername())
                .password(passwordEncoder.encode(createUserDTO.getPassword()))
                .email(createUserDTO.getEmail())
                .name(createUserDTO.getName())
                .lastName(createUserDTO.getLastName())
                .profileImage(imageUrl)
                .roles(roles)
                .build();

        try {
            userRepository.save(userEntity);
            UserResponseDTO userResponseDTO = new UserResponseDTO(userEntity);
            return ResponseEntity.ok(userResponseDTO);
        } catch (Exception e) {
          return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable("id") String id) {
        userRepository.deleteById(Long.parseLong(id));
        return "Se ha borrado el user con id".concat(id);
    }

    @GetMapping("/contacts/{userId}")
    public ResponseEntity<Page<UserResponseDTO>> getContactsByUserId(@PathVariable Long userId,
            @PageableDefault(size = 3) Pageable pagination) {

        Optional<UserEntity> optionalUser = userRepository.findById(userId);

        if (optionalUser.isPresent()) {

            UserEntity user = optionalUser.get();
            Set<UserEntity> contactsSet = user.getContacts();

            List<UserResponseDTO> contactsList = contactsSet.stream()
                .map(contact -> new UserResponseDTO(contact)).collect(Collectors.toList());;

            Page<UserResponseDTO> contactsPage = new PageImpl<>(contactsList, pagination, contactsList.size());

            return ResponseEntity.ok(contactsPage);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("add-contact/{userId}")
    @Transactional
    public ResponseEntity<String> addContact(@PathVariable Long userId, @RequestBody AddContactDTO contactId) {

        Optional<UserEntity> userOptional = userRepository.findById(userId);
        Optional<UserEntity> contactOptional = userRepository.findById(contactId.contactId());

        if (userOptional.isPresent() && contactOptional.isPresent()) {
            UserEntity user = userOptional.get();
            UserEntity contact = contactOptional.get();

            if (user.getId().equals(contact.getId())) {
                return ResponseEntity.badRequest().body("No puedes agregarte a ti mismo");
            }

            if (user.getContacts().contains(contact)) {
                return ResponseEntity.badRequest().body("Este contacto ya está en tu lista de contactos");
            }
            user.getContacts().add(contact);
            userRepository.save(user);

            return ResponseEntity.ok("Contacto agregado con éxito");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/events/{userId}")
    public ResponseEntity<Page<EventProjection>> getUserEvents(@PathVariable Long userId,
            @PageableDefault(size = 3) Pageable pagination) {

        Page<EventProjection> userEvents = eventRepository.findEventsByOwnerId(userId, pagination);

        if (userEvents.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(userEvents);
    }
}

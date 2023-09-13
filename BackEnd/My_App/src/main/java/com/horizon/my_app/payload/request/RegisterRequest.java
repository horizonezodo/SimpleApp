package com.horizon.my_app.payload.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class RegisterRequest {

    @NotBlank
    @Size(min = 3, max = 100)
    private String username;

    @NotBlank
    @Size(min = 3, max = 100)
    @Email
    private String email;

    @NotBlank
    @Size(min = 3, max = 100)
    private String phone;

    @NotBlank
    @Size(min = 6, max = 100)
    private String password;

    private Set<String> roles;
}

package main.dto;

import jakarta.validation.constraints.*;

//User data
public record AddProfileDto(
        @NotBlank(message = "Phone number is required")
        @Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Invalid phone number format")
        String phoneNumber,

        @Min(value = 1, message = "Age must be greater than 0")
        @Max(value = 90, message = "Age must be less than 90")
        int age,

        @Min(value = 1, message = "Weight must be greater than 0")
        @Max(value = 500, message = "Weight must be less than 500")
        double weight,

        @Min(value = 1, message = "Height must be greater than 0")
        @Max(value = 300, message = "Height must be less than 300")
        double height,

        @Pattern(regexp = "^[0-9\\-]+$", message = "Size can only contain numbers and dashes")
        String size,

        @Size(max = 500, message = "User note cannot exceed 500 characters")
        String userNote
) {}

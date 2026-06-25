package AuthService.service;

import lombok.Getter;

@Getter
public enum CustomRole {
    CUSTOMER("CUSTOMER"),
    ADMIN("ADMIN");

    private final String value;

    CustomRole(String value) {
        this.value = value;
    }
}

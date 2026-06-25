export interface AuthRequest{
    username:   string;
    password:   string;
    rememberMe: boolean;
}

export interface SaveUserDto{
    username:   string;
    password:   string;
    email:      string;
}

export interface AuthResponse{
    status:     string;
    username:   string;
}
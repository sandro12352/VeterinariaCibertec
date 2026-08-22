export interface LoginResponse {
    token:     string;
    tipo:      string;
    expiresIn: number;
    nombre:    string;
    roles:     string[];
}

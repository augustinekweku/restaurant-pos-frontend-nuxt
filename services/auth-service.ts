import AuthRepository, { LoginPayload } from "respositories/auth-repository";

export default class AuthService {
  constructor(private authRepository: AuthRepository) {}

  async getTodo() {
    const res = await this.authRepository.getTodo();
    return res;
  }

  async login(payload: LoginPayload) {
    const res = await this.authRepository.login(payload);
    return res;
  }
}

import { EncryptService, ErrorHandlerService, ErrorStatus, JwtService } from "../../infra";
import { AccountsRepository } from "./accounts.repository";
import { CreateAccountDto } from "./dto/accounts.dto";
import { LoginAccountProps } from "./interface/accounts.interface";

export class AccountsService {
  constructor(
    private readonly accountsRepository = new AccountsRepository(),
    private readonly errorHandlerService = new ErrorHandlerService(),
    private readonly encryptService = new EncryptService(),
    private readonly jwtService = new JwtService(),
  ) {}

  async createAccount(props: CreateAccountDto) {
    const { name, email, password } = props;

    if (!name?.trim() || !email?.trim() || !email?.includes("@")) {
      this.errorHandlerService.dispatch({
        message: "Nome ou email inválidos",
        status: ErrorStatus.BAD_REQUEST,
      });
    }

    if (!password) {
      this.errorHandlerService.dispatch({
        message: "Senha inválida",
        status: ErrorStatus.BAD_REQUEST,
      });
    }

    const existingAccount = await this.accountsRepository.findAccountByEmail(email);

    if (existingAccount) {
      this.errorHandlerService.dispatch({
        message: "Email já cadastrado",
        status: ErrorStatus.BAD_REQUEST,
      });
    }

    if (!password.trim() || password.trim().length < 8) {
      this.errorHandlerService.dispatch({
        message: "A senha deve conter no mínimo 8 caracteres",
        status: ErrorStatus.BAD_REQUEST,
      });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (!passwordRegex.test(password)) {
      this.errorHandlerService.dispatch({
        message:
          "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial",
        status: ErrorStatus.BAD_REQUEST,
      });
    }

    const passwordHash = this.encryptService.generateHash(password);

    const account = await this.accountsRepository.createAccount({
      name,
      email,
      password: passwordHash,
    });

    if (!account) {
      this.errorHandlerService.dispatch({
        message: "Erro ao criar a conta",
        status: ErrorStatus.INTERNAL_SERVER_ERROR,
      });
    }

    return {
      message: "Conta criada com sucesso",
    };
  }

  async login({ email, password }: LoginAccountProps) {
    if (!email?.trim() || !email?.includes("@")) {
      this.errorHandlerService.dispatch({
        message: "Email inválido",
        status: ErrorStatus.BAD_REQUEST,
      });
    }

    if (!password) {
      this.errorHandlerService.dispatch({
        message: "Senha inválida",
        status: ErrorStatus.BAD_REQUEST,
      });
    }

    const account = await this.accountsRepository.findAccountByEmail(email);

    if (!account) {
      return this.errorHandlerService.dispatch({
        message: "Conta não encontrada",
        status: ErrorStatus.BAD_REQUEST,
      });
    }

    const decryptedPassword = this.encryptService.decryptHash(account.password);

    if (decryptedPassword !== password) {
      this.errorHandlerService.dispatch({
        message: "Senha inválida",
        status: ErrorStatus.BAD_REQUEST,
      });
    }

    const token = this.jwtService.createToken(account.id);

    return token;
  }
}

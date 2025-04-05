import { ErrorHandlerService, ErrorStatus, prisma } from "../../infra";
import { CreateAccountProps } from "./interface/accounts.interface";

export class AccountsRepository {
  constructor(private readonly errorHandlerService = new ErrorHandlerService()) {}

  async createAccount(data: CreateAccountProps) {
    try {
      const account = await prisma.account.create({
        data,
      });

      return account;
    } catch (error) {
      console.log(error);
      this.errorHandlerService.dispatch({
        message: "Erro ao criar conta",
        status: ErrorStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async findAccountByEmail(email: string) {
    try {
      const account = await prisma.account.findUnique({
        where: {
          email,
        },
      });

      return account;
    } catch (error) {
      console.log(error);
      this.errorHandlerService.dispatch({
        message: "Erro ao buscar conta",
        status: ErrorStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async findAccountById(id: string) {
    try {
      const account = await prisma.account.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          email: true,
          name: true,
        },
      });

      return account;
    } catch (error) {
      console.log(error);
      this.errorHandlerService.dispatch({
        message: "Erro ao buscar conta",
        status: ErrorStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}

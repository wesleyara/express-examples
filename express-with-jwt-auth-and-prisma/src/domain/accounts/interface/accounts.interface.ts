import { Prisma } from "@prisma/client";

export type AccountTypes = Prisma.AccountWhereUniqueInput;
export interface AuthenticatedRequest extends Request {
  user: AccountTypes;
}

export type CreateAccountProps = Prisma.AccountCreateInput;

export interface LoginAccountProps {
  email: string;
  password: string;
}

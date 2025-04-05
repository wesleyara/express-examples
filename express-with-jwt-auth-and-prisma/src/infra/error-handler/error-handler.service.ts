import { ErrorHandlerProps } from "./interface/error-handler.interface";

export class ErrorHandlerService {
  dispatch({ message, status }: ErrorHandlerProps) {
    throw { message, status };
  }
}

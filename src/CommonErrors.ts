export class NotAuthorizedError extends Error {
  constructor(message: string = 'Not authorized') {
    super(message); // Passa a mensagem para o construtor da classe base
    this.name = 'NotAuthorized'; // Define o nome do erro
    Object.setPrototypeOf(this, NotAuthorizedError.prototype); // Corrige o protótipo
  }
}

export class InternalServerError extends Error {
  constructor(message: string = 'Internal server error') {
    super(message); // Passa a mensagem para o construtor da classe base
    this.name = 'InternalServerError'; // Define o nome do erro
    Object.setPrototypeOf(this, InternalServerError.prototype); // Corrige o protótipo
  }
}

export class NotAllowedError extends Error {
  constructor(message: string = 'Not allowed') {
    super(message); // Passa a mensagem para o construtor da classe base
    this.name = 'NotAllowed'; // Define o nome do erro
    Object.setPrototypeOf(this, NotAllowedError.prototype); // Corrige o protótipo
  }
}

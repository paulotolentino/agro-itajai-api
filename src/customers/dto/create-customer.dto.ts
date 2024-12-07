export class CreateCustomerDto {
  name: string;
  createdById: number;
  nickname?: string;
  phone?: string;
  observation?: string;
  cpf?: string;
}

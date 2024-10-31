export function formatCpf(cpf: string): string {
  let cpfFormatado = cpf;

  if (cpf.length > 3) {
    cpfFormatado = `${cpf.substring(0, 3)}.${cpf.substring(3)}`;
  }
  if (cpf.length > 6) {
    cpfFormatado = `${cpf.substring(0, 3)}.${cpf.substring(
      3,
      6
    )}.${cpf.substring(6)}`;
  }
  if (cpf.length > 9) {
    cpfFormatado = `${cpf.substring(0, 3)}.${cpf.substring(
      3,
      6
    )}.${cpf.substring(6, 9)}-${cpf.substring(9)}`;
  }

  return cpfFormatado;
}

export function formatPhone(phone: string): string {
  let phoneFormatado = phone;

  if (phone.length > 2) {
    phoneFormatado = `(${phone.substring(0, 2)})${phone.substring(2)}`;
  }
  if (phone.length > 7) {
    phoneFormatado = `(${phone.substring(0, 2)})${phone.substring(
      2,
      7
    )}-${phone.substring(7)}`;
  }

  return phoneFormatado;
}

export function formatCep(cep: string): string {
  let cepFormatado = cep;

  if (cep.length > 5) {
    cepFormatado = `${cep.substring(0, 5)}-${cep.substring(5)}`;
  }

  return cepFormatado;
}

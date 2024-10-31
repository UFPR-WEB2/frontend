import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { formatCep, formatCpf, formatPhone } from './format';

export function cpfValidatorAndFormatter(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let cpf = control.value ? control.value.replace(/[^0-9]/g, '') : '';

    if (cpf.length > 11) {
      cpf = cpf.substring(0, 11);
    }

    if (cpf.length > 0) {
      const cpfFormatado = formatCpf(cpf);

      if (control.value !== cpfFormatado) {
        control.setValue(cpfFormatado, { emitEvent: false });
      }

      if (!isValidCpf(cpf)) {
        return { invalidCpf: true };
      }

      return null;
    }

    return { invalidCpfFormat: true };
  };
}

export function phoneValidatorAndFormatter(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let phone = control.value ? control.value.replace(/[^0-9]/g, '') : '';

    if (phone.length > 11) {
      phone = phone.substring(0, 11);
    }

    if (phone.length > 0) {
      const phoneFormatado = formatPhone(phone);

      if (control.value !== phoneFormatado) {
        control.setValue(phoneFormatado, { emitEvent: false });
      }

      if (phone.length !== 11) {
        return { invalidPhone: true };
      }

      return null;
    }

    return { invalidPhone: true };
  };
}

export function cepValidatorAndFormatter(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let cep = control.value ? control.value.replace(/[^0-9]/g, '') : '';

    if (cep.length > 8) {
      cep = cep.substring(0, 8);
    }

    if (cep.length > 0) {
      const cepFormatado = formatCep(cep);

      if (control.value !== cepFormatado) {
        control.setValue(cepFormatado, { emitEvent: false });
      }

      if (cep.length !== 8) {
        return { invalidFormatCep: true };
      }

      return null;
    }

    return { invalidCepFormat: true };
  };
}

function isValidCpf(cpf: string): boolean {
  if (cpf.length !== 11) {
    return false;
  }

  if (/^(\d)\1+$/.test(cpf)) {
    return false;
  }

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cpf.substring(9, 10))) {
    return false;
  }

  sum = 0;

  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cpf.substring(10, 11))) {
    return false;
  }

  return true;
}

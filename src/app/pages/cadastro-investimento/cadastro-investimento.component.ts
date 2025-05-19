import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import {
  MatDatepicker,
  MatDatepickerModule,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../core/services/auth.service';
import { InvestimentoService } from '../../core/services/investimento.service';

@Component({
  selector: 'app-cadastro-investimento',
  imports: [
    CommonModule,
    MatButton,
    MatCard,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatOption,
    MatDatepicker,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDatepickerToggle,
    MatInput,
    MatSelect,
  ],
  templateUrl: './cadastro-investimento.component.html',
  styleUrl: './cadastro-investimento.component.scss',
})
export class CadastroInvestimentoComponent {
  form: FormGroup;
  hoje = new Date();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private investimentoService: InvestimentoService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      tipo: ['', Validators.required],
      valor: [null, [Validators.required, Validators.min(0)]],
      data: [null, [Validators.required, this.dataInvalidaValidator]],
    });
  }

  dataInvalidaValidator = (control: { value: string | number | Date }) => {
    const dataSelecionada = new Date(control.value);
    return dataSelecionada > this.hoje ? { dataInvalida: true } : null;
  };

  onSubmit() {
    if (this.form.valid) {
      const usuarioId = this.authService.getUserId();
      const dateFormatted = new Date(this.form.value.data);
      const dia = dateFormatted.getDate();
      const mes = dateFormatted.getMonth() + 1;
      const ano = dateFormatted.getFullYear();
      const dataFormatada = `${ano}-${mes < 10 ? '0' : ''}${mes}-${
        dia < 10 ? '0' : ''
      }${dia}T00:00`;

      const investimento = {
        ...this.form.value,
        data: dataFormatada,
        usuarioId: usuarioId,
      };
      this.investimentoService.createInvestimento(investimento).subscribe({
        next: () => {
          this.snackBar.open('Investimento cadastrado com sucesso!', 'Fechar', {
            duration: 4000,
          });
          this.form.reset();
        },
        error: (error) => {
          const errorMessage = error.error.error;
          this.snackBar.open(errorMessage, 'Fechar', {
            duration: 4000,
          });
        },
      });
    }
  }
}

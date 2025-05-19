import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { ICreateInvestimentoResponse } from '../../core/services/investimento.service';

@Component({
  selector: 'app-editar-investimento-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatOption,
    MatDatepickerModule,
    MatCardModule,
    MatButton,
    MatInput,
    MatSelect,
    MatNativeDateModule,
  ],
  templateUrl: './editar-investimento-dialog.component.html',
  styleUrl: './editar-investimento-dialog.component.scss',
})
export class EditarInvestimentoDialogComponent {
  form: FormGroup;
  tipos = [
    {
      label: 'Ação',
      value: 'ACAO',
    },
    {
      label: 'Fundo',
      value: 'FUNDO',
    },
    {
      label: 'Título',
      value: 'TITULO',
    },
  ];
  hoje = new Date();

  constructor(
    public dialogRef: MatDialogRef<EditarInvestimentoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICreateInvestimentoResponse,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nome: [data.nome, Validators.required],
      valor: [data.valor, [Validators.required, Validators.min(0)]],
      tipo: [data.tipo, Validators.required],
      data: [data.data, [Validators.required, this.dataInvalidaValidator]],
    });
  }

  dataInvalidaValidator = (control: { value: string | number | Date }) => {
    const dataSelecionada = new Date(control.value);
    return dataSelecionada > this.hoje ? { dataInvalida: true } : null;
  };

  salvar() {
    this.dialogRef.close({ ...this.data, ...this.form.value });
  }
}

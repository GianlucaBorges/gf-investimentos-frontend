import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ICreateInvestimentoResponse } from '../../core/services/investimento.service';

@Component({
  selector: 'app-excluir-investimento-dialog',
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatCardModule,
  ],
  templateUrl: './excluir-investimento-dialog.component.html',
  styleUrl: './excluir-investimento-dialog.component.scss',
})
export class ExcluirInvestimentoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ExcluirInvestimentoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICreateInvestimentoResponse
  ) {}
}

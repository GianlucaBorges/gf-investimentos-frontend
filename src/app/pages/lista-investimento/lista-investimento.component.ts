import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AuthService } from '../../core/services/auth.service';
import {
  ICreateInvestimentoResponse,
  InvestimentoService,
} from '../../core/services/investimento.service';
import { BarChartComponent } from '../../shared/bar-chart/bar-chart.component';
import { EditarInvestimentoDialogComponent } from '../../shared/editar-investimento-dialog/editar-investimento-dialog.component';
import { ExcluirInvestimentoDialogComponent } from '../../shared/excluir-investimento-dialog/excluir-investimento-dialog.component';

@Component({
  selector: 'app-lista-investimento',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatOption,
    MatDatepickerModule,
    MatIcon,
    MatTableModule,
    MatPaginator,
    MatButton,
    MatNativeDateModule,
    MatInput,
    MatSelect,
    MatButtonModule,
    MatSortModule,
  ],
  templateUrl: './lista-investimento.component.html',
  styleUrl: './lista-investimento.component.scss',
})
export class ListaInvestimentoComponent implements OnInit {
  filtroForm: FormGroup;
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
  displayedColumns = ['nome', 'valor', 'tipo', 'data', 'acoes'];
  dataSource = new MatTableDataSource<ICreateInvestimentoResponse>([]);
  hoje = new Date();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private investimentoService: InvestimentoService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.filtroForm = this.fb.group({
      tipo: [''],
      dataMin: [''],
      dataMax: [''],
    });
  }

  ngOnInit(): void {
    this.buscar();
  }

  buscar(
    data: {
      page: number;
      size: number;
      sort?: string;
      tipo?: string;
      usuarioId: number;
      startDate?: string;
      endDate?: string;
    } = {
      page: 0,
      size: 10,
      tipo: '',
      usuarioId: this.authService.getUserId()!,
    }
  ): void {
    const tipo = this.filtroForm.get('tipo')?.value;
    const dataMin = this.filtroForm.get('dataMin')?.value;
    const dataMax = this.filtroForm.get('dataMax')?.value;
    if (tipo) {
      data.tipo = tipo;
    }
    if (dataMin) {
      const dateFormatted = this.formatarData(dataMin);
      data.startDate = dateFormatted;
    }
    if (dataMax) {
      const dateFormatted = this.formatarData(dataMax);
      data.endDate = dateFormatted;
    }

    this.investimentoService.getInvestimentos(data).subscribe({
      next: (response) => {
        const elems = response.content.map((item) => {
          return {
            ...item,
            tipo: this.tipos.find((tipo) => tipo.value === item.tipo)!.label,
          };
        });
        this.dataSource = new MatTableDataSource(elems);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        const errorMessage =
          error.error.error || 'Erro ao buscar investimentos';
        this.snackBar.open(errorMessage, 'Fechar', {
          duration: 3000,
        });
      },
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editar(investimento: ICreateInvestimentoResponse): void {
    const investimentoBefore = { ...investimento };
    investimentoBefore.data = new Date(investimento.data);
    investimentoBefore.tipo = this.tipos.find(
      (tipo) => tipo.label === investimento.tipo
    )?.value!;
    const dialogRef = this.dialog.open(EditarInvestimentoDialogComponent, {
      width: '500px',
      height: '455px',
      data: investimentoBefore,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        result.data = this.formatarData(result.data);
        this.investimentoService.updateInvestimento(result).subscribe({
          next: () => {
            this.snackBar.open(
              'Investimento atualizado com sucesso',
              'Fechar',
              {
                duration: 3000,
              }
            );
            this.buscar();
          },
          error: (error) => {
            const errorMessage =
              error.error.error || 'Erro ao atualizar investimento';
            this.snackBar.open(errorMessage, 'Fechar', {
              duration: 3000,
            });
          },
        });
      }
    });
  }

  excluir(investimento: ICreateInvestimentoResponse): void {
    const dialogRef = this.dialog.open(ExcluirInvestimentoDialogComponent, {
      width: '500px',
      height: '250px',
      data: investimento,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.investimentoService
          .excluirInvestimento(investimento.id)
          .subscribe({
            next: () => {
              this.snackBar.open(
                'Investimento excluído com sucesso',
                'Fechar',
                {
                  duration: 3000,
                }
              );
              this.buscar();
            },
            error: (error) => {
              const errorMessage =
                error.error.error || 'Erro ao excluir investimento';
              this.snackBar.open(errorMessage, 'Fechar', {
                duration: 3000,
              });
            },
          });
      }
    });
  }

  abrirGrafico(): void {
    const categorias = this.tipos.map((tipo) => tipo.label);
    const quantidades = this.tipos.map(
      (tipo) =>
        this.dataSource.data.filter((item) => item.tipo === tipo.label).length
    );

    this.dialog.open(BarChartComponent, {
      width: '500px',
      height: '400px',
      data: { categorias, quantidades },
    });
  }

  formatarData(data: Date): string {
    const date = new Date(data);
    const dia = date.getDate();
    const mes = date.getMonth() + 1;
    const ano = date.getFullYear();
    return `${ano}-${mes < 10 ? '0' : ''}${mes}-${
      dia < 10 ? '0' : ''
    }${dia}T00:00`;
  }
}

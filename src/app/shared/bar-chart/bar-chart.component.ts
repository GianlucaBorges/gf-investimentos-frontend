import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [
    CommonModule,
    BaseChartDirective,
    MatButton,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatButton,
  ],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
})
export class BarChartComponent {
  chartConfig: ChartConfiguration<'bar'>;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { categorias: string[]; quantidades: number[] }
  ) {
    const total = data.quantidades.reduce((acc, val) => acc + val, 0);
    const porcentagens = data.quantidades.map(
      (q) => ((q / total) * 100).toFixed(1) + '%'
    );

    this.chartConfig = {
      type: 'bar',
      data: {
        labels: data.categorias,
        datasets: [
          {
            data: data.quantidades,
            label: 'Investimentos',
            backgroundColor: ['#3f51b5', '#4caf50', '#ff9800'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const index = context.dataIndex;
                return `Qtd: ${context.raw} (${porcentagens[index]})`;
              },
            },
          },
          legend: {
            display: false,
          },
        },
      },
    };
  }
}

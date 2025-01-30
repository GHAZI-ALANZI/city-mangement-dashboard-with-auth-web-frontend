import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements AfterViewInit {
  ngAfterViewInit() {
    this.createCityGrowthChart();
    this.createLaborMarketChart();
    this.createInvestmentChart();
    this.createBirthDeathChart();
  }

  createCityGrowthChart() {
    new Chart("cityGrowthChart", {
      type: "line",
      data: {
        labels: ["2019", "2020", "2021", "2022", "2023"],
        datasets: [{
          label: "City Growth Rate (%)",
          data: [2.1, 2.5, 3.2, 3.8, 4.1],
          borderColor: "cyan",
          backgroundColor: "rgba(0,255,255,0.3)",
          fill: true
        }]
      },
      options: this.chartOptions()
    });
  }

  createLaborMarketChart() {
    new Chart("laborMarketChart", {
      type: "bar",
      data: {
        labels: ["Employed", "Unemployed", "Self-Employed", "Students"],
        datasets: [{
          label: "Labor Market Distribution",
          data: [60, 15, 20, 5],
          backgroundColor: ["#ffcc00", "#ff4444", "#44ff44", "#8888ff"]
        }]
      },
      options: this.chartOptions()
    });
  }

  createInvestmentChart() {
    new Chart("investmentChart", {
      type: "pie",
      data: {
        labels: ["Real Estate", "Technology", "Health", "Retail"],
        datasets: [{
          data: [40, 30, 20, 10],
          backgroundColor: ["#ff5733", "#33ffbd", "#ff33a8", "#335bff"]
        }]
      },
      options: this.chartOptions()
    });
  }

  createBirthDeathChart() {
    new Chart("birthDeathChart", {
      type: "doughnut",
      data: {
        labels: ["Births", "Deaths"],
        datasets: [{
          data: [7000, 2500],
          backgroundColor: ["#00ff00", "#ff0000"]
        }]
      },
      options: this.chartOptions()
    });
  }

  chartOptions() {
    return {
      plugins: {
        legend: {
          labels: {
            color: "white"
          }
        }
      },
      scales: {
        x: { ticks: { color: "white" } },
        y: { ticks: { color: "white" } }
      }
    };
  }
}

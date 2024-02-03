<script>
import Chart from "chart.js/auto";
import Papa from- "papaparse";
export default {
  data() {
    return {
      data: [],
      myChartCanvas: "",
    };
  },
  mounted() {
    this.myChartCanvas = document.getElementById("myChartCanvas");
    this.loadCSVAndCreateChart();
  },
  methods: {
    getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    async loadCSVAndCreateChart() {
      this.myChartCanvas.getContext("2d");
      const response = await fetch(
        "https://raw.githubusercontent.com/JosephRidge/ClimateChange-GHG/main/data/Forest%20Cover/Annual%20tree%20cover%20loss%20by%20dominant%20driver%20in%20Kenya/treecover_loss__ha.csv"
      );
      const data = await response.text();
      const parsedData = Papa.parse(data, { header: true });
      // this.data = data
      // const data = Papa.parse(text, { header: true });
      const years = [
        ...new Set(parsedData.data.map((row) => row.umd_tree_cover_loss__year)),
      ];
      const datasets = years.map((year) => {
        return {
          label: year,
          data: parsedData.data
            .filter((row) => row.umd_tree_cover_loss__year === year)
            .map((row) => parseFloat(row.umd_tree_cover_loss__ha)), // Assuming you want to use 'umd_tree_cover_loss__ha'
          fill: false,
          borderColor: this.getRandomColor(),
        };
      });
      console.log(this.myChartCanvas);
      new Chart(this.myChartCanvas, {
        type: "line",
        data: {
          labels: years,
          datasets: datasets,
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Gross_Co2e gfw_gross_emissions_co2e_all_gases__Mg",
              },
            },
            x: {
              title: {
                display: true,
                text: "Year",
              },
            },
          },
        },
      });
    },
  },
};
</script>

<style>
/* Add your styles here */
.chart {
  height: 40vh;
}

.page {
  height: 100vh;
  margin-left: 100px;
  margin-right: 100px;
}
</style>
<template>
  <div class="text-4xl text-green-800 font-bold mx-16 my-2">Forest Cover</div>

  <div class="mx-16 mt-6 mb-16">
    <!--  graphs  -->

    <div class="text-xl text-green-800 my-4">Statistics</div>
    <!-- Drivers of Deforestation -->
    <div class="chart">
      <canvas id="myChartCanvas"></canvas>
    </div>

    <div>dlweldw {{ data }}</div>

    <!-- Data sources -->
    <div class="text-xl text-green-800">Want Access to the data used?</div>
    <ul class="list-disc list-inside ml-4">
      <li>
        <a
          href="https://www.globalforestwatch.org/dashboards/country/KEN/?map=eyJjYW5Cb3VuZCI6dHJ1ZX0%3D"
          target="_blank"
          class="hover:underline hover:pointer"
          >Forest Cover</a
        >
      </li>
      <li>
        <a
          href="https://www.researchgate.net/figure/Forest-coverage-of-land-area-Data-source-World-Bank-55_fig3_329132267"
          target="_blank"
          class="hover:underline hover:pointer"
          >Forest Cover Research</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import Papa from "papaparse";
import DeforestrationDrivers from "./DeforestrationDrivers.vue";
import TreeCoverLossPerRegionVue from "./TreeCoverLossPerRegion.vue";
export default {
  components: {
    DeforestrationDrivers,
    TreeCoverLossPerRegionVue,
  },
  data() {
    return {
      data: [],
      treeCoverLoss: [],
      myChartCanvas: "",
      treeCoverLossData:
        "https://raw.githubusercontent.com/JosephRidge/ClimateChange-GHG/main/data/Forest%20Cover/Primary%20Forest%20loss%20in%20Kenya/treecover_loss__ha.csv",
      deforestationDriversData:
        "https://raw.githubusercontent.com/JosephRidge/ClimateChange-GHG/main/data/Forest%20Cover/Annual%20tree%20cover%20loss%20by%20dominant%20driver%20in%20Kenya/treecover_loss__ha.csv",
      treeCoverLossPerRegionData:
        "https://raw.githubusercontent.com/JosephRidge/ClimateChange-GHG/main/data/Forest%20Cover/Location%20of%20tree%20cover%20loss%20in%20Kenya/treecover_loss_by_region__ha.csv",
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
      const canvas = this.myChartCanvas.getContext("2d");
      const response = await fetch(this.treeCoverLossData);
      const data = await response.text();
      const parsedData = Papa.parse(data, { header: true });

      // Remove the last row as it might be incomplete or erroneous
      parsedData.data.pop();

      // Extract unique years from the data
      const years = [
        ...new Set(
          parsedData.data.map((row) => parseInt(row.umd_tree_cover_loss__year))
        ),
      ];

      // Prepare datasets for each year
      const datasets = years.map((year) => {
        // Filter data for the current year
        const dataForYear = parsedData.data.filter(
          (row) => parseInt(row.umd_tree_cover_loss__year) === year
        );

        // Extract tree cover loss for the current year
        const treeCoverLoss = dataForYear.map((row) =>
          parseFloat(row.umd_tree_cover_loss__ha)
        );

        this.treeCoverLoss.push(treeCoverLoss[0]);
        return {
          label: year,
          data: treeCoverLoss,
          fill: true,
          borderColor: this.getRandomColor(), // Assuming getRandomColor() is a function to generate random colors
        };
      });
      // Construct labels array with strings representing each year
      const labels = years.map(String);
      // Render chart
      new Chart(canvas, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Tree Cover Loss (ha)",
              data: this.treeCoverLoss,
              backgroundColor: "#166532",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Tree Cover Loss (ha)",
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
  height: 70vh;
}

.page {
  height: 100vh;
  margin-left: 100px;
  margin-right: 100px;
}
</style>
<template>
  <div class="text-4xl text-green-800 font-bold mx-16 my-2">Forest Cover</div>
  <p class="text-base text-green-800 mx-16 mt-4 mb-2">
    Delve into a world of dynamic graphs that unlock the secrets of Kenya's
    forest cover. Track the cumulative changes region by region, witnessing both
    losses and gains over time. Explore the complex interplay of factors driving
    deforestation, gaining deeper understanding of what shapes Kenya's forest
    landscape
  </p>
  <div class="mx-16 mt-6 mb-16">
    <!--  graphs  -->

    <hr />
    <!-- Tree Cover Loss -->
    <div class="text-xl text-green-500 my-4 font-bold">
      Tree Cover Loss per hectare
    </div>

    <hr />
    <div class="chart">
      <canvas id="myChartCanvas"></canvas>
    </div>

    <!-- Drivers of Deforestation -->
    <DeforestrationDrivers :dataSource="deforestationDriversData" />

    <!--Region wise tree cover loss -->
    <TreeCoverLossPerRegionVue :dataSource="treeCoverLossPerRegionData" />
    <!-- Data sources -->
    <div class="text-xl text-green-800 my-2">Want Access to the data used?</div>
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

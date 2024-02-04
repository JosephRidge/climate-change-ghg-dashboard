<script>
import Chart from "chart.js/auto";
import Papa from "papaparse";
export default {
  data() {
    return {
      data: [],
      treeCoverLoss: [],
      deforestrationDrivers: [],
      gmstChartCanvas: "",
      gmstdataSource: this.gmstdataSource,
    };
  },
  props: ["gmstdataSource"],
  mounted() {
    this.gmstChartCanvas = document.getElementById("gmstChartCanvas");
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
      const canvas = this.gmstChartCanvas.getContext("2d");
      const response = await fetch(this.gmstdataSource);
      const data = await response.text();
      const parsedData = Papa.parse(data, { header: true });
    //   console.log(data)

      // Remove the last row as it might be incomplete or erroneous
    //   parsedData.data.pop();

      // Extract unique years from the data
      const years = [
        ...new Set(
          parsedData.data.map((row) => parseInt(row.umd_tree_cover_loss__year))
        ),
      ];
      const drivers = [
        ...new Set(
          parsedData.data.map((row) => row.tsc_tree_cover_loss_drivers__driver)
        ),
      ];

      // Initialize an object to store cumulative tree cover loss for each driver
      const cumulativeTreeCoverLossByDriver = {};

      // Initialize an array to store cumulative tree cover loss for each year
      const cumulativeTreeCoverLossByYear = Array(years.length).fill(0);

      // Loop through each driver and calculate cumulative tree cover loss for each year
      drivers.forEach((driver) => {
        // Initialize an array to store tree cover loss for the current driver
        const treeCoverLossForDriver = Array(years.length).fill(0);

        // Filter data for the current driver
        const dataForDriver = parsedData.data.filter(
          (row) => row.tsc_tree_cover_loss_drivers__driver === driver
        );

        // Accumulate tree cover loss for each year
        dataForDriver.forEach((row) => {
          const yearIndex = years.indexOf(
            parseInt(row.umd_tree_cover_loss__year)
          );
          treeCoverLossForDriver[yearIndex] += parseFloat(
            row.umd_tree_cover_loss__ha
          );
        });

        // Accumulate tree cover loss for each year across all drivers
        treeCoverLossForDriver.forEach((loss, index) => {
          cumulativeTreeCoverLossByYear[index] += loss;
        });

        // Store cumulative tree cover loss for the current driver
        cumulativeTreeCoverLossByDriver[driver] = treeCoverLossForDriver;
      });

      // Render chart
      new Chart(canvas, {
        type: "bar",
        data: {
          labels: years.map(String),
          datasets: Object.keys(cumulativeTreeCoverLossByDriver).map(
            (driver) => {
              return {
                label: driver,
                data: cumulativeTreeCoverLossByDriver[driver],
                backgroundColor:this.getRandomColor(), // Assuming getRandomColor() is a function to generate random colors
              };
            }
          ),
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              stacked: true, // Stack bars vertically
              beginAtZero: true,
              title: {
                display: true,
                text: "Tree Cover Loss (ha)",
              },
            },
            x: {
              stacked: true, // Stack bars horizontally
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
</style>
<template>
  <div class="mt-6">
    <hr />
    <!-- Drivers of Deforestation -->
    <div class="text-xl text-green-500 my-4 font-bold capitalize">
        Global mean surface temperature (GMST) due to emissions of the three gases
    </div>
    <hr />
    <div class="chart">
      <canvas id="gmstChartCanvas"></canvas>
    </div>
  </div>
</template>

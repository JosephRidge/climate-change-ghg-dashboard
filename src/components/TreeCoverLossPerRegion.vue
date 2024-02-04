<script>
import Chart from "chart.js/auto";
import Papa from "papaparse";
import DeforestrationDrivers from "./DeforestrationDrivers.vue"
export default {
  components: {
    DeforestrationDrivers
  },
  data() {
    return {
      data: [],
      treeCoverLoss: [],
      dataPresent: false,
      locations: [],
      chartRegionCanvas: "",
      dataSource: this.dataSource,
      locationSource: "https://raw.githubusercontent.com/JosephRidge/ClimateChange-GHG/main/data/Forest%20Cover/Location%20of%20tree%20cover%20loss%20in%20Kenya/adm1_metadata.csv"
    };
  },
  props: ["dataSource"],

  mounted() {
    this.chartRegionCanvas = document.getElementById("chartRegionCanvas");
    this.loadCSVAndCreateChart();
    this.getLocations();
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
    async getLocations() {
      this.dataPresent = false
      const canvas = this.chartRegionCanvas.getContext("2d");
      const response = await fetch(this.locationSource);
      const data = await response.text();
      const parsedData = Papa.parse(data, { header: true });

      // Remove the last row as it might be incomplete or erroneous
      parsedData.data.pop();
      this.response = data
      const regions = [...new Set(parsedData.data.map((row) => row.name))];
      this.locations = regions
    },
    async loadCSVAndCreateChart() {
      const canvas = this.chartRegionCanvas.getContext("2d");
      const response = await fetch(this.dataSource);
      const data = await response.text();
      const parsedData = Papa.parse(data, { header: true });

      // Remove the last row as it might be incomplete or erroneous
      parsedData.data.pop();
      this.dataPresent = true

      // Extract unique years from the data
      const years = [...new Set(parsedData.data.map((row) => parseInt(row.umd_tree_cover_loss__year)))];
      const regions = [...new Set(parsedData.data.map((row) => row.adm1))];

      // Initialize an object to store cumulative forest cover loss and CO2 emissions for each region
      const cumulativeForestCoverLossByRegion = {};
      const cumulativeCO2EmissionsByRegion = {};

      // Initialize an array to store cumulative forest cover loss and CO2 emissions for each year
      const cumulativeForestCoverLossByYear = Array(years.length).fill(0);
      const cumulativeCO2EmissionsByYear = Array(years.length).fill(0);

      // Loop through each region and calculate cumulative forest cover loss and CO2 emissions for each year
      regions.forEach((region) => {
        // Initialize an array to store forest cover loss and CO2 emissions for the current region
        const forestCoverLossForRegion = Array(years.length).fill(0);
        const CO2EmissionsForRegion = Array(years.length).fill(0);

        // Filter data for the current region
        const dataForRegion = parsedData.data.filter((row) => row.adm1 === region);

        // Accumulate forest cover loss and CO2 emissions for each year
        dataForRegion.forEach((row) => {
          const yearIndex = years.indexOf(parseInt(row.umd_tree_cover_loss__year));
          forestCoverLossForRegion[yearIndex] += parseFloat(row.umd_tree_cover_loss__ha);
          CO2EmissionsForRegion[yearIndex] += parseFloat(row.gfw_gross_emissions_co2e_all_gases__Mg);
        });

        // Accumulate forest cover loss and CO2 emissions for each year across all regions
        forestCoverLossForRegion.forEach((loss, index) => {
          cumulativeForestCoverLossByYear[index] += loss;
        });
        CO2EmissionsForRegion.forEach((emission, index) => {
          cumulativeCO2EmissionsByYear[index] += emission;
        });

        // Store cumulative forest cover loss and CO2 emissions for the current region
        cumulativeForestCoverLossByRegion[region] = forestCoverLossForRegion;
        cumulativeCO2EmissionsByRegion[region] = CO2EmissionsForRegion;
      });

      // Render chart
      new Chart(canvas, {
        type: "bar",
        data: {
          labels: years.map(String),
          datasets: [
            {
              label: "Forest Cover Loss (ha)",
              data: cumulativeForestCoverLossByYear,
              backgroundColor: "#166532",
            },
            // {
            //     label: "CO2 Emissions (Mg)",
            //     data: cumulativeCO2EmissionsByYear,
            //     backgroundColor: "#3498DB",
            // },
          ],
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
                text: "Quantity",
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
    }

  },
};
</script>

<style>
/* Add your styles here */


.page {
  height: 100vh;
  margin-left: 100px;
  margin-right: 100px;
}
</style>
<template>
  <div class=" mt-6">
    <!--  graphs  -->

    <hr />
    <!-- Tree Cover Loss -->
    <div class="text-xl text-green-500 mt-4 mb-2 font-bold">
      Cumulative Tree Cover Loss per Per Region
    </div>


    <hr />
    <div>
      <img v-show="!dataPresent" src="../assets/Loader.gif" alt="funny GIF" class="mx-auto" width="20%" />
    </div>
    <div class="chart">
      <canvas id="chartRegionCanvas"></canvas>
    </div>

    <p class="mb-8 text-green-600 px-3 ">
      The data targets <span class="hover:underline hover:underline-offset-4 font-bold">47 regions</span> computing the
      <span class="hover:underline hover:underline-offset-4 font-bold">cummulative</span> tree cover loss per ha from
      <span class="hover:underline hover:underline-offset-4 font-bold">2001 to 2022</span>. The regions are:
    <div class="grid grid-cols-5 "> <span
        class=" pl-5 bg-green-100 hover:bg-green-300 hover:text-green-900 cursor-pointer rounded-lg px-1 py-1 mr-1 my-2"
        v-for="location in locations" :key="location">
        {{ location }} </span></div>
    </p>
  </div>
</template>

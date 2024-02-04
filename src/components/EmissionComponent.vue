<script>
import Chart from "chart.js/auto";
import Papa from "papaparse";
import GMST from "./GMST.vue";
export default {
  components: {
    GMST,
  },
  props: ["gmstCompositionEmissionsData"],
  data() {
    return {
      data: [],
      components: [],
      gmstCompositionEmissionsData: this.gmstCompositionEmissionsData,
      ghgCompositionChartCanvas: "",
    };
  },
  mounted() {
    this.ghgCompositionChartCanvas = document.getElementById(
      "ghgCompositionChartCanvas"
    );
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
    const canvas = this.ghgCompositionChartCanvas.getContext("2d");
    const response = await fetch(this.gmstCompositionEmissionsData);
      const data = await response.text();
    const parsedData = Papa.parse(data, { header: true });

    // Remove the last row as it might be incomplete or erroneous
    parsedData.data.pop();
    const kenyaData = parsedData.data.filter((row) => row.ISO3 === "KEN");

    // Extract components
    const components = kenyaData.map((row) => row.Component);

    // Count occurrences of each component
    const componentCounts = {};
    components.forEach((component) => {
        componentCounts[component] = (componentCounts[component] || 0) + 1;
    });

    // Construct datasets array
    const datasets = [{
        data: Object.values(componentCounts),
        backgroundColor: [
            "#29AB87",
            "#166534",
            "#4BB599", 
            // Add more colors if needed
        ],
    }];

    // Construct labels array
    const labels = Object.keys(componentCounts); 
    console.log(labels)

    // Render chart
    const chart = new Chart(canvas, {
        type: "pie",
        data: {
            labels: labels,
            datasets: datasets,
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        },
    });

    return chart;
}

}
} 
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
    <div class="mt-6 mb-16">
      <!--  graphs  -->
      <hr />
      <!-- Tree Cover Loss -->
      <div class="text-xl text-green-500 my-4 font-bold capitalize">
       Emissions Components
      </div>
      <div class="text-sm mb-6 text-green-700">
        <span class="text-bold">NOTE: </span> Component specifies fossil emissions, Land use, land-use change, and forestry(LULUCF) emissions or total emissions of the gas.

      <hr class="my-4" />
      <div class="chart">
        <canvas id="ghgCompositionChartCanvas"></canvas>
      </div>

      <!--GMST -->
      <!-- <GMST :gmstdataSource="gmstResponse" /> -->
      <!-- Data sources -->
      <div class="text-xl text-green-800 my-2">
        Want Access to the data used?
      </div>
      <ul class="list-disc list-inside ml-4">
        <li>
          <a
            href="https://zenodo.org/records/7636699#.ZFCy4exBweZ"
            target="_blank"
            class="hover:underline hover:pointer"
            >GHG Emissions</a
          >
        </li>
        <li>
          <a
            href="https://zenodo.org/records/7636699#.ZFCy4exBweZ"
            target="_blank"
            class="hover:underline hover:pointer"
          >
            Global mean surface temperature</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import Papa from "papaparse";
import GMST from "./GMST.vue";
import EmissionComponent from "./EmissionComponent.vue"
export default {
  components: {
    GMST,
    EmissionComponent,
  },
  data() {
    return {
      data: [],
      gases: [],
      dataPresent:false,
      gmstEmissionsData: [],
      response:"",
      ghgChartCanvas: "",
      ghgEmmissions:
        "https://raw.githubusercontent.com/JosephRidge/ClimateChange-GHG/main/data/GHG%20Emissions/EMISSIONS_CUMULATIVE_CO2e100_1851-2021.csv",
      gmstResponse:
        "https://raw.githubusercontent.com/JosephRidge/ClimateChange-GHG/main/data/GHG%20Emissions/GMST_response_1851-2021.csv",
    };
  },
  mounted() {
    this.ghgChartCanvas = document.getElementById("ghgChartCanvas");
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
        this.dataPresent = false
      const canvas = this.ghgChartCanvas.getContext("2d");
      const response = await fetch(this.ghgEmmissions);
      const data = await response.text();
      this.response=data
      const parsedData = Papa.parse(data, { header: true });

      // Remove the last row as it might be incomplete or erroneous
      parsedData.data.pop();
      const kenyaData = parsedData.data.filter((row) => row.ISO3 === "KEN");
      this.dataPresent = true
      // Extract unique years from the data
      const years = [
        ...new Set(
          kenyaData
            .filter((row) => parseInt(row.Year) >= 1995)
            .map((row) => parseInt(row.Year))
        ),
      ];

      // Prepare datasets for each year
      const datasets = years.map((year) => {
        // Filter data for the current year
        const dataForYear = kenyaData.filter(
          (row) => parseInt(row.Year) === year
        );

        // Extract tree cover loss for the current year
        const gasEmitted = dataForYear.map((row) => parseFloat(row.Data));

        this.gases.push(gasEmitted[0]);

        return {
          label: year,
          data: gasEmitted,
          fill: true,
          borderColor: this.getRandomColor(), // Assuming getRandomColor() is a function to generate random colors
        };
      });
      // Construct labels array with strings representing each year
      const labels = years.map(String); 
      // Render chart
      new Chart(canvas, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Gas Emissions(Pg~CO[2]*-e[100])",
              data: this.gases,
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
                text: "Emissions",
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
  <div class="mx-16 my-2">
    <div class="text-4xl text-green-800 font-bold my-2 capitalize">
      GHG Emissions & Global mean surface temperature
    </div>

    <div class="mb-1 mt-4 text-lg text-green-600">Greenhouse Gases(GHG):</div>
    <p class="text-base text-green-800 mb-2">
      Imagine Earth wrapped in a giant blanket. Greenhouse gases act like this
      blanket, trapping heat from the sun and warming the planet. Some crucial
      GHGs include carbon dioxide (CO2), methane (CH4), and nitrous oxide (N2O).
      These gases are released naturally and through human activities like
      burning fossil fuels, deforestation, and industrial processes.
    </p>
    <div class="my-1 text-lg text-green-600">
      Global Mean Surface Temperature(GMST):
    </div>
    <p class="text-base text-green-800 mb-2">
      This term refers to the average temperature of Earth's surface, combining
      measurements from land and oceans. As GHGs trap more heat, GMST rises,
      leading to various observable impacts like sea level rise, melting
      glaciers, and extreme weather events.
    </p>
    <div class="mt-6 mb-16">
      <!--  graphs  -->
      <hr />
      <!-- Tree Cover Loss -->
      <div class="text-xl text-green-500 my-4 font-bold capitalize">
        Cumulative CO2 equivalent emissions
      </div>
      <div class="text-sm mb-6 text-green-700">
        <span class="text-bold">NOTE: </span> CO2, CH4, N2O or the three-gas
        total (labelled 3-GHG).
      </div>

      <hr />
      <div>
        <img
          v-show="!dataPresent"
          src="../assets/Loader.gif"
          alt="funny GIF"
          class="mx-auto"
          width="20%"
        />
      </div>
      <div class="chart">
        <canvas id="ghgChartCanvas"></canvas>
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
    <EmissionComponent :gmstCompositionEmissionsData="ghgEmmissions"/>
  </div>
</template>

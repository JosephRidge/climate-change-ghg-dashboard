<script setup>
import Navigation from "./Navigation.vue";
</script>

<template>
  <div class="container mx-auto py-8">
    <h1 class="text-3xl font-bold mb-4">
      Climate Change: A Threat to Our Environment
    </h1>

    <p class="mb-6">
      Climate change is one of the most pressing issues facing our planet today.
      It is caused by the release of greenhouse gases into the atmosphere, which
      trap heat and cause the planet to warm. This warming is having a number of
      devastating effects on the environment, including rising sea levels, more
      extreme weather events, and the loss of biodiversity.
    </p>

    <blockquote
      class="border-l-4 border-green-500 italic text-gray-700 pl-4 py-2 mb-6"
    >
      <p># How to Contribute/ Getting Started</p>
      <ul class="list-disc list-inside ml-4">
        <li>
          Navigate to this
          <a
            href="https://github.com/JosephRidge/ClimateChange-GHG"
            target="_blank"
            class="text-blue-400 underline font-bold"
            >repository</a
          >
        </li>
      </ul>
    </blockquote>

    <h2 class="text-2xl font-bold mb-4">Objectives</h2>
    <ul class="list-disc list-inside mb-6">
      <li>
        Develop machine learning models to predict future greenhouse gas
        emissions based on historical data.
      </li>
      <li>Forecast sea level rise using time series forecasting techniques.</li>
      <li>
        Predict the impact of deforestation on biodiversity using classification
        or regression models.
      </li>
    </ul>

    <h2 class="text-2xl font-bold mb-4">
      Methodology (
      <a
        href="https://www.sv-europe.com/crisp-dm-methodology/"
        class="text-blue-500"
        target="_blank"
        >CRISP-DM</a
      >
      )
    </h2>

    <blockquote
      class="border-l-4 border-blue-500 italic text-gray-700 pl-4 py-2 mb-6"
    >
      <p>Data Collection (CRISP-DM: Business Understanding):</p>
      <!-- Add other methodology steps similarly -->
    </blockquote>

    <h2 class="text-2xl font-bold mb-4">Data Sources</h2>
    <ul class="list-disc list-inside mb-6">
      <li>
        <a
          href="https://zenodo.org/records/7636699#.ZFCy4exBweZ"
          class="text-blue-500"
          target="_blank"
          >GHG Emissions</a
        >
      </li>
      <li>
        <a
          href="https://www.globalforestwatch.org/dashboards/country/KEN/?map=eyJjYW5Cb3VuZCI6dHJ1ZX0%3D"
          class="text-blue-500"
          target="_blank"
          >Forest Cover</a
        >
      </li>
      <li>
        <a
          href="https://www.kmfri.go.ke/index.php?id=10"
          class="text-blue-500"
          target="_blank"
          >Sea Level Data</a
        >
      </li>
    </ul>
    <h2 class="text-2xl font-bold mb-4">Relevant Github Repository</h2>
    <li>
      <a
        href="https://github.com/JosephRidge/ClimateChange-GHG"
        class="text-blue-500"
        target="_blank"
        >Data Analysis
      </a>
    </li>
    <li>
      <a
        href="https://github.com/JosephRidge/climate-change-ghg-dashboard"
        class="text-blue-500"
        target="_blank"
        >Dashboard
      </a>
    </li>
    <h2 class="text-2xl font-bold mb-4">Thanks!</h2>
    <p class="mb-6">🐝 Be Awesome...🐝 Be kind!</p>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>

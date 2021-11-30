<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div>
    <dl
      class="mt-5 grid grid-cols-1 rounded-md bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x"
    >
      <div class="px-4 py-5 sm:p-6">
        <dt class="text-base font-normal text-gray-900">
          Total Surveys
        </dt>
        <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
          <div class="flex items-baseline text-2xl font-semibold text-red-500">
            {{ surveys.length }}
            <span class="ml-2 text-sm font-medium text-gray-500">
              from 2 yesterday
            </span>
          </div>
        </dd>
      </div>
      <div class="px-4 py-5 sm:p-6">
        <dt class="text-base font-normal text-gray-900">
          Total Raptor Sightings
        </dt>
        <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
          <div class="flex items-baseline text-2xl font-semibold text-red-500">
            7
            <span class="ml-2 text-sm font-medium text-gray-500">
              from 6 yesterday
            </span>
          </div>
        </dd>
      </div>
      <div class="px-4 py-5 sm:p-6">
        <dt class="text-base font-normal text-gray-900">
          Avg. Sightings per Route
        </dt>
        <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
          <div class="flex items-baseline text-2xl font-semibold text-red-500">
            3.33%
            <span class="ml-2 text-sm font-medium text-gray-500">
              from 3% yesterday
            </span>
          </div>
        </dd>
      </div>
    </dl>
  </div>
</template>

<script>
export default {
  props: ["surveys"],
};
</script>

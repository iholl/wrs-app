<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div>
    <dl
      class="mt-5 grid grid-cols-1 rounded-md bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x"
    >
      <div v-for="item in stats" :key="item.name" class="px-4 py-5 sm:p-6">
        <dt class="text-base font-normal text-gray-900">
          {{ item.name }}
        </dt>
        <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
          <div class="flex items-baseline text-2xl font-semibold text-red-500">
            {{ item.stat }}
            <span class="ml-2 text-sm font-medium text-gray-500">
              from {{ item.previousStat }} yesterday
            </span>
          </div>
        </dd>
      </div>
    </dl>
  </div>
</template>

<script>
const stats = [
  {
    name: "Complete/Incomplete Routes",
    stat: "3/3",
    previousStat: "2/2",
    change: "1",
    changeType: "increase",
  },
  {
    name: "Total Raptor Sightings",
    stat: "7",
    previousStat: "6",
    change: "1",
    changeType: "increase",
  },
  {
    name: "Average Sightings per Route",
    stat: "3.33%",
    previousStat: "3",
    change: "0.33%",
    changeType: "increase",
  },
];

export default {
  setup() {
    return {
      stats,
    };
  },
};
</script>

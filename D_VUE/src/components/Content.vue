<script>
import BarChart from "./BarChart.vue"
import AreaChart from "./AreaChart.vue"
import Side from "./Side.vue"
import 'v-calendar/dist/style.css';
import Calendar from 'mpvue-calendar'

export default {
    data() {
        return {
            weeks: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            headers: [{ title: null, value: null, bg: "#0c3458" }, { title: null, value: null, bg: "#0c3458" },
            { title: null, value: null, bg: "#0c3458" }, { title: "Total de Inscritos", value: 1255, bg: "#ffffff" }],
        };
    },
    components: {
        BarChart,
        AreaChart,
        Side,
        Calendar,
    },
    props: {},
    computed: {},
    methods: {},
    watch: {}
}
</script>

<template>
    <div class="pt-[10px]">
        <div class="flex -mx-7 text-dark">
            <div class="w-4/12 px-7" v-for="header in headers">
                <div v-bind:class="`min-h-[160px] px-4 py-3 shadow-lg bg-[${header.bg}]`">
                    <h3 class="font-medium text-lg">{{ header.title }}</h3>
                    <p class="text-center text-5xl mt-6 font-medium">{{ header.value }}</p>
                </div>
            </div>
        </div>

        <div class="flex -mx-7 pb-7 flex-row mt-12">
            <div class="w-9/12 px-7 space-y-8">
                <BarChart />

                <div class="bg-white px-4 py-3 shadow-lg">
                    <div class="flex">
                        <div class="w-4/6">
                            <AreaChart />
                        </div>
                        <div class="flex items-end w-2/6">
                            <Calendar :weeks="weeks" :selectMode="'multi'" class-name="select-mode" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-3/12 px-7 flex">
                <div class="bg-white text-dark px-4 py-3 shadow-lg w-full">
                    <Side />
                </div>
            </div>
        </div>


    </div>
</template>

<style scoped>
.bg-\[\#0c3458\] {
    --tw-bg-opacity: 1;
    background-color: rgb(12 52 88 / var(--tw-bg-opacity));
}

.bg-\[\#ffffff\] {
    --tw-bg-opacity: 1;
    background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}
</style>
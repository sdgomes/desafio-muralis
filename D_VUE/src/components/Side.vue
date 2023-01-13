<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
ChartJS.register(ArcElement, Tooltip, Legend)

export default {
    data() {
        return {
            labels: ["Curso A", "Curso B"],
            data: {
                datasets: [
                    {
                        backgroundColor: ['#fe9517', '#0c3458'],
                        data: [45, 55]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        };
    },
    components: {
        Doughnut
    },
    props: {},
    computed: {},
    methods: {},
    watch: {}
}
</script>

<template>
    <div class="px-15 mt-5 relative">
        <div>
            <Doughnut :data="data" :options="options" />
        </div>
        <div class="absolute flex items-center justify-center text-[3em] font-medium inset-0 m-auto">
            {{ data.datasets[0].data[0] }}%
        </div>
    </div>

    <div class="flex flex-col mt-10 space-y-5">
        <button class="font-medium border-b-2 w-fit text-xl mx-auto px-8" v-for="item in labels">
            {{ item }}
        </button>
    </div>
</template>
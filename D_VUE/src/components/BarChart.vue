<script>
import { Chart } from 'highcharts-vue'

export default {
    data() {
        return {
            chartOptions: {
                colors: ['#fe9517', '#0c3458'],
                chart: {
                    type: 'column',
                    height: 200
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUNE', 'JULY', 'AUG', 'SEP']
                },
                legend: {
                    symbolRadius: 0,
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                },
                credits: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                },
                yAxis: {
                    min: 10,
                    title: {
                        text: ''
                    }
                },
                tooltip: {
                    pointFormat: '{point.y:.1f}',
                    shared: false
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0,
                        marker: {
                            symbol: 'circle',
                            lineWidth: 2,
                            fillColor: 'white',
                            lineColor: null,
                        }
                    }
                },
                series: [{
                    name: 'Curso A',
                    data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4],
                    marker: {
                        symbol: 'square'
                    },
                }, {

                    name: 'Curso B',
                    data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2],
                    marker: {
                        symbol: 'square'
                    },

                }]
            },
        };
    },
    components: {
        Chart
    },
    props: {},
    computed: {},
    methods: {},
    watch: {}
}
</script>

<template>
    <div class="bg-white px-10 py-3 shadow-lg">
        <h3 class="font-medium text-xl mb-5">Inscritos</h3>
        <Chart :options="chartOptions"></Chart>
    </div>
</template>
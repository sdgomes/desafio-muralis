<script>
import { Chart } from 'highcharts-vue'

export default {
    data() {
        return {
            chartOptions: {
                colors: ['#fe9517', '#0c3458'],
                chart: {
                    type: 'areaspline',
                    height: 250
                },
                exporting: {
                    enabled: false
                },
                title: {
                    text: '',
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    verticalAlign: 'top',
                    x: 10,
                    y: 0,
                    floating: true,
                    borderWidth: 0,
                    backgroundColor: '#FFFFFF'
                },
                xAxis: {
                    visible: false,
                },
                yAxis: {
                    visible: false,
                },
                tooltip: {
                    shared: true,
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    areaspline: {
                        fillOpacity: 0.5,
                        lineWidth: 4,
                        states: {
                            hover: {
                                lineWidth: 5
                            }
                        },
                        marker: {
                            enabled: false
                        },
                    }
                },
                series: [{
                    name: 'Curso A',
                    data: [7537, 7537, 7559, 7631, 7644, 769, 7683, 77, 7703, 7757, 7728, 7721, 7748, 774, 7718, 7731, 767, 769, 7706, 7752, 774, 771, 7721, 7681, 7681, 7738, 772, 7701, 7699, 7689, 7719, 768, 7645, 7613, 7624, 7616, 7608, 7608, 7631, 7615, 76, 756, 757, 7562, 7598, 7645, 7635, 7614, 7604, 7603, 7602, 7566, 7587, 7562, 7506, 7518, 7522, 7524, 7491, 7505, 754, 7493, 7493, 7491, 751, 7483, 7487, 7491, 7479, 7479, 7479, 7449, 7454, 7427, 7391, 7381, 7382, 7366, 7353, 7351, 7377, 7364, 7328, 7356, 7331, 7351, 7351, 736, 7347, 7375, 7346, 7377, 7389, 7394, 7416, 7382, 7388, 7368, 74, 7149, 7195],
                    lineColor: '#fe9517',
                    fillColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#fe9517'],
                            [1, '#ffffff']
                        ]
                    },
                }, {
                    name: 'Curso B',
                    data: [6414, 6467, 6494, 6412, 6337, 6442, 6446, 6487, 6522, 647, 6462, 6456, 6461, 6407, 6444, 6424, 6412, 6358, 6351, 6345, 634, 6328, 6296, 6382, 639, 6376, 6364, 6367, 6316, 6311, 6255, 6295, 6311, 6324, 6307, 6283, 6354, 638, 6357, 6352, 6368, 6416, 6407, 6422, 6425, 6458, 6462, 6465, 6635, 6662, 6709, 6711, 6709, 679, 6802, 6814, 6788, 6751, 6754, 6773, 6851, 6773, 6771, 6788, 684, 689, 6926, 6903, 702, 7036, 7071, 7096, 7178, 711, 7068, 701, 7031, 6897, 7025, 6864, 6789, 6808, 6804, 6832, 697, 6993, 7103, 7194, 723, 7336, 7337, 7284, 731, 7365, 7333, 7273, 734, 7405, 7461, 745, 7586],
                    lineColor: '#0c3458',
                    fillColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#0c3458'],
                            [1, '#ffffff']
                        ]
                    },
                }]
            }
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
    <Chart :options="chartOptions"></Chart>
</template>
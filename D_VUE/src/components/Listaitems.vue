<script>
export default {
    data() {
        return {
            selected: "",
            showDropdown: false,
            placeholder: "",
        };
    },
    props: {
        options: Array,
        tag: String,
    },
    computed: {
    },
    methods: {
        toggleDropdown() {
            this.showDropdown = !this.showDropdown;
        },
        selectOption(option) {
            this.selected = option;
            this.placeholder = option;
            this.$emit('selected', this.selected)
        },
    },
    watch: {
        options() {
            this.selected = ""
            this.placeholder = ""
        }
    }
};
</script>

<template>
    <div>
        <label class="pl-3 font-medium">{{ tag }}</label>
        <div class="relative vue-select border border-[#4473c5] rounded-md px-2 py-1 focus:ring-1 focus:ring-[#86a1cf] focus-within:outline-none"
            @click="toggleDropdown">
            <div
                class="bg-[#4473c5] shadow closed items-center justify-center w-[32px] h-[32px] absolute right-[2px] top-[1px] rounded-[5px] triangle">
            </div>
            <span class="selected-option">{{ placeholder }}</span>
            <transition name="slide">
                <div class="dropdown-options-container" v-show="showDropdown">
                    <div class="dropdown-options" v-for="option in options"
                        v-bind:class="{ selected: option === selected }">
                        <div class="dropdown-options--cell" @click="selectOption(option)">
                            <span class="option-text">{{ option }}</span>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<style scoped>
.closed {
    transform: scaleY(-1);
}

.triangle {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABAEAQAAABQ8GUWAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAACYktHRAAAqo0jMgAAAAlwSFlzAAAAYAAAAGAA8GtCzwAAAAd0SU1FB+cBDA8kIQb+oVcAAAO8SURBVHja7ZvNS1RhGMXPe9ORMUbdKC4cghpUwsVEBZGgKxepe82t2SoLw9CVkBIGTaFL3Zf+AdailYFuVAoE8auFoCDiQvuwNPQ9LeyaHzPOnZn73mfU+e2cucyc37nPvTDPjECGDBkyCEEdDFIHg9I55Arg0BD57p10DiH5u3dJrUmSuqpKOo/H8pZFTkzQRn/+TFqWdC7vCtAPHvAEzc3SuTySDwTI1dWTBaytUefnS+fzoIBIhLHQr15J5zMsHwqR29sxC+DODllWJp3TXAF8/55xGRmRzmlGXtfUxJe3uXdPOq/L8tnZ5Nyc8wIWF6l9Punc7hXAp0+dy9u0tUnndkdeFxWRGxuJF/DtG1lcLJ3fhQIGBxOXtxkYkM6fmjzDYXJ3N/kC9vaob92S9kihgNHR5OVtxsZIpaRdkpBvbExd3qahQdonQXm/n1xacq+A5WXy8mUTWQ19BO3oAK5cce/1SkqA9nYzWV2GuqSE+udP986+za9f1G6WaqoADg+7L28zNCTtF0f+0JrLFOm6PiMti3py0qg8+W99dumStG+UAh4+NC5/UEJLi7TvUXmdlxd9zWWKtTWyoEDa+1ABr197J29PQSQi7f1PPt6ayxR//qTF+oz6wwfv5e0p+PhRVp51dWLyB9TWCp15ny+xNZcpFhepc3KS9Ujhs8Djx0AaXIMIhaAePfL0LffXXJub0uf+P9+/J7s+S3ICXrwA0ulrrEAA7O725K3IGzdSW3OZYm+P+vZtDwr49ElaNTbj40bXZ+T9+9KK8WlsTMTJcVuk3w/Mzrq76THBygpQXq7U1paToxO4CXZ2pr88sL8+e/bM6dGOJoA6GISamwNyc6X1nPH7N3D9ulJLS/GOdDYBKhI5O/IA4PcDL1+68lJkZaXxNZcxqqtTlLcscmpKWiNp9Jcv8dZnp18CbGkBbt50eT69Q4XDwOm/Pot5E6TOy4OanwfO+lfU6+tAaalSm5vRno09Aer587MvDwCFhWBXV0zNaA+S5eXA9DSQnS0d3x12d4FwWKmZmePPRJ8AvnlzfuQBICsL7OtzdCh1fb30zdscdXXHfdVReZ8Pano6PTY9Jvj6FayoUNbOjv3IsUvgyZPzKw8AoRDQ2nr4kYMJoC4qglpYSK9Njwl+/ADKypRaXQWOTEBv7/mXB4BAAOjpsf9SwP6aC5iaAi7KPy1oDd65o6zJSWt/hdTff3HkAcCyoPr7SaUU2dQEvH0rHUmGpqYs8OpVqMFB6Sgi8No16QgZMmSQ5S8ywiJOCiVsvQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMy0wMS0xMlQxNTozNjozMyswMDowMEm7/JcAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjMtMDEtMTJUMTU6MzY6MzMrMDA6MDA45kQrAAAAKHRFWHRkYXRlOnRpbWVzdGFtcAAyMDIzLTAxLTEyVDE1OjM2OjMzKzAwOjAwb/Nl9AAAAABJRU5ErkJggg==');
    background-size: 50%;
    background-repeat: no-repeat;
    background-position: center;
}

.vue-select {
    cursor: pointer;
    user-select: none;
    transition: all 200ms linear;
    overflow: hidden;
}

.vue-select .selected-option {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    width: 100%;
    position: relative;
    box-sizing: border-box;
    transition: all 200ms linear;
    height: 22px;
}

.vue-select .selected-option:hover {
    color: rgba(0, 0, 0, 0.45);
}

.vue-select .selected-option div {
    fill: #42b883;
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    transition: fill 300ms linear;
}

.vue-select .selected-option div:hover {
    fill: #2e805b;
}

.dropdown-options-container {
    @apply -mx-2 bg-gray-100;
    overflow-y: scroll;
    max-height: 150px;
    position: relative;
    top: 5px;
}

.dropdown-options--cell {
    padding: 2px 10px;
    user-select: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.dropdown-options--cell:hover {
    background-color: #f4fbf8;
    border: none;
}

.dropdown-options.selected .dropdown-options--cell {
    background-color: #f4fbf8;
    border: none;
}

.slide-enter-active,
.slide-leave-active {
    transition: height 150ms ease;
}

.slide-enter,
.slide-leave-to {
    height: 0px;
}
</style>

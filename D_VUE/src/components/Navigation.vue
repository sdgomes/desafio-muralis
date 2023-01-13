<script>
export default {
    data() {
        return {};
    },
    components: {},
    props: {
        active: String
    },
    computed: {},
    methods: {
        changeScreen(evt) {
            this.$emit('changescreen', evt)
        }
    },
    watch: {}
}
</script>

<template>
    <div class="bg-gradient-to-r from-[#194165] to-[#0c3458]">
        <div class="my-5 pb-6">
            <figure class="w-[125px] mx-auto bg-gradient-to-r from-[#0c3458] to-[#1b3a59] p-[15px] rounded-full">
                <img draggable="false" class="rounded-full translate-y-[5px]" src="../assets/images/user.png" alt="...">
            </figure>
        </div>

        <div class="my-5 pb-6">
            <ul class="text-white space-y-1 pl-5">
                <li class="bg-[#10385c] px-3 py-2">Silva Junior</li>
                <li class="bg-[#10385c] px-3 py-1">silva.junior@empresa.com</li>
            </ul>
        </div>

        <div>
            <ul class="text-white space-y-4 cursor-pointer">
                <li v-on:click="changeScreen('home')" v-bind:class="{ ativo: active == 'home' }"
                    class="bg-[#10385c] pl-12 pr-3 shadow py-3">
                    <font-awesome-icon class="text-lg mr-6" icon="fa-solid fa-house" />
                    <span>home</span>
                </li>
                <li v-on:click="changeScreen('ingressantes')" v-bind:class="{ ativo: active == 'ingressantes' }"
                    class="bg-[#10385c] pl-12 pr-3 shadow py-3">
                    <font-awesome-icon class="text-lg mr-6" icon="fa-solid fa-folder" />
                    <span>ingressantes</span>
                </li>
            </ul>
        </div>


    </div>
</template>

<style scoped>
figure {
    box-shadow: 10px 15px 16px 5px #0b2238;
}

.ativo {
    background: #fe9517;
}
</style>
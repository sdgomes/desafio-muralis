<script>
export default {
    data() {
        return {
            id_component: this.generate_id()
        };
    },
    props: {
        name: String
    },
    computed: {},
    methods: {
        generate_id() {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < 5; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }
    },
    watch: {}
}
</script>

<template>
    <div class="flex flex-col">
        <label class="pl-3 font-medium" v-bind:for="id_component">{{ name }}</label>
        <input
            class="border border-[#4473c5] rounded-md px-2 py-1 focus:ring-1 focus:ring-[#86a1cf] focus-within:outline-none"
            v-bind:id="id_component" type="text" />
    </div>
</template>
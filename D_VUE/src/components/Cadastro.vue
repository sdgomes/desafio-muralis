<script>
import Listaitems from './Listaitems.vue';
import Input from './Input.vue';

export default {
    components: {
        Listaitems,
        Input
    },
    data() {
        return {
            cidade: "",
            cursos: ["Matemática", "Letras", "Geografia"],
            estados: ["São Paulo", "Rio de Janeiro", "Minas Gerais"],
            cidades: {
                "São Paulo": ["Mogi das Cruzes", "Suzano", "Poá", "Guararema"],
                "Rio de Janeiro": ['Angra dos Reis', "Niterói", "Itaboraí"],
                "Minas Gerais": ['Belo Horizonte', "Monte Azul", "Muzambinho"]
            }
        }
    },
    methods: {
        changeCities(estado) {
            this.cidade = estado
        }
    }
}
</script>

<template>
    <div class="py-16 w-full">
        <div class="mx-auto max-w-xs bg-white border border-[#4473c5] rounded-t rounded-b-lg shadow-md">
            <div class="bg-[#4473c5] text-white">
                <h5 class="mb-2 text-lg font-medium text-center py-1">Cadastro de Ingressantes</h5>
            </div>

            <div class="pb-4 px-3 space-y-2">
                <Input v-bind:name="'Nome'" />

                <Listaitems v-bind:options="cursos" v-bind:tag="'Curso'" />

                <Listaitems @selected="changeCities" v-bind:options="estados" v-bind:tag="'Estado'" />

                <Listaitems v-bind:options="cidades[cidade]" v-bind:tag="'Cidades'" />

                <div class="flex justify-between items-end pt-5 pb-1">
                    <button
                        class="bg-[#ffc100] w-[30%] py-0.5 border-2 border-[#c9a009] text-white rounded-md">Voltar</button>
                    <button
                        class="bg-[#6fad45] w-[40%] text-xl border-2 border-[#57773c] text-white rounded-md py-1">Gravar</button>
                </div>
            </div>
        </div>
    </div>
</template>
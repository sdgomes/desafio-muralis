<script>
import Navigation from '../components/Navigation.vue'
import Header from '../components/Header.vue'
import Content from '../components/Content.vue'
import Cadastro from '../components/Cadastro.vue'

export default {
  data() {
    return {
      content: "home"
    };
  },
  components: {
    Navigation,
    Header,
    Content,
    Cadastro
  },
  props: {},
  computed: {},
  methods: {
    screen(evt) {
      this.content = evt
    }
  },
  watch: {}
}
</script>

<template>
  <main class="flex h-screen">
    <Navigation @changescreen="screen" v-bind:active="content" class="min-w-[300px] w-[255px]"></Navigation>

    <section v-if="content == 'home'" class="w-full overflow-x-hidden overflow-y-auto bg-[#e5e8ef]">
      <Header class="h-[80px] pl-10 pr-5"></Header>
      <section class="flex h-[calc(100%-80px)]">
        <Content class="px-10 pr-5 w-full"></Content>
      </section>
    </section>

    <Cadastro v-else />
  </main>
</template>
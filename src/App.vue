<template>
  <div v-if="currentUser">
    <Aside />
    <div class="content ht-100v pd-0">
      <!-- content-header -->
      <Header />
      <div class="content-body">
        <div class="container-fluid pd-x-0">
          <router-view />
        </div>
      </div>
    </div>
  </div>
  <!-- login form without navigator menus -->
  <div v-else><router-view /></div>
</template>
<script>
import Aside from "@/components/aside.vue";
import Header from "@/components/header.vue";
export default {
  name: "App",
  components: {
    Aside,
    Header,
  },
  data() {
    return {};
  },
  computed: {
    currentUser() {
      return this.$store.state.authen.user;
    },
    loggedIn() {
      return this.$store.state.authen.status.loggedIn;
    },
    currentPath() {
      return this.$route.path;
    },
  },
  created() {},
};
</script>

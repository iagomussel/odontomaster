<template>
  <div class="navbar-fixed">
    <nav>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo">
          <i class="material-icons">cloud</i> {{ title }}</a
        >
        <ul class="right hide-on-med-and-down">
          <router-link
            v-for="r in routes"
            :key="r.path"
            custom
            :to="r.path"
            v-slot="{ href, route, navigate, isActive, isExactActive }"
          >
            <li
              v-show="route.name[0] != '.'"
              :class="[isActive && 'active', isExactActive && 'active']"
            >
              <a :href="href" @click="navigate">{{ route.name }}</a>
            </li>
          </router-link>
          <li>
            <a href="/#/" @click="logout">Sair</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("user");
      location.href = "/";
    },
  },
  data() {
    return {
      routes: this.$router.options.routes,
    };
  },
  name: "NavBar",
  props: {
    title: String,
  },
};
</script>

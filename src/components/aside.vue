<template>
  <aside class="aside aside-fixed minimize">
    <div class="aside-header">
      <router-link to="/" class="aside-logo"><span></span></router-link>

      <a href="" class="aside-menu-link">
        <i data-feather="menu"></i>
        <i data-feather="x"></i>
      </a>
    </div>
    <div class="aside-body">
      <div class="aside-loggedin">
        <div class="d-flex align-items-center justify-content-start">
          <a href="#" class="avatar"
            ><span class="avatar-initial avatar-online rounded-circle"
              >{{ displayUserChar }}
              <!-- {{ currentUser.toString().substr(0, 1) }} -->
            </span></a
          >
        </div>
        <div class="aside-loggedin-user">
          <a
            href="#loggedinMenu"
            class="d-flex align-items-center justify-content-between mg-b-2"
            data-toggle="collapse"
          >
            <h6 class="tx-semibold mg-b-0">{{ displayUser }}</h6>
            <i data-feather="chevron-down"></i>
          </a>
          <!-- <p class="tx-color-03 tx-12 mg-b-0">Administrator</p> -->
        </div>
        <div class="collapse" id="loggedinMenu">
          <ul class="nav nav-aside mg-b-0">
            <li class="nav-item">
              <a href="#" @click="handleLogout" class="nav-link">
                <i data-feather="log-out"></i>
                <span>ออกจากระบบ</span></a
              >
            </li>
          </ul>
        </div>
      </div>
      <!-- aside-loggedin -->
      <ul class="nav nav-aside">
        <li class="nav-label">Dashboard</li>
        <li
          class="nav-item"
          :class="[
            currentPath === '' || currentPath === '/home' || currentPath === '/'
              ? 'active'
              : '',
          ]"
        >
          <router-link
            to="/"
            class="nav-link"
            @click="(currentPath = '/'), resetPrefix()"
            ><vue-feather type="airplay"></vue-feather> <span>หน้าหลัก</span>
          </router-link>
        </li>
      </ul>
      <ul class="nav nav-aside" v-if="localPrefix">
        <li
          v-for="(m, index) in userMenu"
          :key="index"
          :class="[
            m.menuInfo.P_IS_TOP === '1'
              ? 'nav-label mg-t-15'
              : m.menuInfo.P_MENU_SUBLEVEL === '1'
              ? 'nav-item'
              : '',
            currentPath === m.menuInfo.P_LINK &&
            m.menuInfo.P_MENU_SUBLEVEL === '1'
              ? 'active'
              : '',
            m.menuInfo.P_HAVE_CHILD === '1' ? 'with-sub' : '',
            currentPath.search(m.menuInfo.P_LINK) !== -1 &&
            m.menuInfo.P_MENU_SUBLEVEL === '1' &&
            m.menuInfo.P_HAVE_CHILD === '1'
              ? 'active show'
              : '',
          ]"
        >
          <span v-if="m.menuInfo.P_IS_TOP === '1'">{{
            m.menuInfo.P_MENU_ID
          }}</span>
          <router-link
            v-if="
              m.menuInfo.P_IS_TOP === '0' && m.menuInfo.P_MENU_SUBLEVEL === '1'
            "
            :to="m.menuInfo.P_LINK"
            class="nav-link"
            @click="currentPath = m.menuInfo.P_LINK"
            ><vue-feather :type="m.menuInfo.P_MENU_ICON"></vue-feather>
            <span>{{ m.menuInfo.P_MENU_NAME }}</span>
          </router-link>
          <ul v-if="m.menuInfo.P_HAVE_CHILD === '1'">
            <li
              v-for="(m2, index2) in m.menuChild"
              :key="index2"
              :class="[currentPath === m2.P_LINK ? 'active' : '']"
            >
              <router-link :to="m2.P_LINK" @click="currentPath = m2.P_LINK">
                {{ m2.P_MENU_NAME }}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
      <ul class="nav nav-aside">
        <li class="nav-label mg-t-15">User Interface</li>
        <li class="nav-item">
          <a href="#" @click="handleLogout" class="nav-link"
            ><vue-feather type="lock"></vue-feather> <span>ออกจากระบบ</span>
          </a>
        </li>

        <li class="nav-label mg-t-15">VERSION {{ version }}</li>
      </ul>
    </div>
  </aside>
</template>
<script>
import { version } from "../../package";
import AuthService from "../services/authen";
import feather from "feather-icons";

const icons = Object.keys(feather.icons);
export default {
  data() {
    return {
      icons,
      version,
      displayUser: null,
      displayUserChar: "",
      userInfo: null,
      userMenu: null,
      localPrefix: "",
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.authen.user;
    },
    loggedIn() {
      return this.$store.state.authen.status.loggedIn;
    },
    currentPath() {
      console.log(this.$route.path);
      return this.$route.path;
    },
    prefix() {
      return this.$store.state.prefix;
    },
  },
  created() {},
  mounted() {
    this.getUserInfo();
    this.getUserMenu();
    this.localPrefix = this.prefix;
  },
  methods: {
    resetPrefix() {
      this.localPrefix = null;
      this.$store.dispatch("setPrefix", null);
      this.$store.dispatch("clearPrefix");
    },
    handleLogout() {
      this.$store.dispatch("authen/doLogout").then(() => {
        this.$router.push("/login");
      });
    },
    getUserInfo() {
      AuthService.getUserInfo(this.currentUser).then((data) => {
        this.displayUser = data.userInfo.U_ENNAME;
        this.displayUserChar = data.userInfo.U_ENNAME.substr(
          0,
          1
        ).toUpperCase();
        this.displayUser = this.displayUser
          .toLowerCase()
          .replace(/\b[a-z]/g, function (letter) {
            return letter.toUpperCase();
          });
      });
    },
    getUserMenu() {
      AuthService.getUserMenu(this.prefix, this.currentUser).then((data) => {
        console.log(data);
        if (data.isSuccess === 1) {
          this.userMenu = data.menuData;
        }
      });
    },
  },
};
</script>
<style scoped>
.nav-label {
  color: #97a3b9;
}
</style>

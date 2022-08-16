<template>
  <div>
    <loading
      v-model:active="isLoading"
      :is-full-page="fullPage"
      color="#2baf2b"
      background-color="#000"
    ></loading>

    <div>
      <div class="">
        <div class="">
          <h4 class="">ยินดีต้อนรับ</h4>
          <hr />
          <label
            class="d-block tx-medium tx-uppercase tx-spacing-1 tx-color-03 mg-b-15"
            >เลือกแคมเปญที่ต้องการดำเนินการ</label
          >
          <div class="row row-xs">
            <div
              class="col-12 col-lg-4 col-xl-3 col-md-6"
              v-for="(c, index) in listCampaign"
              :key="index"
            >
              <div
                class="card card-event cursor-hand mg-t-10"
                @click="setPrefix(c.C_PREFIX, c.C_INDEX)"
              >
                <div class="card-body p-0 tx-13">
                  <img :src="c.C_PIC" class="card-img-top" alt="" />
                  <div class="pd-20">
                    <span class="tx-12 mg-b-0 tx-semibold tx-spacing-1">
                      {{ c.C_NAME }}
                    </span>
                    <div
                      class="tx-16 tx-medium tx-uppercase tx-spacing-1 tx-color-03"
                    >
                      {{ c.C_DESC }}
                    </div>
                  </div>
                </div>
                <!-- card-body -->
                <div class="card-footer tx-13 bg-dark">
                  <span class="tx-white"
                    >{{ c.C_DATE_START }} - {{ c.C_DATE_END }}
                  </span>
                </div>
                <!-- card-footer -->
              </div>
              <!-- card -->
            </div>
            <!-- col -->
          </div>
          <!-- row -->
        </div>
      </div>
      <!-- row -->
    </div>
  </div>
</template>
<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { useToast } from "vue-toastification";
import Connector from "../services/connector";
import feather from "feather-icons";
const icons = Object.keys(feather.icons);

export default {
  data() {
    return {
      icons,
      isLoading: false,
      fullPage: true,
      listCampaign: null,
    };
  },
  service: null,
  components: {
    Loading,
  },
  setup() {
    // Get toast interface
    const toast = useToast();
    // Make it available inside methods
    return { toast };
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
    prefix() {
      return this.$store.state.prefix;
    },
  },
  created() {
    this.service = new Connector();
    this.setPrefix(null);
  },
  mounted() {
    this.isLoading = true;
    this.service.getListCampaign(this.currentUser).then((data) => {
      localStorage.removeItem("prefix");
      this.listCampaign = data.listCampaign;
      setTimeout(() => {
        this.isLoading = false;
      }, 300);
    });
  },
  methods: {
    setPrefix(p, r) {
      if (p) {
        this.$store.dispatch("setPrefix", p.toLowerCase());
        // this.$router.push(r);
        window.location.replace(r);
      } else {
        this.$store.dispatch("setPrefix", null);
      }
    },
  },
};
</script>

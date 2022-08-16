<template>
  <div class="login-wrapper">
    <div class="container">
      <div class="row">
        <div class="col-xl-4 col-lg-6 col-md-8 mx-auto">
          <div class="wd-100p mt-5">
            <div class="card rounded">
              <div class="card-body pd-30">
                <h2 class="text-primary">ยินดีต้อนรับ</h2>
                <h5>กรุณาล็อคอินเพื่อเข้าใช้งานระบบ</h5>
                <form id="form-login" @submit="handleLogin">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="inputLoginUser"
                      class="form-control"
                      placeholder="ชื่อผู้ใช้/รหัสพนักงาน"
                    />
                    <!-- <div class="invalid-feedback">กรุณากรอกชื่อผู้ใข้</div> -->
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      v-model="inputLoginPassword"
                      class="form-control"
                      placeholder="รหัสผ่าน"
                    />
                    <!-- <div class="invalid-feedback">กรุณากรอกรหัสผ่าน</div> -->
                  </div>

                  <button type="submit" class="btn btn-brand-02 btn-block">
                    เข้าสู่ระบบ
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <!-- sign-wrapper -->
      </div>
      <!-- media -->
    </div>
    <!-- container -->
  </div>
  <footer class="footer">
    <div>
      <span>LINE+</span>
    </div>
    <div>เวอร์ชั่น {{ version }}</div>
  </footer>
</template>
<script>
import { version } from "../../../package";
import { useToast } from "vue-toastification";
export default {
  data() {
    return {
      version,
      message: false,
      inputLoginUser: "",
      inputLoginPassword: "",
    };
  },
  setup() {
    // Get toast interface
    const toast = useToast();

    // Make it available inside methods
    return { toast };
  },
  computed: {
    loggedIn() {
      return this.$store.state.authen.status.loggedIn;
    },

    getReturnUrl() {
      return this.$store.state.returnUrl;
    },
  },
  created() {
    this.loading = false;
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    handleLogin(e) {
      e.preventDefault();
      let isError = false;
      // let txtError = "";
      if (this.inputLoginUser === null || this.inputLoginUser === "") {
        isError = true;
      }
      if (this.inputLoginPassword === null || this.inputLoginPassword === "") {
        isError = true;
      }
      if (!isError) {
        this.loading = true;
        let user = {
          username: this.inputLoginUser,
          password: this.inputLoginPassword,
        };
        let returnUrl = this.getReturnUrl;

        this.$store.dispatch("authen/doLogin", user).then(
          (data) => {
            console.log(data);
            if (data.isSuccess === 1) {
              if (!returnUrl) {
                returnUrl = "/";
              }

              window.location.replace(returnUrl);
            } else {
              this.toast.error("ชื่อผู้ใช้และรหัสผ่านไม่ถูกต้อง", {
                position: "top-right",
                timeout: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: "button",
                icon: false,
                rtl: false,
              });
            }
          },
          () => {
            this.loading = false;
          }
        );
      } else {
        this.toast.error("กรุณากรอกข้อมูลให้ครบถ้วน", {
          position: "top-right",
          timeout: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: "button",
          icon: false,
          rtl: false,
        });
      }
    },
  },
};
</script>
<style scoped>
h2 {
  margin: 0;
  margin-bottom: 5px;
  margin-top: 10px;
  text-align: left;
  font-weight: 700;
  letter-spacing: 0.5px;

  font-family: "Sukhumvit Set", sans-serif;
}
h5 {
  text-align: left;
  letter-spacing: 0.5px;
  margin-bottom: 40px;
  font-family: "Sukhumvit Set", sans-serif;
}
.login-wrapper {
  width: 100vw;
  height: 100vh;
  /*background: url(../../assets/images/smart-microchip-background-motherboard-closeup-technology-remix.jpg);
  background-size: cover;
  background-position: center;*/
  position: relative;
  align-items: center;
  display: flex;
  z-index: 1;
}
.login-wrapper:after {
  content: "";
  position: absolute;
  height: calc(100vh - 0px);
  min-height: calc(100vh - 0px);
  width: 100%;
  left: 0;
  top: 0;
  /*background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);*/
  z-index: -1;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}
.alert {
  font-size: 18px;
  font-weight: 700;
}
.form-group input {
  font-family: "Sukhumvit Set", sans-serif;
  padding: 0.85rem 1rem !important;
  font-size: 16px;
}
button {
  font-family: "Sukhumvit Set", sans-serif;
  padding: 0.75rem 1rem !important;
  font-weight: 700;
  font-size: 20px;
}
.col-md-8 {
  margin-top: -100px;
}
.footer {
  font-family: "Sukhumvit Set", sans-serif;
  z-index: 100;
  position: absolute;
  bottom: 0;
  font-size: 13px;
  width: 100vw;
  color: #eee;
  background: #253745;
}
.was-validated .form-control:valid,
.form-control.is-valid {
  background-image: none !important;
}
</style>

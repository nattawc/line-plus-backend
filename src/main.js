import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import VueTheMask from "vue-the-mask";
import VueSweetalert2 from "vue-sweetalert2";
import Toast from "vue-toastification";
import VueFeather from "vue-feather";

import Vue3Resize from "vue3-resize";
import "vue3-resize/dist/vue3-resize.css";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "bootstrap-icons/font/bootstrap-icons.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "./assets/vendors/font-SukhumvitSet/SukhumvitSet.css";
import "./assets/vendors/font-dbhelvethaicax/font-dbhelvethaicax.css";
import "vue-toastification/dist/index.css";
import "handsontable/dist/handsontable.full.css";
import "./assets/css/custom.css";

import { registerCellType, NumericCellType } from "handsontable/cellTypes";
import { registerPlugin, UndoRedo } from "handsontable/plugins";

registerCellType(NumericCellType);
registerPlugin(UndoRedo);

createApp(App)
  .use(store)
  .use(router)
  .use(Toast)
  .use(Vue3Resize)
  .use(VueTheMask)
  .use(VueSweetalert2)
  .component(VueFeather.name, VueFeather)
  .mount("#app");

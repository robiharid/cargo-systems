import Vue from "vue";
import Router from "vue-router";
import ShipTable from "@/components/ShipTable";
import ViewShip from "@/components/ViewShip";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "ShipTable",
      component: ShipTable
    },
    {
      path: "/ship/:id",
      name: "ViewShip",
      component: ViewShip
    }
  ]
});

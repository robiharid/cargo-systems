/* eslint-disable */
<template>
  <div class="main">
    <table class="table table-bordered table-hover" id="ship-container">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Owner</th>
          <th scope="col">Origin</th>
          <th scope="col">MaxTEU</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ship, key) in ships" v-bind:key="ship.id" @click="viewShip(ship)">
          <th scope="row">{{key+1}}</th>
          <td>{{ship.name}}</td>
          <td>{{ship.owner}}</td>
          <td>{{ship.origin}}</td>
          <td>{{ship.maxTEU}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// add axios
import axios from "axios";

export default {
  name: "ShipTable",
  data: () => ({
    ships: [],
    errors: []
  }),

  created() {
    // retrieve API endpoint, capture data
    axios
      .get("https://api.myjson.com/bins/o7ujv")
      .then(response => {
        this.ships = response.data.ships;
        this.calcOrigin();
      })
      .catch(e => {
        this.errors.push(e);
      });
  },
  methods: {
    calcOrigin() {
      // Map through each element in the ships array, regex to check if owner has valid (location),
      // then adds the owner property to the element ship in the ships array.
      this.ships = this.ships.map(ship => {
        let result = /\(([^)]+)\)/.exec(ship.owner);

        !result ? (ship.origin = "Unknown") : (ship.origin = result[1]);

        return ship;
      });
      
    },
    viewShip(ship) {
      this.$router.push("/ship/" + ship.id)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body {
  background: #f1f1f1;
}
#ship-container {
  background: white;
  width: 80%;
  margin: 0 auto 4px auto;
  margin-top: 1em;
  padding: 1em;
  box-shadow: 1px 1px 0 lightgrey;
}
span.left {
  font-weight: bold;
}
span.right {
  padding-left: 1.5em;
  float: right;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  list-style: none;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

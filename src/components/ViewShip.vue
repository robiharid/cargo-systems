/* eslint-disable */
<template>
  <div class="main">
    <div class="jumbotron">
      <router-link to="/">
        <button type="button" class="btn btn-outline-primary">Back</button>
      </router-link>
      <h1 class="display-6">{{this.currShip.name}}</h1>
      <p>
        <strong>country of origin</strong>
        <br>
        {{this.currShip.origin}}
        <br>
        <strong>built</strong>
        <br>
        {{this.currShip.built}}
        <br>
        <strong>name</strong>
        <br>
        {{this.currShip.name}}
        <br>
        <strong>length in meters</strong>
        <br>
        {{this.currShip.lengthMeters}}
        <br>
        <strong>beam meters</strong>
        <br>
        {{this.currShip.beamMeters}}
        <br>
        <strong>max teu</strong>
        <br>
        {{this.currShip.maxTEU}}
        <br>
        <strong>owner</strong>
        <br>
        {{this.currShip.owner}}
        <br>
        <strong>gross tonnage</strong>
        <br>
        {{this.currShip.grossTonnage}}
      </p>
    </div>
  </div>
</template>

<script>
// add axios
import axios from "axios";

export default {
  name: "ViewShip",
  data: () => ({
    currShip: {},
    errors: []
  }),

  created() {
    // retrieve API endpoint, capture data
    axios
      .get("https://api.myjson.com/bins/o7ujv")
      .then(response => {
        this.currShip = response.data.ships[this.$route.params.id - 1];
        console.log(this.currShip);
        this.calcOrigin();
      })
      .catch(e => {
        this.errors.push(e);
        console.log(e);
      });
  },
  methods: {
    calcOrigin() {
      // Calculate origin of ship based on regex
      let result = /\(([^)]+)\)/.exec(this.currShip.owner);

      !result
        ? (this.currShip.origin = "Unknown")
        : (this.currShip.origin = result[1]);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body {
  background: #f1f1f1;
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
  margin-bottom: 1.5em;
  text-align: center;
  font-weight: normal;
}
p {
  margin-left: 1em;
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

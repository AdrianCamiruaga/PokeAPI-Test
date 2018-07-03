import Vue from 'vue'
import axios from 'axios';

new Vue({
  el: '#app',
  data:{
        pokemones: ["Charizar", "Bulbasur", "Pikachu"],

  },
  mounted(){

        axios.get('https://pokeapi.co/api/v2/pokemon-form/').then(response =>
        {
          this.pokemones = response.data.results;
        });
  }
  
})

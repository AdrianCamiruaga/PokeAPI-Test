import Vue from 'vue'
import axios from 'axios';

new Vue({
  el: '#app',
  data:{
        pokemones: []
  },
  methods:{
    numRandom : function(){
      return Math.floor(Math.random() * (300 - 70) + 1);
    }
  },
  mounted(){
        //axios.get('https://pokeapi.co/api/v2/pokemon-form/').then(response =>

          let url = 'https://pokeapi.co/api/v2/pokemon-form/?limit=20&offset='+this.numRandom();
          axios.get(url).then(response =>
          {
            this.pokemones = response.data.results;
          });
        

  }
  
})

import Vue from 'vue'
import axios from 'axios';

new Vue({
  el: '#app',
  data:{
        pokemones: [],
        infoPokemon: [],
        srcImg: '',
        nombrePokemon: '',
        habilidadesPokemon: '',
        estadisticasPokemon: '',
        pesoPokemon: '',
        alturaPokemon: '',
        tipoPokemon: '',
        experienciaBase: '',
        cuadroInfoPokemon: false
  },
  methods:{
    numRandom : function()
    {
      return Math.floor(Math.random() * (300 - 1) + 1);
    },
    clickInfoPokemon: function(event)
    {
      let url = 'https://pokeapi.co/api/v2/pokemon-form/'+event.toElement.innerText.trim();
      axios.get(url).then(response =>
      {
        this.srcImg = response.data.sprites.front_default;
        this.infoPokemon = response.data;
        this.nombrePokemon = "<h3>"+this.infoPokemon.name+"</h3>";
        //console.log(response.data);
      });
      this.cuadroInfoPokemon = true;
    }
  },
  mounted(){
          let url = 'https://pokeapi.co/api/v2/pokemon-form/?limit=20&offset='+this.numRandom();
          axios.get(url).then(response =>
          {
            //console.log(response.status); 
            this.pokemones = response.data.results;
          });
  }
})

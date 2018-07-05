import Vue from 'vue'
import axios from 'axios';


new Vue({
  el: '#app',
  data:{
        pokemones: [],
        srcImg: '',
        nombrePokemon: '',
        habilidadesPokemon: '',
        estadisticasPokemon: '',
        pesoPokemon: '',
        alturaPokemon: '',
        tipoPokemon: '',
        experienciaBasePokemon: '',
        cuadroInfoPokemon: false,
        pokemonesFavoritosList: []
  },
  methods:{
    numRandom : function()
    {
      return Math.floor(Math.random() * (300 - 1) + 1);
    },
    clickInfoPokemon: function(event)
    {
      this.limpiarAtributos();
      let url = "";
      if (typeof(event.toElement.value) == "number")
      {
        url = 'https://pokeapi.co/api/v2/pokemon-form/'+event.toElement.innerText.trim();
      }
      else{
        url = 'https://pokeapi.co/api/v2/pokemon-form/'+event.toElement.value.trim();
      }
      //console.log(event.toElement.value, url);
      
      axios.get(url).then(response =>
      {        
        this.srcImg = response.data.sprites.front_default;
        this.nombrePokemon = "<h3>"+response.data.name+"</h3>";
      });

      if(event.toElement.value == 0)
      {
        url = 'https://pokeapi.co/api/v2/pokemon/'+event.toElement.innerText.trim();
      }
      else{
        url = 'https://pokeapi.co/api/v2/pokemon/'+event.toElement.value.trim();
      }

      axios.get(url).then(response =>
      {
        this.experienciaBasePokemon = response.data.base_experience;
        this.tipoPokemon = response.data.types[0].type.name;
        this.pesoPokemon = response.data.weight/10;
        this.alturaPokemon = response.data.height/10;
        
        
        //Se obtiene las abilidades del pokemon seleccionado
        for(let i=0; i< response.data.abilities.length; i++)
        {
          this.habilidadesPokemon += response.data.abilities[i].ability.name;
          if( i == response.data.abilities.length-1 )
          {
            this.habilidadesPokemon +="."
          }
          else{
            this.habilidadesPokemon +=", "
          }
        }
        //Se obtienen las estadisticas del pokemon seleccionado
        for(let i=0; i< response.data.stats.length; i++)
        {
          this.estadisticasPokemon += response.data.stats[i].stat.name;
          if( i == response.data.stats.length-1 )
          {
            this.estadisticasPokemon +="."
          }
          else{
            this.estadisticasPokemon +=", "
          }
          
        }

      });
      this.cuadroInfoPokemon = true;
    },
    limpiarAtributos: function()
    {
      this.habilidadesPokemon = "";
      this.estadisticasPokemon = "";
      this.experienciaBase = "";
    }
  },
  computed: 
  {
    numeroFavoritos: function() {
      localStorage.setItem("pokemonesFavoritosList", this.pokemonesFavoritosList);
      return this.pokemonesFavoritosList.length;
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

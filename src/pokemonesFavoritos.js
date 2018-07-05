import Vue from 'vue';
import axios from 'axios';

new Vue({
    el: '#app',
    data:{
        pokemonesFavoritosList: [],
        cuadroInfoPokemon: false,
        nombrePokemon: '',
        srcImg: '',
        pesoPokemon: '',
        alturaPokemon: '',
        tipoPokemon: '',
        experienciaBasePokemon: '',
        habilidadesPokemon: '',
        estadisticasPokemon: ''
    },
    methods: {
        limpiarAtributos: function()
        {
          this.habilidadesPokemon = "";
          this.estadisticasPokemon = "";
          this.experienciaBase = "";
        },
        getInformacionPokemon: function()
        {
            this.limpiarAtributos();
            let url = "";

            url = 'https://pokeapi.co/api/v2/pokemon-form/'+this.pokemonesFavoritosList[0].trim();
            
            axios.get(url).then(response =>
            {        
              this.srcImg = response.data.sprites.front_default;
              this.nombrePokemon = "<h3>"+response.data.name+"</h3>";
            });
      
            url = 'https://pokeapi.co/api/v2/pokemon/'+this.pokemonesFavoritosList[0].trim();
      
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
        }
    },
    mounted()
    {
        if (typeof(Storage) !== "undefined")
        {
            this.pokemonesFavoritosList = localStorage.getItem("pokemonesFavoritosList");
            this.pokemonesFavoritosList = this.pokemonesFavoritosList.split(",");
        }
        if(this.pokemonesFavoritosList[0] != "")
        {
            cuadroInfoPokemon = true;
        }

        this.getInformacionPokemon();
        //console.log(this.pokemonesFavoritosList);
        
    }
});
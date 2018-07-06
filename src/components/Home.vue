<template>
    <div>
        <br>
        <h1 align="center">Lista Pokémones</h1>
        <div class="row" >
            <div class="col-md-6 randomList">
                <br><br><br>
                <h6 align="center">
                    Chequea tus pokemones favoritos o da click para ver más información.
                </h6>
                <ul class="list-group" v-for="pokemon in pokemones" :key="pokemon.id">
                    <a href="#" style="text-decoration: none; color:black" v-on:click="clickInfoPokemon">
                        <li class="list-group-item"> 
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <input type="checkbox" class="form-check-input" name="fav" :value="pokemon.name" v-model="pokemonesFavoritosList">
                            {{ pokemon.name }}
                        </li>
                    </a>
                </ul>
            </div>
            <!-- <div class="col-md-1" ></div> -->
            <div class="login-card" v-if="cuadroInfoPokemon" style="margin:0 auto 25px; ">
                <span align="center" v-html="nombrePokemon"></span>
                <img class="imgPokemon profile-img-card" align="center" :src="srcImg" alt="">
          
                <p> <strong>Peso:</strong> <i>            {{ pesoPokemon }} kg  </i> </p>
                <p> <strong>Altura:</strong> <i>          {{ alturaPokemon }} m </i> </p>
                <p> <strong>Tipo:</strong> <i>            {{ tipoPokemon }}  </i> </p>
                <p> <strong>Experiencia Base:</strong> <i>{{ experienciaBasePokemon }}  </i> </p>
                <p> <strong>Habilidades:</strong> <i>     {{ habilidadesPokemon }} </i> </p>
                <p> <strong>Estadisticas:</strong> <i>    {{ estadisticasPokemon }} </i> </p>
            </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return{
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
        }
    },
    methods:
    {
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
            //console.log( this.pokemonesFavoritosList );
        },
        limpiarAtributos: function()
        {
            this.habilidadesPokemon = "";
            this.estadisticasPokemon = "";
            this.experienciaBase = "";
        }
    },
    created(){
        localStorage.setItem("pokemonesFavoritosList", []);
    },
    mounted(){
        let url = 'https://pokeapi.co/api/v2/pokemon-form/?limit=20&offset='+this.numRandom();
        axios.get(url).then(response =>
        {         
            //console.log(response.status); 
            this.pokemones = response.data.results;
        });
    },
    destroyed(){
        localStorage.setItem("pokemonesFavoritosList", this.pokemonesFavoritosList);  
    },
}
</script>

<style>
.randomList{
    padding-left: 40px;
    padding-right: 30px;
    padding-bottom: 30px;

}
.imgPokemon{
    width: 150px;
    height: 150px;
}
.login-card{
    width: 370px;
    height: 500px;
    padding:20px 20px;
    background-color:#F7F7F7;
    /* margin:0 auto 25px; */
    border-radius:2px;
    box-shadow:0px 2px 2px rgba(0, 0, 0, 0.3);
  }
  
  .login-card .profile-img-card{
    margin:0 auto 10px;
    display:block;
    border-radius:50%;
  }
  

</style>


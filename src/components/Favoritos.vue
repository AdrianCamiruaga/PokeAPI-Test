<template>
    <div>
        <br>
        <h1 align="center">Pokémones favoritos</h1> 
        <div class="login-card" v-if="cuadroInfoPokemon" style="margin:20px;"><!-- cambiar por la variable-->
            <br><br>
            <span align="center" v-html="nombrePokemon"></span>
            <img class="imgPokemon profile-img-card" :src="srcImg" alt="">
          
            <p> <strong>Peso:</strong> <i>            {{ pesoPokemon }} kg  </i> </p>
            <p> <strong>Altura:</strong> <i>          {{ alturaPokemon }} m </i> </p>
            <p> <strong>Tipo:</strong> <i>            {{ tipoPokemon }}  </i> </p>
            <p> <strong>Experiencia Base:</strong> <i>{{ experienciaBasePokemon }}  </i> </p>
            <p> <strong>Habilidades:</strong> <i>     {{ habilidadesPokemon }} </i> </p>
            <p> <strong>Estadisticas:</strong> <i>    {{ estadisticasPokemon }} </i> </p>
        </div>
        <div v-else>
            <h1 align="center">No seleccionaste ningun pokemon como favorito!</h1> 
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default
    {
        data()
        {
            return {
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
            }
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
                let url = 'https://pokeapi.co/api/v2/pokemon-form/'+this.pokemonesFavoritosList[0].trim();
            
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
                this.cuadroInfoPokemon = true;
                this.getInformacionPokemon();
            }
        }
    }
</script>

<style>
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

<template>
    <div>
        <br>
        <h1 align="center">Pokémones favoritos</h1> 
        <div class="row" style="padding-left: 80px;" >
            <div class="col-md-3 login-card" v-if="cuadroInfoPokemon" v-for="pokemon in pokemones" :key="pokemon.nombre" style="margin:20px;height: 280px;"><!-- cambiar por la variable-->
                <br>
                <span align="center" v-html="pokemon.nombre"></span>
                <img class="imgPokemon profile-img-card" :src="pokemon.imagen" alt="">
                
            </div>
            <div v-else>
                <h1 align="center">No seleccionaste ningun pokemon como favorito!</h1> 
            </div>
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

                pokemones: []
            }
        },
        methods: {
            getInformacionPokemon: function()
            {
                for(let i=0; i<this.pokemonesFavoritosList.length; i++ )
                {
                    let url = 'https://pokeapi.co/api/v2/pokemon-form/'+this.pokemonesFavoritosList[i].trim();
                
                    axios.get(url).then(response =>
                    {
                        this.srcImg = response.data.sprites.front_default;
                        this.nombrePokemon = "<h3>"+response.data.name+"</h3>";
                        this.pokemones.push({nombre: this.nombrePokemon, imagen: this.srcImg});
                    });
                }
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
                this.getInformacionPokemon();
                this.cuadroInfoPokemon = true;
            }
            else{
                this.cuadroInfoPokemon = false;
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
    width: 300px;
    height: 280px;
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

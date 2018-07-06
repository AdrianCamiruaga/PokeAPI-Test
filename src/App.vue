<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">

      <!--<a class="navbar-brand" href="./">PokemonApp</a>-->
      <router-link class="navbar-brand" to="./">PokemonApp</router-link>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText" style="padding-left: 800px">
        <ul class="navbar-nav mr-auto"></ul>
        <span class="navbar-brand" >

          <!--<a class="nav-link" style="color:black" href="./pokemonesFavoritos.html">Favoritos <span class="sr-only">(current)</span></a>-->
          <router-link class="nav-link" style="color:black" to="/favoritos">Favoritos <span class="sr-only">(current)</span></router-link>

        </span>
      </div>
    </nav>

    <router-view></router-view> <!--Por defecto mostrara el componente Home-->
    <!--<Home/>-->
  </div>
</template>

<script>
  import Home from './components/Home.vue';
  export default {
    name: 'app',
    data(){
        return{
        }
    },
    components: 
    {
      Home
    },
    mounted()
    {

    }
  }
</script>

<style>

</style>

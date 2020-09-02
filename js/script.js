var pokemonRepository = (function () 
{
    var pokemonList = [];
    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function showModal(pokemage, pokename, pokeheight) {
        console.log("show");
    }

    function showDetails(pokemon) {
        loadDetails(pokemon)
        // loadDetails(pokemon).then(function () {
        //     showModal(pokemon.imageUrl, pokemon.name, pokemon.height)
        // })
    }
    
    function listener (button, pokemon) {
        button.on('click', function () {
            showDetails(pokemon);
        });
    }
    function addListItem(pokemon) {
        var button = $('<button>').text(pokemon.name)
        var listItem = $('<li>').append(button)
        var poke = $('.pokemon-list').append(listItem)
        listener(button, pokemon)
    }
    function getAll() {
        return pokemonList;
    };
    function add(pokemon) {
        pokemonList.push(pokemon);

    };
    function loadList() {
        return $.ajax(apiUrl, { dataType: 'json'}).then(function (response) {
            // hideLoadingMessage()
            $.each(response.results, function( index, pokemon) {
                addListItem(pokemon);
            });
        }).catch(function () {
            // hideLoadingMessage
            console.error("error");
        });
    }

    function loadDetails(item) {
         var url = item.detailsUrl;
        return $.ajax(url, { dataType: 'json'}).then(function (details) {
         item.imageUrl = details.sprites.front_default;
         item.height = details.height;
         item.types = details.types;
        }).catch(function () {
          console.error("error");
        });
      }
    return {
        loadList: loadList,
        getAll: getAll,
        addListItem: addListItem
    };
})();




pokemonRepository.loadList().then(function() {
    // $(pokemonRepository.getAll).each(function(pokemon) {
    //     pokemonRepository.addListItem(pokemon);
    //     console.log("passing")
    // });
});
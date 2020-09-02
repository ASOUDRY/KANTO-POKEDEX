var pokemonRepository = (function () 
{
    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function showModal(pokmage, pokename, pokeheight) {
     
      var closeButton = $('<button class="modal-close">Close</button>').on('click', hideModal)
      var img = $('<img id="pokemage">').attr('src', pokmage);
      var name = $('<h1>').text(pokename);
      var height = $('<p>').text(pokeheight);
      var modal = $('<div class="modal">').append(img).append(name).append(height).append(closeButton)
      $('#modal-container').text('').append(modal);
    }

    function hideModal() {
        var modalContainer = $('#modal-container').removeClass('is-visible');
        console.log("please close");
    }
    
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            var modalContainer = $('#modal-container').addClass('is-visible');
            showModal(pokemon.image, pokemon.name, pokemon.height)
        })
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
         var url = item.url;
        return $.ajax(url, { dataType: 'json'}).then(function (details) {
         item.image = details.sprites.front_default;
         item.height = details.height;
         item.types = details.types;
        }).catch(function () {
          console.error("error");
        });
      }
    return {
        loadList: loadList,
    };
})();

pokemonRepository.loadList()
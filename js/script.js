var pokemonRepository = (function () 
{
    var pokemonList = [];
    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function addListItem(pokemon) {
        var button = $('<button>pokemon.name)</button>')
        var listItem = $('<li>').append(button)
        var poke = $('.pokemon-list').append(listItem)
    }
    function getAll() {
        return pokemonList;
    };
    function add(pokemon) {
        pokemonList.push(pokemon);

    };
    function loadList() {
        // showLoadingMessage()
        return $.ajax(apiUrl, { dataType: 'json'}).then(function (response) { // I've returned the response on this line
            // hideLoadingMessage()
            $(response).each(function (item) {
                var pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                }
                add(pokemon)
            }) 
        }).catch(function () {
            // hideLoadingMessage
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
    $(pokemonRepository.getAll).each(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
        console.log("passing")
    });
});
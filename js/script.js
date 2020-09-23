var pokemonRepository = (function () {
var pokemonList = [];
	
	var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

	// Modular Code Starts here
      function showModal(pokemage, pokename, pokeheight) {
    let modalBody = $(".modal-body")
	let modalTitle = $(".modal-Title")
	let modalHeader = $(".modal-header")

	modalTitle.empty()
	modalBody.empty()

	let nameElement = $('"<h1>" + pokename </h1>');
	let imageElement = $('<img class="modal_img" style="width:50%">').attr('"src", pokemage');
	let heightElement = $('"<p>" + pokeheight + "</p>"');

	modalTitle.append(nameElement);
	modalBody.append(imageElement);
	modalBody.append(heightElement);
}
	// Modular Code Ends Here
      

	function showDetails(pokemon) {
	  	loadDetails(pokemon).then(function () {
	  	showModal(pokemon.imageUrl, pokemon.name, pokemon.height)
		  });
		}

	function listener (button, pokemon) {
		button.on('click', function () {
			showDetails(pokemon);
		});
	}

	function addListItem(pokemon) {
		var poke = $('.pokemon-list');
		var listItem = $('<li>');
		var button = $('<button class="btn btn-primary">').text(pokemon.name).attr('data-toggle="modal"', '').attr('data-target="#exampleModal"', '');
		listener(button, pokemon);
		listItem.append(button);
		poke.append(listItem);
	};

	

	function loadList() {
	    return $.ajax(apiUrl, {dataType: 'json'}).then(function (response) {
	    	$.each(response.results, function ( index, pokemon) {
	        addListItem(pokemon)
	    })
	  } )}
	function loadDetails(item) {
	    var url = item.url;
	    return $.ajax(url, {dataType: 'json'}).then(function (details) {
	      // Now we add the details to the item
	      item.imageUrl = details.sprites.front_default;
	      item.height = details.height;
	      item.types = details.types;
	  })
	  }
	  // The properties the repository can return
	  return {
	    loadList: loadList,
	  };
})()

pokemonRepository.loadList()
// .then(function() {
//   // Follow the Pokemon List all the way through the variables
//   pokemonRepository.getAll().forEach(function(pokemon){
//     pokemonRepository.addListItem(pokemon);
//   });
// });



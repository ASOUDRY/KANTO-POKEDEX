var pokemonRepository = (function () {
var pokemonList = [];
	
	var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

	// Modular Code Starts here
      function showModal(pokemage, pokename, pokeheight) {
	  var modalContainer = $('#modal-container');

	  modalContainer.innerHTML = '';

	  var modal = $('<div class="modal">');

  	  var closeButtonElement = $('<button class="modal-close">').text("Close").on('click', hideModal);

      // Create the three Elements
      var img = $('<img id="entry">').attr('src', pokemage);

	  var name = $('<h1>').text(pokename);
  	  

	  var height = $('<p>').text(pokeheight);
	  
      // actually attaching the code to a button
      modal.append(img);
      modal.append(closeButtonElement);
	  modal.append(name);
  	  modal.append(height);
      modalContainer.append(modal);

	  modalContainer.addClass('is-visible');
	}

	function hideModal() {
    var modalContainer = $('#modal-container');
    modalContainer.removeClass('is-visible');
    }
    // e key is escape key

	$(window).on('keydown', (e) => {
	  var modalContainer = $('#modal-container');
	  if (e.key === 'Escape' && modalContainer.hasClass('is-visible')) {
	    hideModal();  
	  }
      modalContainer.on('click', (e) => {
		  // Since this is also triggered when clicking INSIDE the modal
		  // We only want to close if the user clicks directly on the overlay
		  var target = e.target;
		  if (target === modalContainer) {
		    hideModal();
		  }
		});
	});

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
		var button = $('<button>').text(pokemon.name);
		listener(button, pokemon);
		listItem.append(button);
		poke.append(listItem);
	};

	// function getAll() {
	// 		return pokemonList;
	// 	};

	// function add(pokemon) {
	// 		pokemonList.push(pokemon);	
	// 	};

	function showLoadingMessage() {
          console.log("Booting up the Pokedex");
	}
    // clears the console
	function hideLoadingMessage() {
		console.clear();
	}

	function loadList() {
		showLoadingMessage()
	    return $.ajax(apiUrl, {dataType: 'json'}).then(function (response) {
	    	hideLoadingMessage()
	    	$.each(response.results, function ( index, pokemon) {
	        addListItem(pokemon)
	    }).catch(() => {
	    	console.error("error")
	    })
	  } )}
	function loadDetails(item) {
		showLoadingMessage()
	    var url = item.url;
	    return $.ajax(url, {dataType: 'json'}).then(function (details) {
	    	hideLoadingMessage()
	      // Now we add the details to the item
	      item.imageUrl = details.sprites.front_default;
	      item.height = details.height;
	      item.types = details.types;
	  }).catch(() => {
	  	console.error("error")
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
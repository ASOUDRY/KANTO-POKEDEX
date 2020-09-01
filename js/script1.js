var pokemonRepository = (function () {
	var pokemonList = $([]);
		var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
			function showModal(pokemage, pokename, pokeheight) 
				{
					var closeButtonElement = $('<button class="modal-close">').innerText('Close').on('click', hideModal);
					var img = $('<img>').src(pokemage);
					var name = $('<h1>pokename</h1>');
					var height = $('<h1>pokeheight</h1>');
					var modal = $('<div class="modal"></div>').appendChild(img).appendChild(name).appendChild(height);
					var modalContainer = $('<button class="#modal-container">').appendChild(modal).addClass('is-visible');
				}
			function hideModal() 
				{
					var modalContainer = $('#modal-close').removeClass('is-visible');
				}
				// wierd code bit here
				$(window).on('keydown', (e) =>    
				{
					var modalContainer = $('#modal-close');
					if (e.key === 'Escape' && modalContainer.contains('is-visible')) 
					{
						hideModal()
					}
					modalContainer.on('click', (e) => {
						var target = e.target;
						if (target === modalContainer) 
						{
							hideModal()
						}
					})
				})
			function showDetails(pokemon) 
				{
		  			loadDetails(pokemon).then(function () 
		  			{
		  				showModal(pokemon.imageUrl, pokemon.name, pokemon.height)
			  		});
				}
			function listener (button, pokemon) 
				{
					button.addEventListener('click', function () 
					{
						showDetails(pokemon);
					});
				}
			function addListItem(pokemon) 
				{
					var button = $('<button>').innerText(pokemon.name);
					var listItem = $('<li>').appendChild(button);
					var poke = $('.pokemon-list').appendChild(listItem);
					listener(button, pokemon);
				}; 
			function getAll() 
				{
					return pokemonList;
				};
			function add(pokemon) 
				{
					pokemonList.push(pokemon);	
				};

			function showLoadingMessage() 
				{
			         console.log("Booting up the Pokedex");
				}
		    // clears the console
			function hideLoadingMessage() 
				{
					console.clear();
				}
            // doublecheck code if its not functioning
			function loadList() 
			{
				showLoadingMessage()
			    $.ajax(apiUrl, { dataType: 'json'}).then(function (responseJSON) {
			    	hideLoadingMessage()
			    }).then(function (json) {
			      responseJSON.each(function (item) {
			        var pokemon = {
			          name: item.name,
			          detailsUrl: item.url
			        };
			        add(pokemon);
			      });
			    }).catch(function () {
			    	hideLoadingMessage()
			      console.error("error");
			    })
	        }
	        function loadDetails(item) 
	        {
				showLoadingMessage()
			    var url = item.detailsUrl;
			    return $ajax(url, { dataType: 'json'}).then(function (responseJSON) 
			    {
			    	hideLoadingMessage()
			    }).then(function (details) 
			    {
				     item.imageUrl = details.sprites.front_default;
				     item.height = details.height;
				     item.types = details.types;
			    }).catch(function (e)
			    {
				     hideLoadingMessage()
				     console.error(e);
			    });
	  		}
	  		// The properties the repository can return
	  		return 
	  		{
	  			loadList: loadList
			    // add: add,
			    // // getAll: getAll,
			    // loadList: loadList,
			    // loadDetails: loadDetails,
			    // addListItem: addListItem
			};
})()

pokemonRepository.loadList().then(function() 
{

  // // ech is the the JQuery equivalent of forEach
  pokemonRepository.each(function(pokemon)
  {
   	pokemonRepository.addListItem(pokemon);
  });
});


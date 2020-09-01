var pokemonRepository = (function () 
{
	var pokemonList = $([]);
		var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
			function loadList() 
			{
				// showLoadingMessage()
			    $.ajax(apiUrl, { dataType: 'json'}).then(function (responseJSON) 
			    {
				      responseJSON.each(function (item) 
				      {
					       var pokemon = 
					       {
					         name: item.name,
					         detailsUrl: item.url
					       };
				      })
				 }).catch(function () 
				    {
				      console.error("error");
				    })
		  		return 
		  		{
		  			loadList: loadList
				};
            }
})()
pokemonRepository.loadList().then(function() {
	console.log("LoadList was read");
});
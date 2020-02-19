function on_load() {
	var pokemon_code = "WyJSYXRpY2F0ZS0yMzEzIiwiU3BlYXJvdy1BNDYyIiwiWnViYXQtODRBMCIsIkdsb29tLTAwNjAiLCJQYXJhc2VjdC00MDUzIiwiS2FrdW5hLTYyNjMiLCJXZWVkbGUtNDhCMCIsIkNsZWZhYmxlLTI3NjEiLCJEaWdsZXR0LUMyMDciLCJFbGVjdHJvZGUtMkFGMyIsIkdyb3dsaXRoZS0yMUIwIiwiUG9saXdhZy02MUY3IiwiUmFwaWRhc2gtODQ4MiIsIkNoYW5zZXktQUE4MCIsIlRlbnRhY29vbC1BRTE2IiwiRWV2ZWUtMjIyMyJd";
	pokemon_code = atob(pokemon_code);
	pokemon_code = JSON.parse(pokemon_code);

	var pokemon_all = {}, pokemon, i;
	for( i = 0; i < pokemon_code.length; i++ ) {
		pokemon = pokemon_code[ i ].toLowerCase();
		pokemon = pokemon.split( "-" )[0];
		pokemon_all[ pokemon ] = {};
		pokemon_all[ pokemon ][ "div" ] = document.getElementById( pokemon.charAt( 0 ).toUpperCase() + pokemon.substring( 1 ) );
		pokemon_all[ pokemon ][ "code" ] = pokemon_code[ i ].toLowerCase();
	}

	var caught;
	if( localStorage.getItem( "caught" ) ) {
		caught = JSON.parse( localStorage.getItem( "caught" ) );
		i = caught.length;
		while( i-- ) pokemon_all[ caught[ i ] ][ "div" ].setAttribute( "class", caught[ i ].charAt( 0 ).toUpperCase() + caught[ i ].substring( 1 ) );
	} else {
		caught = [];
	}

	var catch_input = document.getElementById( "input-code" ),
		catch_button = document.getElementById( "button-code" ),
		catch_picture = document.getElementById( "catch-picture" ),
		catch_text = document.getElementById( "catch-text" );

	function on_click() {
		var text = catch_input.value.trim().toLowerCase();
		var name = text.split( "-" )[ 0 ];
		var properName, firstChar, joiner, pokemon_obj;
		if( pokemon_all.hasOwnProperty( name ) ) {
			pokemon_obj = pokemon_all[ name ];
			firstChar = name.charAt( 0 ).toUpperCase();
			if( firstChar == 'A' || firstChar == 'E' || firstChar == 'I' || firstChar == 'O' || firstChar == 'U' ) {
				joiner = "an";
			} else {
				joiner = "a";
			}
			properName = firstChar + name.substring( 1 );
			if( text == pokemon_obj[ "code" ] ) {
				catch_picture.setAttribute( "class", properName );
				if( caught.indexOf( name ) == -1 ) {
					catch_text.innerHTML = "You caught " + joiner + " " + properName + "!";
					pokemon_obj[ "div" ].setAttribute( "class", properName );
					caught.push( name );
					localStorage.setItem( "caught", JSON.stringify( caught ) );
				} else {
					catch_text.innerHTML = "You already caught this!";
				}
				return;
			}
		}
		catch_text.innerHTML = "Invalid code! Try again.";
		catch_picture.removeAttribute( "class" );
	}

	catch_button.addEventListener( "mouseup", on_click );
}

window.addEventListener( "load", on_load );
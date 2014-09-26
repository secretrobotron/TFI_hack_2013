


/* azza - 9/25 */

jQuery( document ).ready( function( $ ) {

console.log('jquery document is ready'); 

//this is just pulling the code as opposed to the actual link. 

	$( '<link/>', { rel: 'stylesheet', type: 'text/css', href: 'persistentmenu/style.css' } ).appendTo( 'head' );
	$( 'body' ).prepend( '<div class="persistentmenu"></div>' );




	$( '.persistentmenu' ).load( 'persistentmenu/html.html', function() {




		$( '.persistentmenu a, .persistentmenu input' ).click( function( e ) {

			e.stopPropagation();

		} );




		$( '.persistentmenu .menu-button.open' ).click( function() {

			$( this ).hide();
			$( '.persistentmenu .menu-button.close' ).show();

			$( '.persistentmenu .overlay' ).fadeIn( 200, function() {

				$( '.persistentmenu .site-navigation' ).show();

				$( 'body' ).css( 'overflow', 'hidden' );

			} );

		} );




		$( '.persistentmenu .menu-button.close, .persistentmenu .site-navigation' ).click( function( e ) {

			$( '.persistentmenu .menu-button.open' ).show();
			$( '.persistentmenu .menu-button.close' ).hide();
			$( '.persistentmenu .site-navigation' ).hide();
			$( '.persistentmenu .overlay' ).hide();

			$( 'body' ).css( 'overflow', 'auto' );

		} );




	} );




} );



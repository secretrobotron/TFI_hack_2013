//~ var siteNav, sectionNav;
//~ //~
//~ $(function(){
  //~ $('.site-navigation').hide();
//~
  //~ siteNav = $('.top-nav-menu');
  //~ siteNav.on('click', function(e){
    //~ e.preventDefault();
//~
    //~ // Change background image to X
    //~ // Fade in menu links
    //~ if (siteNav.hasClass('menu-open-button')){
      //~ siteNav.removeClass('menu-open-button');
      //~ siteNav.addClass('menu-close-button');
      //~ $('.overlay').addClass('overlay-shade')
      //~ $('.site-navigation').fadeIn();
    //~ } else if (siteNav.hasClass('menu-close-button')) {
      //~ siteNav.removeClass('menu-close-button');
      //~ siteNav.addClass('menu-open-button');
      //~ $('.overlay').removeClass('overlay-shade')
      //~ $('.site-navigation').fadeOut();
    //~ }
  //~ });
//~
  //~ // sectionNav = $('div.top-nav-current-slide');
  //~ // sectionNav.on('click', function(){
//~
  //~ //   alert('You clicked the sectionNav')
  //~ // });
//~ });
//~



/* azza - 9/25 */

jQuery( document ).ready( function( $ ) {




	$( '<link/>', { rel: 'stylesheet', type: 'text/css', href: 'http://lossur.es/short-docs/wp-content/themes/brooklyn/persistentmenu/style.css' } ).appendTo( 'head' );
	$( 'body' ).prepend( '<div class="persistentmenu"></div>' );




	$( '.persistentmenu' ).load( 'http://www.corsproxy.com/lossur.es/short-docs/wp-content/themes/brooklyn/persistentmenu/html.html', function() {




		$( '.persistentmenu a, .persistentmenu input' ).click( function( e ) {

			e.stopPropagation(); // prevent menu close on nav & email input box click

		} );




		$( '.persistentmenu .menu-button.open' ).click( function() {

			$( this ).hide();
			$( '.persistentmenu .menu-button.close' ).show();

			$( '.persistentmenu .overlay' ).fadeIn( 200, function() {

				$( '.persistentmenu .site-navigation' ).show();

				$( 'body' ).css( 'overflow', 'hidden' ); // hide main site's scrollbar

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


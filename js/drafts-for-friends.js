jQuery( document ).ready( function( $ ) {

	$('form.drafts-for-friends-extend').hide();

	// Setup the get request to be handled with AJAX.
	$( document ).on( 'click', '.delete-draft-link', function( e ) {

		// After the click, prevent it from taking us to another page.
		e.preventDefault();

		// Get the hash value, and the URL to submit.
		key = $(this).data( 'share' );
		url = $(this).attr( 'href' );

		// Hide the row.
		$('tr.' + key ).slideUp();

		// Send off the AJAX request.
		$.ajax({
			url: ajaxurl,
			data: url,
			type: 'GET',
			success: function( data ){
				$('.updated').html( '<p>' + data + '</p>' ).slideDown();
			}
		});

	});

	// Actions for what happens when the extend button is clicked.
	$( document ).on( 'click', '.drafts-for-friends-extend-button', function( e ) {

		// Prevent the click from doing anything
		e.preventDefault();

		// Hide the button
		$( this ).hide();

		// Get the key
		key = $( this ).data('key');

		// Display the form
		$( 'form[data-key=' + key + ']' ).show();

	});

	$( document ).on( 'click', '.drafts-for-friends-extend-cancel', function( e ) {

		// Prevent the click from loading anything.
		e.preventDefault();

		// Get the key to the form.
		key = $( this ).data('key');

		// Hide the form, and the bring the extend button back.
		$( 'form[data-key=' + key + ']' ).hide();
		$( '.drafts-for-friends-extend-button[data-key=' + key + ']' ).show();

	});

	$( document ).on( 'submit', '.drafts-for-friends-extend', function( e ) {

		// Prevent the button from sending the form.
		e.preventDefault();

		// Get the key to the form.
		key = $( this ).data('key');

		// Hide the form
		$( 'form[data-key=' + key + ']' ).hide();
		$( '.drafts-for-friends-extend-button[data-key=' + key + ']' ).show();

		// Get the time, and save it in case we need it...
		time = $( 'tr.' + key + ' td.time' ).html();

		// Clear the current time, and add a loading .gif
		$( 'tr.' + key + ' td.time' ).html( '<img src="' + drafts.loading_gif + '">' );

		// Grab all of the inputs
		var inputs = $( 'form[data-key=' + key + '] :input' );

		// Grab all of the form data.
		var form = {};
		inputs.each( function() {
			form[ this.name ] = $( this ).val();
		});

		// Send off the AJAX request.
		$.ajax({
			url: ajaxurl,
			data: form,
			type: 'POST',
			success: function( data ){
				return_obj = JSON.parse( data );
				if ( return_obj.time ) {
					$( 'tr.' + key + ' td.time' ).html( return_obj.time );
					$('.updated').html( '<p>' + return_obj.message + '</p>' ).slideDown();
				}
				if ( return_obj.error ) {
					$('.updated').addClass('error').html( return_obj.error ).slideDown().delay( 10000 ).slideUp();
					$( 'tr.' + key + ' td.time' ).html( time );
				}
			}
		});
	});

	$( '.drafts-for-friends-share' ).submit( function( e ) {

		// Prevent the button from sending the form.
		e.preventDefault();

		// Clear the current time, and add a loading .gif
		$( 'span.loading' ).html( '<img src="' + drafts.loading_gif + '">' );

		// Grab all of the inputs
		var inputs = $( '.drafts-for-friends-share :input' );

		// Grab all of the form data.
		var form = {};
		inputs.each( function() {
			form[ this.name ] = $( this ).val();
		});

		// Send off the AJAX request.
		$.ajax({
			url: ajaxurl,
			data: form,
			type: 'POST',
			success: function( data ) {
				$( 'span.loading' ).empty();
				$('.none-found').hide();
				$( '.widefat tr:last' ).after( data );
				$('.updated').html( '<p>' + drafts.added + '</p>' ).slideDown();
			}
		});
	});
});
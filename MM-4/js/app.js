( function() {
  var xhr = new XMLHttpRequest();
  xhr.open( 'GET', 'https://api.myjson.com/bins/pwtjl', true );
  xhr.send( null );
  xhr.onload = function() {
      if ( xhr.status === 200 ) {
          responseObject = JSON.parse( xhr.responseText );
          var newContent = '';
          var textContent = document.getElementById( 'content' );
          var computerData = responseObject.computer.map( function( computer ) {
              newContent += '<div class="computer">';
              newContent += '<img src=" ' + computer.image + '" ';
              newContent += '<alt=" ' + computer.title + '" ';
              newContent += '<h2>' + computer.title + ' </h2> ';
              newContent += '<p>' + computer.info + ' </p> ';
              newContent += '</div>';
              textContent.innerHTML = newContent;
          } );
      }
  }
} )();
( function() {
  function isInViewport( element ) {
      var rect = element.getBoundingClientRect();
      var html = document.documentElement;
      return ( rect.top >= 0 && rect.left >= 0 && rect.bottom <= ( window.innerHeight || html
          .clientHeight ) && rect.right <= ( window.innerWidth || html.clientWidth ) );
  }
  var handleObjectVisibility = function() {
      var cards = [];
      var cardsHolder = document.getElementsByClassName( 'accordion' )
      var forEach = function( array, callback, scope ) {
          for ( var i = 0; i < array.length; i++ ) {
              callback.call( scope, i, array[ i ] );
          }
      };
      forEach( cardsHolder, function( index, el ) {
          //console.log(index, el); 
          ( isInViewport( el ) ) ? el.style.opacity = 5: el.style.opacity = 0;
      } );
  };
  window.addEventListener( 'scroll', handleObjectVisibility );
} )();
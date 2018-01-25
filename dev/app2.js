$(document).ready(function() {

	var cardClone = $(".card").clone();
	var listClone = $(".list-container").clone();

	/***************************************************
	*				MAKE NEW CARD
	****************************************************/
	var addCardHandler = function(event) {
		event.preventDefault();
		
		var newCard = cardClone.clone();
		var oneList = $(this).closest(".list-cards");

		newCard.on("click", ".button", removeCardHandler);

		var cardTextField = oneList.find("input[name=writeCard]");
		var cardText = cardTextField.val();
		cardTextField.val("");

		newCard.find(".card-text").text(cardText);

		newCard.prependTo(oneList);
	};
	
	/***************************************************
	*				DELETE CARD
	****************************************************/
	var removeCardHandler = function(event) {
		event.preventDefault();

		$(this).closest('.card').remove();
	};

	/***************************************************
	*				MAKE NEW LIST
	****************************************************/
	var addListHandler = function(event) {
		event.preventDefault();

		var newBoard = listClone.clone();

		var addNew = newBoard.find(".add-new");
		addNew.on("click", ".button", addCardHandler);

		var closeCard = newBoard.find(".card");
		closeCard.on("click", ".button", removeCardHandler);

		var closeList = newBoard.find(".list-header");
		closeList.on("click", ".button", removeListHandler);

		newBoard.prependTo(".board");
	};

	/***************************************************
	*				DELETE LIST
	****************************************************/
	var removeListHandler = function(event) {
		event.preventDefault();

		$(this).closest('.list-container').remove();
	}

	$(".add-new").on("click", ".button", addCardHandler);
	$(".card").on("click", ".button", removeCardHandler);
	$(".adder").on("click", ".button", addListHandler);
	$(".list-header").on("click", ".button", removeListHandler);
})

	/***************************************************
	*				DRAGGABLE & DROPPABLE
	****************************************************/

$( function() {
    $(".list").draggable();
    $(".list").droppable({
      drop: function( event, column) {
		$(this)
	  		}
		});
	});

	/***************************************************
	*				DATEPICKER
	****************************************************/

	$( function() {
		$( "#datepicker" ).datepicker();
	  } );

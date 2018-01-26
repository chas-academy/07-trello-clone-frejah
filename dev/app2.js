$(document).ready(function() {

	var cardClone = $(".card").clone();
	var listClone = $(".list-container").clone();

	/***************************************************
	*				MAKE NEW CARD
	****************************************************/
	function handleDropEvent( event, ui ) {
		var draggable = ui.draggable;
	}

	function makeDraggable(card) {
		card.draggable({
			containment: 'parent',
			connectToSortable: ".list-cards",
			opacity: 0.35
		});
	}

	function makeDroppable(item) {
		item.droppable({
			drop: handleDropEvent
		});
	}

	function makeSortable(item) {
		item.sortable({
			revert: true
		});
	}

	var addCardHandler = function(event) {
		event.preventDefault();
		
		var newCard = cardClone.clone();
		var oneList = $(this).closest(".list").find(".list-cards");

		var cardTextField = $(this).siblings("input[name=writeCard]");
		var cardText = cardTextField.val();
		cardTextField.val("");

		newCard.on("click", ".button", removeCardHandler);
		newCard.on("click", openDialogHandler);
		newCard.find(".card-text").text(cardText);

		makeDraggable(newCard);
		
		newCard.prependTo(oneList);
	};
	
	/***************************************************
	*				DELETE CARD
	****************************************************/
	var removeCardHandler = function(event) {
		event.stopImmediatePropagation();

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

		var listCards = newBoard.find( ".list-cards" );

		makeDraggable(closeCard);
		makeSortable(listCards);
		makeDroppable(newBoard);

		newBoard.prependTo(".board");
	};

	/***************************************************
	*				DELETE LIST
	****************************************************/
	var removeListHandler = function(event) {
		event.preventDefault();

		$(this).closest('.list-container').remove();
	}

	/***************************************************
	*				DIALOG
	****************************************************/
	var cardDialog = $( "#card-details-dialog" );
	cardDialog.dialog({ autoOpen: false, title: 'Card' });

	var openDialogHandler = function(event) {
		var cardText = $(this).find(".card-text").text();
		
		cardDialog.dialog({title: "Card - " + cardText});
		cardDialog.find("#tabs-1 > p").text(cardText);

		cardDialog.dialog("open");
	};

	/***************************************************
	*				DATEPICKER
	****************************************************/
	var dialogDatePicker = $( "#datepicker" );
	dialogDatePicker.datepicker();

	/***************************************************
	*				TABS
	****************************************************/
	var dialogTabs = $( "#tabs" );
	dialogTabs.tabs();

	/***************************************************
	*				DRAGGABLE & DROPPABLE
	****************************************************/
	// $( function() {
	// 	$(".list").draggable();
	// 	$(".list").droppable({
	// 	//   drop: function( event, column) {
	// 	// 	$(this)
	// 	//   		}
	// 	// 	});
	// });

	$(".add-new").on("click", ".button", addCardHandler);

	makeSortable($( ".list-cards" ));
	makeDroppable($( ".list-container" ));
	
	$(".card").on("click", ".button", removeCardHandler);
	$(".card").on("click", openDialogHandler);
	makeDraggable($(".card"));
	
	$(".adder").on("click", ".button", addListHandler);
	$(".list-header").on("click", ".button", removeListHandler);
	$(".list").draggable();
});
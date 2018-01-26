$(document).ready(function() {

	var cardClone = $(".card").clone();
	var listClone = $(".list").clone();

	/***************************************************
	*				DRAGGABLE & DROPPABLE
	****************************************************/
	function makeDraggable(card) {
		card.draggable({
			containment: 'window',
			connectToSortable: ".list-cards",
			opacity: 0.35,
			revert: "invalid"
		});
	}

	function makeDroppable(item) {
		item.droppable({
			activeClass:"is-activated",
    		hoverClass:"is-hovered",
			accept:".card",
			drop: function(event, ui) {
			  	var $card = $(ui.draggable);
			  	$card.detach().css({top: 0,left: 0});
				$card.appendTo($(this).find(".list-cards"));
			}
		  });
	};

	function makeSortable(item) {
		item.sortable({
			revert: true
		});
	}

	/***************************************************
	*				MAKE NEW CARD
	****************************************************/
	function initializeCard(card) {
		card.on("click", ".button", removeCardHandler);
		card.on("click", openDialogHandler);
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
	function makeAnimatableList(trelloList) {
		trelloList.on('mouseenter', function() {
			$(this).addClass('highlight');
		});

		trelloList.on('mouseleave', function() {
			$(this).removeClass('highlight');
		});
	}

	function initializeList(trelloList) {
		var newList = trelloList.find(".list");

		var btnAddNewCard = trelloList.find(".add-new");
		btnAddNewCard.on("click", ".button", addCardHandler);

		var initialCard = trelloList.find(".card");
		
		var listHeader = trelloList.find(".list-header");
		listHeader.on("click", ".button", removeListHandler);

		var cardList = trelloList.find( ".list-cards" );

		makeDraggable(initialCard);
		makeSortable(cardList);
		makeDroppable(trelloList);
		makeAnimatableList(newList);

		initializeCard(initialCard);
	}

	function createNewList() {
		var listColumn = listClone.clone();

		initializeList(listColumn);

		return listColumn;
	}

	var addListHandler = function(event) {
		event.preventDefault();

		var listColumn = createNewList();

		listColumn.hide();
		listColumn.appendTo(".board");
		listColumn.show('fade', 500);
	};

	/***************************************************
	*				DELETE LIST
	****************************************************/
	var removeListHandler = function(event) {
		event.preventDefault();

		$(this).closest('.list').remove();
	}

	/***************************************************
	*				DIALOG
	****************************************************/
	var cardDialog = $( "#card-details-dialog" );
	cardDialog.dialog({
		autoOpen: false,
		title: 'Card',
		hide: 'explode',
        show: 'puff'
	});

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
	dialogDatePicker.datepicker({
		showOn: "button",
		buttonText: "Set Due date"
	  });
	dialogDatePicker.datepicker('setDate', new Date());

	/***************************************************
	*				TABS
	****************************************************/
	var dialogTabs = $( "#tabs" );
	dialogTabs.tabs();

	/***************************************************
	*				LABEL WIDGET
	****************************************************/
	var labelWidget = $( "#label-widget" );
	labelWidget.cardlabel({label: "Important", color: "#FF0000"});

	/***************************************************
	*				INITIALIZATION
	****************************************************/
	function addNewListWithName(name) {
		var newTrelloList = createNewList();
		newTrelloList.find(".card-title").text(name);
		newTrelloList.appendTo($(".board"));
	}

	initializeList($(".list"));

	addNewListWithName("Doing");
	addNewListWithName("Done");

	$(".adder").on("click", ".button", addListHandler);

	$("#trello-container").removeClass("hide");
});
// KLASA KANBAN CARD
function Card(id, name) {
	var self = this;
	
	this.id = id;
	this.name = name;
	this.element = createCard();

	function createCard() {
		var card = $('<li class="card"></li>');
		var cardDeleteBtn = $('<button class="btn-delete">x</button>');
		var cardname = $('<p class="card-name"></p>');
		
		cardDeleteBtn.click(function(){
			self.removeCard();
		});
		
		card.append(cardDeleteBtn);
		cardname.text(self.name);
		card.append(cardname)
		return card;
	}
}
Card.prototype = {
	removeCard: function() {
        $.ajax({
            url: `${baseUrl}/card/${this.id}`,
            method: 'DELETE',
            success: (resp)=>{
                this.element.remove();
            }
        })
	}
}
function Column(id, name) {
	var self = this;
	
	this.id = id;
	this.name = name || 'noname';
	this.element = createColumn();

	function createColumn() {
		// TWORZENIE NOWYCH WĘZŁÓW
		var column = $('<div class="column"></div>');
		var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
		var columnCardList = $('<ul class="card-list"></ul>');
		var columnDelete = $('<button class="btn-delete">x</button>');
		var columnAddCard = $('<button class="column-add-card">Dodaj kartę</button>');
		
		// PODPINANIE ODPOWIEDNICH ZDARZEŃ POD WĘZŁY
		columnDelete.click(function() {
			self.deleteColumn();
		});
		
		columnAddCard.click(function(event) {
            event.preventDefault();
            let cardName = prompt("Wpisz nazwę karty");
            $.ajax({
                url: `${baseUrl}/card/`,
                method: 'POST',
                data: {
                    bootcamp_kanban_column_id: self.id, 
                    name: cardName
                },
                success: (resp)=>{
                    self.createCard(new Card(resp.id,cardName));
                }
            })

		});
			
			// KONSTRUOWANIE ELEMENTU KOLUMNY
		column.append(columnTitle)
			.append(columnDelete)
			.append(columnAddCard)
			.append(columnCardList);
			return column;
		}
	}
Column.prototype = {
	createCard: function(card) {
	  this.element.children('ul').append(card.element);
	},
	deleteColumn: function() {
        $.ajax({
            url: `${baseUrl}/column/${this.id}`,
            method: 'DELETE',
            success: (resp)=>{
                this.element.remove();
            }
        })
      
	}
};
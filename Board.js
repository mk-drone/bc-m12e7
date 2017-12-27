var board = {
	name: 'Tablica Kanban',
	createColumn: function(column) {
        
        this.element.append(column.element);
        initSortable();
	},
	element: $('#board .column-container')
};

$('.create-column')
	.click(function(){
        let columnName = prompt('Wpisz nazwę kolumny');
        $.ajax({
            url: `${baseUrl}/column`,
            method: 'POST',
            data: {
                name: columnName
            },  
            success: (resp)=>{
                board.createColumn(new Column(resp.id, columnName));
            }
        });
	});
	
function initSortable() {
    $('.card-list').sortable({
      connectWith: '.card-list',
      placeholder: 'card-placeholder'
    }).disableSelection();
  }
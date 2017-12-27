//API CONFIG
let baseUrl = 'https://kodilla.com/pl/bootcamp-api';
let myHeaders = {
    'X-Client-Id': '2687',
    'X-Auth-Token': '7bc058969036b5b598992ab80ef54fda'
};

function init(){
    $.ajaxSetup({
        headers: myHeaders
    })
}

function getBoard(){
    $.ajax({
        url: `${baseUrl}/board`,
        method: 'GET',
        success: function(response) {
          setupColumns(response.columns);
        }
    });
}

function setupColumns(cols){
    cols.forEach((item) => {
        let column = new Column(item.id, item.name);
        board.createColumn(column);
        setupCards(column, item.cards);
    });
}

function setupCards(column, cards){
    cards.forEach((item) =>{
        let card = new Card(item.id, item.name, item.bootcamp_kanban_column_id);
        column.createCard(card);
    });
}

//Setup Ajax
init();

getBoard();

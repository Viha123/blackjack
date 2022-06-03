var startingBalance = 100; //for now it is hundred, later it will be an input from player
//var bet = parseInt(window.prompt("Enter betting amount" ));
var bet = 100; //for now, so that I can use the terminal

class Person{
    constructor(start){
        this.hand = [];
        this.activeCards = [];
        this.balance = start; 
    }

    setBalance(amt, win){
        if(win){
            this.balance += amt;
        }
        else this.balance = Math.min(0, this.balance-=amt);
    }

}

class GameBoard{
    constructor(){
        this.player = new Person(startingBalance);
        this.dealer = new Person(999999);
        this.player.hand = this.player.activeCards;
        this.deck = [ {k:"s1", v: 1}, {k: "s2", v: 2}, {k: "s3", v: 3}, {k: "s4", v: 4}, {k: "s5", v: 5}, {k: "s6", v: 6}, {k: "s7", v: 7}, {k: "s8", v: 8}, {k: "s9", v: 9}, {k: "s10", v: 10}, {k: "s11", v: 10}, {k: "s12", v: 10}, {k: "s13", v: 10},
        {k:"h1", v: 1}, {k: "h2", v: 2}, {k: "h3", v: 3}, {k: "h4", v: 4}, {k: "h5", v: 5}, {k: "h6", v: 6}, {k: "h7", v: 7}, {k: "h8", v: 8}, {k: "h9", v: 9}, {k: "h10", v: 10}, {k: "h11", v: 10}, {k: "h12", v: 10}, {k: "h13", v: 10},
        {k:"c1", v: 1}, {k: "c2", v: 2}, {k: "c3", v: 3}, {k: "c4", v: 4}, {k: "c5", v: 5}, {k: "c6", v: 6}, {k: "c7", v: 7}, {k: "c8", v: 8}, {k: "c9", v: 9}, {k: "c10", v: 10}, {k: "c11", v: 10}, {k: "c12", v: 10}, {k: "c13", v: 10},
        {k:"d1", v: 1}, {k: "d2", v: 2}, {k: "d3", v: 3}, {k: "d4", v: 4}, {k: "d5", v: 5}, {k: "d6", v: 6}, {k: "d7", v: 7}, {k: "d8", v: 8}, {k: "d9", v: 9}, {k: "d10", v: 10}, {k: "d11", v: 10}, {k: "d12", v: 10}, {k: "d13", v: 10},
        ]//list of objects, each object is a key value pair Clubs (C), Diamonds(D), Heart (H), Spades (S)
        //Ace can count as a 1 or 11 depending on which one is better
    }
    
    pickCard(){
        
        let cardIndex = Math.floor((Math.random() * this.deck.length));

        return this.deck.splice(cardIndex, 1);
    }
    initial(){ //initial distribution of cards
        for(var playerCard = 0; playerCard < 2; playerCard ++){
            let card = this.pickCard();
            this.player.hand.push(card);
        }
        
        let card = this.pickCard();
        this.dealer.activeCards.push(card);
        score(this.dealer.activeCards, this.player.hand);
    }
}



function calculate(list){
    let sum = 0; 
    for(var i = 0; i < list.length; i ++){
        sum += list[i][0].v; //don't know where that extra list is coming from
    }
    return sum;
}
function check(){ //return 1: dealer wins, 2 - blackjack, 3 - playerwins, 0-stand again
    let playerPoint = calculate(game.player.hand);
    let dealerPoint = calculate(game.dealer.activeCards);
    
    if(playerPoint>21){
        winnerElement.innerHTML = "DEALER WINS";
        return 1;
    }
    else if(playerPoint === 21){
        winnerElement.innerHTML = "BLACKJACK";
        return 2;
    }
    else if(dealerPoint>=playerPoint && dealerPoint < 22){
        winnerElement.innerHTML = "DEALER WINS";
        return 1;
    }
    else if(dealerPoint>=22){
        winnerElement.innerHTML = "PLAYER WINS";
        return 3;
    }
    
    else{
        console.log("STAND AGAIN");
        return 0;
    }
}
game = new GameBoard();
var shownCards = 0; //nushownCardsmber of cards already shown, helps displayCard function
var standIndex = 0;
game.initial();
displayCards(shownCards,3,game.player.hand, game.dealer.activeCards);
shownCards+=1;
var winnerElement = document.createElement('h2'); //needs to be used in 2 spots, so might as well define it here only
var container = document.querySelector(".container");
winnerElement.style.gridColumn = "1/6";
winnerElement.style.gridRow = "2/4";
container.appendChild(winnerElement);
score(game.dealer.activeCards, game.player.hand);
var hitBtn = document.getElementById("hit");
hitBtn.addEventListener("click", function(){
    game.player.hand.push(game.pickCard());
    console.log(game.player.hand);
    score(game.dealer.activeCards, game.player.hand);
    var currentSum = calculate(game.player.hand);

    if(currentSum > 21){
        winnerElement.innerHTML = "DEALER WINS";
    }
    if(currentSum == 21){
        winnerElement.innerHTML = '<img src=\"img/blackjack.png">'
    }
    shownCards ++;
    displayCards(shownCards,1,game.player.hand, game.dealer.activeCards);
});

var stand = document.getElementById("stand");

stand.addEventListener("click", function(){
    while(calculate(game.dealer.activeCards) < calculate(game.player.hand)){
        
        game.dealer.activeCards.push(game.pickCard())
        check();
        if(calculate(game.player.hand) == 21){
            break;
        }
        score(game.dealer.activeCards, game.player.hand);
        standIndex++;
        displayCards(standIndex, 2,game.player.hand, game.dealer.activeCards);
        //hiddenCardHandler(false);
    }
})

var reset = document.getElementById("reset");

reset.addEventListener("click", function(){
    
    document.location.reload();
})


//render cards function that shows the cards?

function displayCards(startIndex, action,listP, listD){ // action: 1 - hit, 2 - stand 3-reset
    var playerSelector = document.querySelector('.player-cards');
    var dealerSelector = document.querySelector('.dealer-cards');
    // console.log(listP);
    if(action == 1 || action == 3){
        for( var i = startIndex; i < listP.length; i ++){
            let imgName = listP[i][0];
            //creating img
            let imgElement = document.createElement('img');
            imgElement.src = `img/cards/${imgName.k}.png`;
            playerSelector.appendChild(imgElement);
        }
    }
    if(action == 2 || action == 3){
        for(var i = startIndex; i < listD.length; i ++){
            let imgName = listD[i][0];
            let imgElement = document.createElement('img');
            imgElement.src = `img/cards/${imgName.k}.png`;
            dealerSelector.appendChild(imgElement);
        }
        
    }


}
function score(listDealer, listPlayer){
    document.getElementsByTagName('score')[0].innerHTML = calculate(listDealer);
    document.getElementsByTagName('score')[1].innerHTML = calculate(listPlayer);
}
function scoreReset(listDealer, listPlayer){
    document.getElementsByTagName('score')[0].innerHTML = "0";
    document.getElementsByTagName('score')[1].innerHTML = "0";
}
function resetCards(){
   
    document.querySelector(".player-cards").innerHTML = "";
    document.querySelector(".dealer-cards").innerHTML = "";
}

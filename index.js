

//class Person (Object player and dealer)
//class GameBoard (displays all score and stuff) 
//lets just assume that I am making a cli game right now
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
    }
}



function calculate(list){
    let sum = 0; 
    for(var i = 0; i < list.length; i ++){
        sum += list[i][0].v; //don't know where that extra list is coming from
    }
    return sum;
}
function check(){
    let playerPoint = calculate(game.player.hand);
    let dealerPoint = calculate(game.dealer.activeCards);
    if(playerPoint>21){
        console.log("DEALER WINS");
    }
    else if(playerPoint === 21){
        console.log("BLACKJACK");
    }
    else if(dealerPoint>=playerPoint && dealerPoint < 22){
        console.log("DEALER WINS");
    }
    else if(dealerPoint>=22){
        console.log("PLAYER WINS");
    }
    
    else{
        console.log("STAND AGAIN");
    }
}
game = new GameBoard();
game.initial();

console.log(game.player.hand, calculate(game.player.hand));
console.log(game.dealer.activeCards, calculate(game.dealer.activeCards));

var hitBtn = document.getElementById("hit");
hitBtn.addEventListener("click", function(){
    game.player.hand.push(game.pickCard());
    console.log(game.player.hand, calculate(game.player.hand));
    console.log(game.dealer.activeCards, calculate(game.dealer.activeCards));
    var currentSum = calculate(game.player.hand);
    if(currentSum > 21){
        console.log("DEALER WINS");
    }

});

var stand = document.getElementById("stand");
stand.addEventListener("click", function(){

    while(calculate(game.dealer.activeCards) < calculate(game.player.hand)){
        
        game.dealer.activeCards.push(game.pickCard())
        check();
        if(calculate(game.player.hand) == 21){
            break;
        }
        console.log(game.player.hand, calculate(game.player.hand));
        console.log(game.dealer.activeCards, calculate(game.dealer.activeCards));
    }
})


//render cards function that shows the cards?


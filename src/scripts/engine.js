const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_points"),

    },
    cardSprites: {
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fieldCards: {
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card")
    },
    actions: {
        button: document.getElementById("next-duel"),
    },


};

const playerSides = {
    player1: "player-cards",
    computer: "computer-cards"
};
const pathImages = "/src/assets/icons/";
const cardData = [
{
    id: 0,
    name:"Blue Eyes White Dragon",
    type:"Paper",
    img:`${pathImages}dragon.png`,
    WinOf:[1],
    LoseOf:[2],
},
{
    id: 1,
    name:"Dark Magician",
    type:"Rock",
    img:`${pathImages}magician.png`,
    WinOf:[2],
    LoseOf:[0],
},
{
    id: 2,
    name:"Exodia",
    type:"Scissors",
    img:`${pathImages}exodia.png`,
    WinOf:[0],
    LoseOf:[1],
}
];

//gera numeros randomicos baseado no tamnho da lista, no caso cardData
async function getRandomCardId(){
    const randomIndex = Math.floor(Math.random() * cardData.length);//floor arredonda
    return cardData[randomIndex].id;
}

//cria a imagem da carta. cria a carta
async function createCardImage(IdCard, fieldSide){
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height","100px");
    cardImage.setAttribute("src","/src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id",IdCard);//atribui um index para a carta
    cardImage.classList.add("card");


    if(fieldSide === playerSides.player1){
        //coloca a carta no meio/duelo ao clicar
        cardImage.addEventListener("click", ()=>{
            setCardsField(cardImage.getAttribute("data-id")); //seta/ recupera o index da carta
        });

        //dentro do if para q so o player veja as cartas
        cardImage.addEventListener("mouseover",()=>{
            drawSelectCard(IdCard);
        });// ao passar o mouse em cima da carta, ela aparece
    }

    

    return cardImage;
}

function drawSelectCard(index){
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = "Attribute: "+cardData[index].type;
}

//sorteio de cartas de forma aleatoria
async function drawCards(cardNumbers, fieldSide){
    for(let i = 0; i < cardNumbers;i++){
        const randomIdCard =  await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);
    }
}





function initialize() {
    drawCards(5,playerSides.player1)
    drawCards(5,playerSides.computer)
}
initialize();
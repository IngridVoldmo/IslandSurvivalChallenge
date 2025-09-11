

let meat = 30;
let vines = 10;
let wood = 20;
let stone = 20;
let tools = [];
let energy = 70;
let boatStatus = false;
let axeStatus = false;
let spearStatus = false;

getTools();

//this.alert("message")


async function getTools() {
    //endre til dean sin ppt med catch og Promises, eller legg inn try catch
  const response = await fetch('https://island-survival-kit-builder.onrender.com/tools');
  tools = await response.json(); //extract JSON from the http response
  tools[2]["img-url"] = "https://cdn.glitch.global/4ab89df4-051b-4f6c-b564-2317ed5cc084/Spear.png";
 setDropdownOptions();
 
  
}

function setDropdownOptions(){
    const dropdown = document.getElementById("myDropdown");
    for (const tool of tools) {
    const option = document.createElement("option");
    option.value = tool.id;
    option.textContent = tool.title; 
    dropdown.appendChild(option);
  }
}

function performAction(action){
    if(action === "hunt"){
        hunt();
        console.log("hunting");
    }
    else if(action==="gather"){
        gather();
        console.log("gathering");
    }
    else if(action === "rest"){
        rest();
        console.log("resting");
    }
    else if(action === "sail away"){
        sailAway();
    }
}

function rest(){
    if(meat>=10){
        const energyEffect = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
    upDateEnergy(energyEffect);
    meat = meat - 10;
    document.getElementById("meatStatus").textContent = meat;
    }
}

function gather(){
    
    //Payoff: 1-10 vines, 1-10 food, 1-10 wood and 1-5 stone
    meat = meat+ (Math.floor(Math.random() * (10 - 1 + 1)) + 1);
    document.getElementById("meatStatus").textContent = meat;
    console.log(meat);

    vines = vines+ (Math.floor(Math.random() * 10) + 1);
    document.getElementById("vineStatus").textContent = vines;

    wood = wood+ (Math.floor(Math.random() * 10) + 1);
    document.getElementById("woodStatus").textContent = wood;

    stone = stone+ (Math.floor(Math.random() * 10) + 1);
    document.getElementById("stoneStatus").textContent = stone;
    upDateEnergy(-10);
}

function hunt(){
    upDateEnergy(-20)
    meat = meat+ (Math.floor((Math.random() * 20) + 1));
    document.getElementById("meatStatus").textContent = meat;
    
}

function sailAway(){
    alert("YOU WIN!!!");
}

function upDateEnergy(addPercent){
    let fill = document.getElementById("fill");
    let newWidth = energy + addPercent;
    
    if(newWidth>=0){
        fill.style.width = newWidth + "%";
        fill.textContent = newWidth + "%";
        energy = newWidth;
    }
    

    if ((newWidth+addPercent) <= 20) {
        document.getElementById("hunt").disabled = true;
    }
    if ((newWidth+addPercent) <= 10) {
        document.getElementById("gather").disabled = true;
    }

    //activate if energy is high enough
    if(newWidth>=10){
        document.getElementById("gather").disabled = false;
    }
    if(newWidth>=20){
        document.getElementById("hunt").disabled =false;
    }
}




function showTool(){
    const dropdown = document.getElementById("myDropdown");
    const toolId = dropdown.value - 1;
    const tool = tools[toolId];

    if (!tool) return; 

    document.getElementById("toolImage").src = tool["img-url"];
    //console.log("tool "+toolId + tools[toolId-1].title);

    document.getElementById("title").textContent = tool.title;
    document.getElementById("description").textContent = tool.description;

    const reqList = document.getElementById("requirements");
    reqList.innerHTML = "";
    let requirements = tool.requirements;
    for(let requirement of requirements){
        let bulletpoint = document.createElement("li");
        bulletpoint.textContent = requirement;
        reqList.appendChild(bulletpoint);
    }

}

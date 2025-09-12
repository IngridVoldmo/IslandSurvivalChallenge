
let loot={
    meat : 30,
    vine : 10,
    wood : 20,
    stone : 20
}

let tools = [];
let energy = 70;

let craftedStatus = {
    axe: false,
    spear: false,
    boat: false
};


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
    if(energy<10 && loot.meat<10){
        alert("You perished, and you LOSE!!")
    }
}

function rest(){
    if(loot.meat>=10){
        const energyEffect = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
    upDateEnergy(energyEffect);
    loot.meat = loot.meat - 10;
    document.getElementById("meatStatus").textContent = loot.meat;
    }
}

function gather(){
    
    //Payoff: 1-10 vines, 1-10 food, 1-10 wood and 1-5 stone
    loot.meat = loot.meat+ (Math.floor(Math.random() * (10 - 1 + 1)) + 1);
    document.getElementById("meatStatus").textContent = loot.meat;
    console.log(loot.meat);

    loot.vine = loot.vine+ (Math.floor(Math.random() * 10) + 1);
    document.getElementById("vineStatus").textContent = loot.vine;

    loot.wood = loot.wood+ (Math.floor(Math.random() * 10) + 1);
    document.getElementById("woodStatus").textContent = loot.wood;

    loot.stone = loot.stone+ (Math.floor(Math.random() * 10) + 1);
    document.getElementById("stoneStatus").textContent = loot.stone;
    upDateEnergy(-10);
}

function hunt(){
    upDateEnergy(-20)
    loot.meat = loot.meat+ (Math.floor((Math.random() * 20) + 1));
    document.getElementById("meatStatus").textContent = loot.meat;
    
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
    const tool = getSelectedTool();
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

function getSelectedTool(){
    const dropdown = document.getElementById("myDropdown");
    const toolId = dropdown.value - 1;
    const tool = tools[toolId];
    return tool;
}

const craftBtn = document.getElementById("craft");
craftBtn.addEventListener("click",craftItem);

function craftItem(){
    const tool = getSelectedTool();

    if (checkRequirements(tool)){
        const craftedPic = document.createElement("img");
        craftedPic.className = "grid-item";
        craftedPic.src = tool["img-url"];
        const picGrid = document.getElementById("craftedTools");
        picGrid.appendChild(craftedPic);

        console.log("Item crafted");
    }
    else{
        alert("You dont have the required resources");
    }
    
}

function checkRequirements(tool){
    
    for(let req of tool.requirements){
        const splitReq = req.split(" ");
        const resource = splitReq[1]; 
        const cost = parseInt(splitReq[0]);
        if(loot[resource] < cost|| !loot.hasOwnProperty(resource)){
            return false;
        }
        
    }
    for(let req of tool.requirements){
        const splitReq = req.split(" ");
        const resource = splitReq[1]; 
        const cost = parseInt(splitReq[0]);
        updateLoot(resource, -cost);
    }
    updateItemStatus(tool.title);
    
    return true;
}

function updateItemStatus(toolTitle){
    let lowerCaseTitle = toolTitle.toLowerCase();
    craftedStatus[lowerCaseTitle] = true;
    console.log(craftedStatus);
}

function updateLoot(resource, cost){
    loot[resource] = loot[resource] + cost;
    let elementId = resource + "Status";
    document.getElementById(elementId).textContent = loot[resource];
}

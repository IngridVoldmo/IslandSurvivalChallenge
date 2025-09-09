let meat = 30;
let vines = 10;
let wood = 20;
let stone = 20;
let tools = [];

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

        meat = meat+1;
        document.getElementById("meatStatus").textContent = meat;
        console.log("hunting");
    }
    else if(action==="gather"){
        console.log("gathering");
    }
    else{
        console.log("do nothing");
    }
}

function showTool(){
    const dropdown = document.getElementById("myDropdown");
    const toolId = dropdown.value;
    const image_url = tools[toolId-1]["img-url"];
    document.getElementById("toolImage").src = image_url;
    console.log("tool "+toolId + tools[toolId-1].title);
}

var count = 0;
function Car (name, HP, MPG, Tank, Cargo, GC, Price){
    this.name = name;
    this.HP = HP;
    this.MPG = MPG;
    this.Tank = Tank; //size in Gallons
    this.Cargo = Cargo; // in feet^3
    this.GC = GC; // Ground Clearance in inches
    this.Price = Price;
    this.called = false;
}

var CX5 = new Car("Mazda CX5", 184, 35, 15, 34, 8.5, 21795);
var rogue = new Car ("Nissan Rogue", 170.0, 33, 14.5, 39.3, 7.4, 23290);
var escape = new Car("Nissan Escape", 168, 29, 15.7, 34.3, 7.9, 23600);
var forester = new Car("Subaru Forester", 170, 32, 15.9, 33, 8.7, 22395);
var crosstrek = new Car ("Subaru Crosstrek", 148, 34, 15.9, 22.3, 8.7, 21595);
var rav4 = new Car ("Toyota Rav4", 176, 31, 15.9, 38.4, 6.3, 24350);
var CRV = new Car ("Honda CRV", 185, 33, 15.3, 37, 6.7, 23750);
var tucson = new Car ("Hyundai Tucson", 170, 33, 16.4, 31, 6.4, 22700);
var sportage = new Car ("Kia Sportage", 181, 29, 15.3, 30.65, 6.8, 22990);
// nissan pathFinder, Nissan Murano, Nissan Juke(?), X-Terra
// Jeep Cherroke, Wrangler
// 

if (localStorage.getItem("allCars") != null){
    var carsArray = localStorage.getItem("allCars");
    carsArray = JSON.parse(carsArray);   
}
else{
    var carsArray = [CX5, rogue, escape, forester, crosstrek, rav4, CRV, tucson, sportage];
    carsArray = JSON.stringify(carsArray);
    localStorage.setItem("allCars", carsArray);
    carsArray = JSON.parse(carsArray);
}

if (localStorage.getItem("custom") != null){
    var customArr = localStorage.getItem("custom");
    customArr = JSON.parse(customArr);
    
}
else{
    var customArr = [];
}

function attFunc(){
    count = 0;
    var carChoice;
    var answer = getAnswer("cars", "carOption", "innerHTML");
    var carObj = {};
    
    for (var i = 0; i < carsArray.length; i++){
        carObj[carsArray[i].name] = {};
        carObj[carsArray[i].name] = carsArray[i];
        for (thing in carObj){

            if (answer == carsArray[i].name){
                var thisCarHere = carsArray[i];
                }
        }
        
    }
    singleTable(thisCarHere);
}

function singleTable (thing){
    var str = '<table class="singa" border="1"><tr><th colspan="6">'+thing.name+'</tr><tr><th>Horse Power</th><th>MPG</th><th>Tank Size</th><th>Cargo Space</th><th>Ground Clearance</th><th>Price</th></tr>'
    
    str += "<tr id='"+count+"'><td>"+thing.HP+"</td><td>"+thing.MPG+"</td><td>"+thing.Tank+" gallons</td><td>"+thing.Cargo+"</td><td>"+thing.GC+" inches</td><td>$"+thing.Price+"</td></tr></table>"
    
    document.getElementById("results").innerHTML = str;   
}

function allCars (){
    count = 0;
    var attribute = getAnswer("attOption", "att", "value");
    var newCarArr = [];
    var tStr;              
    newCarArr = sorting(carsArray, attribute);    
        
    tStr = '<table border="1">' // Start the table
    for (var x = 0; x < newCarArr.length; x++){
        tStr += allCarsTable(newCarArr[x]) // Make the table
    }
    tStr += "</table>"; // close the table
    document.getElementById("results").innerHTML = tStr;

}

function toggleCustom(){
    count=0;
    var cStr;
    var newArr = [];
    var atr = getAnswer("attOption", "att", "value");
    newArr = sorting(customArr, atr);
    cStr = '<table border="1">'
    for (var d = 0; d < customArr.length; d++){
        cStr += allCarsTable(customArr[d])
    }
    cStr += '</table>';
    document.getElementById("results").innerHTML = cStr;
}

function sorting(array, atr){
    var placeHolder;
    for (var num = 0; num < array.length; num++){
        
        if (num+1 == array.length){
            return array;
        }
        else if (array[num][atr] < array[num+1][atr]){
            placeHolder = array[num]; // set placeholder
            array[num] = array[num+1]; // Move object down a spot
            array[num+1] = placeHolder; // set original (arr[num] up a spot
            return sorting(array, atr);
        }
        else if (array[num][atr] >= array[num+1][atr]){ 
            
            // If 2 cars have same value, don't change the order.    
            continue;
        }
    }
}

function allCarsTable (thing){
    var tableStr;
    count++;
    tableStr = "<tr class='css"+count%2+"'><th><h1>"+count+"</h1></th><th colspan='5'><h1>"+thing.name+"</h1></th></tr>"
    if (count % 3 == 0 || count == 1 ){                
    
        tableStr += "<tr class='css"+count%2+"'><td class='lables'>Horse Power</td><td class='lables'>MPG</td><td class='lables'>Tank Size in gallons</td><td class='lables'>Cargo Space in cubic ft</td><td class='lables'>Ground Clearance in inches</td><td>Price (MSRP)</td></tr>";

        tableStr += "<tr class='css"+count%2+"'><td>"+thing.HP+"</td><td>"+thing.MPG+"</td><td>"+thing.Tank+" gallons</td><td>"+thing.Cargo+" Cu. Ft</td><td>"+thing.GC+" inches</td><td>$"+thing.Price+"</td></tr>"
    

    }
    else{
        tableStr += "<tr class='css"+count%2+"'><td>"+thing.HP+"</td><td>"+thing.MPG+"</td><td>"+thing.Tank+" gallons</td><td>"+thing.Cargo+" Cu. Ft</td><td>"+thing.GC+" inches</td><td>$"+thing.Price+"</td></tr>"
    }
    return tableStr;
}




function getAnswer(id, className, val){
    var type = document.getElementById(id).selectedIndex;
    var selected = document.getElementsByClassName(className)[type][val];
    return selected;
}

function startFunc(){
    var space = document.getElementById("results");
    space.innerHTML = "<div id='submission'><form><p>Name of car?<input type='text' id='name' /><br /><br /> HorsePower?<input type='number' id='horsePower' /><br /><br /> MPG<input type='number' id='milesPerGal' /><br /><br />Tank size?<input type='number' id='gallons' /><br /><br />Cargo room?<input type='number' id='cargo' /><br /><br />Ground Clearance<input type='number' id='clearance' /><br /><br />Price?<input type='number' id='dollars' /><br /><br /></p></form></div><button onclick='submitFunc()'>Enter Results!</button><button onclick='deadFunction()'>Clear Data</button>";
    
}
function deadFunction(){
    localStorage.clear();
    sessionStorage.clear();
    location.reload();
}

function submitFunc(){
    var name = document.getElementById("name").value;
    var HP = document.getElementById("horsePower").value;
    var MPG = document.getElementById("milesPerGal").value;
    var Tank = document.getElementById("gallons").value;
    var Cargo = document.getElementById("cargo").value;
    var Clearance = document.getElementById("clearance").value;
    var Price = document.getElementById("dollars").value;
    var obj = new Car(name, HP, MPG, Tank, Cargo, Clearance, Price);
    if (localStorage.getItem("allCars") != null){
        carsArray = localStorage.getItem("allCars");
        carsArray = JSON.parse(carsArray);  
        carsArray.push(obj);
        carsArray = JSON.stringify(carsArray);
        localStorage.setItem("allCars", carsArray);
    }
    else{
        carsArray.push(obj);
        carsArray = JSON.stringify(carsArray);
        localStorage.setItem("allCars", carsArray);
        carsArray = JSON.parse(carsArray);
    }
    customArr.push(obj);
    customArr = JSON.stringify(customArr);
    localStorage.setItem("custom", customArr);
    customArr = JSON.parse(customArr);
    setTimeout( function(){
        document.getElementById("results").innerHTML = "Sending Results...";
            setTimeout( function(){
            document.getElementById("results").innerHTML = "Got'em!";
                setTimeout( function(){
            document.getElementById("results").innerHTML = "";
                location.reload();

                }, 1500);
            }, 1300);
    }, 500);    
    
}
function makeForm1(){
    var str = "";
    document.getElementById("form1").innerHTML = str;

    str = "<form><p>Compare the car: <select id='cars'>";
    for (var counter = 0; counter < carsArray.length; counter++){
        str += "<option class='carOption'>"+carsArray[counter].name+"</option>"; 
    }
    str +="</select></p></form>"
    document.getElementById("form1").innerHTML = str;
}
window.onload = makeForm1;



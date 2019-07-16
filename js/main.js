const time = document.getElementById("time");
const greeting = document.getElementById("greeting");
const name = document.getElementById("name");
const focus = document.getElementById("focus");

function dispTime()
{
    let now = new Date();
    let hour = now.getHours();
    let min = now.getMinutes();
    let sec = now.getSeconds();

    //decide AM/PM
    const amPm = hour >= 12 ? 'PM' : 'AM';

    //12hr format
    hour = hour % 12 || 12;

    time.innerHTML = `${hour}:${appendZero(min)}:${appendZero(sec)} ${amPm}`;

    setTimeout(dispTime,1000);
}

function appendZero(num)
{
    return ((num < 10 ? '0' : '') + num);
}

function setBackgroundAndGreeting()
{
    let now = new Date();
    let hour = now.getHours();
    if (hour < 12)
    {
        //morning
        document.body.style.backgroundImage = 'url("images/sunrise.jpg")';
        greeting.textContent = "Good Morning, ";
        document.body.style.color = "white";
    }
    else if(hour < 18)
    {
        //afternoon
        document.body.style.backgroundImage = 'url("images/afternoon.jpg")';
        greeting.textContent = "Good Afternoon, ";
    }
    else
    {
        //evening
        document.body.style.backgroundImage = 'url("images/night.jpg")';
        greeting.textContent = "Good Evening, ";
        document.body.style.color = "white";
    }
}

function getName() 
{
    if (!localStorage.getItem('name')) 
    {
        
        name.innerHTML = '[Enter Name]';
    } 
    else 
    {
        name.innerText = localStorage.getItem('name');
    }
  }

function setName(e)
{
    if (e.type === "blur")
        localStorage.setItem('name',e.target.innerText);
    else if(e.type === "keypress" && e.keyCode == 13)
    {
        localStorage.setItem('name',e.target.innerText);
        name.blur();
    }
    
}

function getFocus() 
{
    if (!localStorage.getItem('focus')) 
    {
        
        focus.innerHTML = '[Enter Focus]';
    } 
    else 
    {
        focus.innerText = localStorage.getItem('focus');
    }
  }

function setFocus(e)
{
    if (e.type === "blur")
        localStorage.setItem('focus',e.target.innerText);
    else if(e.type === "keypress" && e.keyCode == 13)
    {
        localStorage.setItem('focus',e.target.innerText);
        focus.blur();
    }
    
}

function buttonClickHandler()
{
    //create li element to append in the list
    var li = document.createElement("li");

    //append checkbox
    var x = document.createElement("input");
    x.addEventListener('click',checkItem);
    x.setAttribute("type", "checkbox");
    x.setAttribute("class", "checkbox");
    li.appendChild(x);
    
    //append the text input boxes
    var x = document.createElement("input");
    x.setAttribute("type", "text");
    x.setAttribute("maxlength", 40);
    x.setAttribute("class", "list-input-text");
    li.appendChild(x);

    //add li to ul
    document.getElementById("UL").appendChild(li);

    //append close button
    var span = document.createElement("span");
    span.addEventListener('click',deleteItem);
    var txt = document.createTextNode("\u00D7");
    span.className = "delete";
    span.appendChild(txt);
    li.appendChild(span);
}

function deleteItem(e)
{
    e.target.parentNode.style.display = "none";
}

function checkItem(e)
{
    var checkedBox = e.target;
    if(checkedBox.checked)
    {
        checkedBox.nextSibling.style.backgroundColor = "#D3D3D3";
        checkedBox.nextSibling.style.textDecoration = "line-through";
    }
    else
    {
        checkedBox.nextSibling.style.backgroundColor = "white";
        checkedBox.nextSibling.style.textDecoration = "none";
    }
}


var x = document.getElementById("loc");
function getLocation() 
{
    console.log("hello");
    if (navigator.geolocation) 
    {
        navigator.geolocation.getCurrentPosition(showPosition);
    } 
    else 
    {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) 
{
    //x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude; 
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    var latlng = new google.maps.LatLng(lat, lng);
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({'latLng': latlng}, function(results, status){
        if(status === 'OK')
        {
            console.log(results[0]);
            console.log("---------------");
            console.log(results[1]);
        }
    });
}


name.addEventListener('keypress',setName);
name.addEventListener('blur',setName);
focus.addEventListener('keypress',setFocus);
focus.addEventListener('blur',setFocus);

dispTime();
setBackgroundAndGreeting();
getName();
getFocus();
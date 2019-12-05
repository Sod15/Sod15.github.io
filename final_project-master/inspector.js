var holder;
var moreTable;
var tableSize = 5

function loadData() {
    console.log('fetch'); // confirm code is running on click
    // fetch("https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json")
    fetch('/api')
        .then(res => res.json())
        .then(res => {
            holder = res;
            console.log(res); // logging step to check what we got
            return res;
        })
        .then(res => {

            //get list of categories
            // cate = []
            // for(i=0; i<res.length; i++){
            //     if(!cate.includes(res[i].category)){
            //         cate.push(res[i].category)
            //     }
            // }
            // console.log(cate)

            text = "<table border><tr><th>Name</th><th>Address</th><th>Category</th><th>Location</th>"
            // text = text + "<th>adequate_hand_washing</th><th>food_contact_surfaces_and</th><th>food_from_approved_source</th>"
            // text = text + "<th>food_protected_from</th><th>ill_workers_restricted</th><th>no_bare_hand_contact</th>"
            text = text + "<th>Proper Hand Washing</th><th>Proper Sewage Disposal</th><th>Rodent and Insects</th></tr>"

            for(i = 0; i<tableSize; i++){
                text = text + "<tr><td>" 
                + res[i].name + "</td><td>" 
                + res[i].address_line_1 + "</td><td>" 
                + res[i].category + "</td><td>" 
                    if (res[i].geocoded_column_1 !== undefined){
                    text = text + res[i].geocoded_column_1.coordinates[1] + ", " + res[i].geocoded_column_1.coordinates[0] + "</td><td>";
                    }
                    else{
                    text = text + "N/A, N/A</td><td>";
                    }
                text = text + res[i].proper_hand_washing  + "</td><td>"
                + res[i].proper_sewage_disposal  + "</td><td>"
                + res[i].rodent_and_insects  + "</td></tr>"
            }

            moreTable = text
            text = text + "</table>";

            return text;
        })
        .then(text => {
            document.querySelector(".content").innerHTML = text;
            return text;
        })
        .then(text => document.getElementById("more").id = "show");
}

function more(){
    console.log(holder)
    for(i = tableSize; i< tableSize + 5; i++){
        moreTable = moreTable + "<tr><td>" 
            + holder[i].name + "</td><td>" 
            + holder[i].address_line_1 + "</td><td>" 
            + holder[i].category + "</td><td>" 
                if (holder[i].geocoded_column_1 !== undefined){
                moreTable = moreTable + holder[i].geocoded_column_1.coordinates[1] + ", " + holder[i].geocoded_column_1.coordinates[0] + "</td><td>";
                }
                else {
                moreTable = moreTable + "N/A, N/A</td><td>";
                }
            moreTable = moreTable + holder[i].proper_hand_washing  + "</td><td>"
            + holder[i].proper_sewage_disposal  + "</td><td>"
            + holder[i].rodent_and_insects  + "</td></tr>"
    }

    tableSize = tableSize + 5
    document.querySelector(".content").innerHTML = moreTable + "</table>"
}

var x = document.getElementById("location");

function map(){
    console.log("location being acquired");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x.innerHTML = "Location: " + position.coords.latitude + ", " + position.coords.longitude;

    var latlon = position.coords.latitude + "," + position.coords.longitude;

    var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="
        +latlon+"&zoom=14&size=400x300&sensor=false&key=AIzaSyAk3KkUmnn9APnwR_maGHD5xds0qkT-KUg";

    document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";
}

// function init() {
//     new google.maps.Map(document.getElementById('mapholder'), {
//       center: { lat: 59.325, lng: 18.069 },
//       zoom: 15
//     });
//   }

// function map(){
//     new google.maps.Map(document.getElementById('mapholder'), {
//         center: { lat: 59.325, lng: 18.069 },
//         zoom: 15
//       });
// }



var slider = document.getElementById("myRange");
var output = document.getElementById("value");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
}
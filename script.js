document.addEventListener("DOMContentLoaded", function () {
    const startLocationInput = document.getElementById("startLocation");
    const destinationInput = document.getElementById("destination");
    const carStartLocationInput = document.getElementById("carStartLocation");
    const carStopLocationInput = document.getElementById("carStopLocation");
    const findBusesButton = document.getElementById("findBuses");  // Get the button element
    const busNumbersContainer = document.getElementById("busNumbersContainer");
    const busNumbersSelect = document.getElementById("busNumbersSelect");

    const locations = [
        "100 feet/GP",
        "Aalamaram - Vadavalli",
        "Aalandhurai",
        "Aathupalam - Perur rd",
        "Aathupalam/L&T tollbooth",
        "Aavarampalayam",
        "Agricultural University",
        "Akkanaickenpalayam",
        "Alankar - Nanjappa rd",
        "Amman kovil - Saravanampatti",
        "Anna Statue - Avinashi rd",
        "Annanagar - Vadavalli rd",
        "Annapoorna - R.S.Puram",
        "Annur",
        "Appanaickenpatti",
        "Arasipalayam",
        "Arasur - Avinashi road",
        "Athipalayam",
        "Athipalayam Pirivu - Sathy rd",
        "Bharathi nagar - Sathy rd",
        "Bharathiyar University",
        "BigBazaar",
        "Boat House - Singanallur",
        "Central studio - Singanallur",
        "Chandrapuram",
        "Cheran Colony",
        "Cheran Nagar - MTP rd",
        "CheranMaNagar",
        "Chetti veedhi - Perur rd",
        "Chettipalayam",
        "Chinna Thadagam",
        "Chinnavedampatti",
        "Chinniyampalayam",
        "CIT - CODISSIA",
        "CMC - Avinashi rd",
        "CMS - Ganapathy",
        "Collectorate/DSP",
        "Devarayapuram",
        "Dhaliyur",
        "Dhamu nagar - Puliakulam",
        "Eachanari",
        "Eachanari Rly gate",
        "EB Colony - Vadavalli rd",
        "Edayarpalayam - Palghat rd",
        "Edayarpalayam - Pappampatti",
        "Edayarpalayam - Thadagam rd",
        "Edayarpalayam - Vellalur",
        "ELGI Nagar - Singanallur",
        "Eru Company - MTP rd",
        "ESI - Singanallur",
        "Ettimadai",
        "Flower Market",
        "Ganapathy",
        "Ganapathy Managar",
        "Gandhi Managar",
        "Gandhi Park",
        "Gandhipuram",
        "Ganesapuram - Sathy rd",
        "GCT - Thadagam rd",
        "GEM Hospital - Ramanathapuram",
        "GN mills - MTP rd",
        "Goldwins",
        "Government Hospital",
        "GV Residency",
        "Hope College",
        "Housing Unit - Ganapathy",
        "Housing unit - Kovundampalayam",
        "Housing Unit - Kurichi",
        "Housing Unit - Singanallur",
        "Idigarai",
        "IOB Colony - Maruthamalai",
        "Irugur",
        "Irugur Pirivu",
        "Iruttupallam - Siruvani rd",
        "ISHA YOGA centre",
        "ITI - MTP rd",
        "Iyer Hospital - Trichy rd",
        "Jai Shanthi - Singanallur",
        "Jothipuram",
        "Kalangal - Sulur",
        "Kalappatti",
        "Kalappatti Pirivu - Sathy rd",
        "Kallapalayam - Pappampatti",
        "Kalveerampalayam",
        "Kalyan - 100ft rd",
        "Kangeyampalayam",
        "Kaniyur",
        "Kannampalayam",
        "Kanuvai",
        "Karadimadai",
        "Karamadai",
        "Karanampettai",
        "Karpagam Complex - 100ft",
        "Karpagam University",
        "Karugampalayam - Somanur",
        "Karumathampatti",
        "Karumbukkadai - Ukkadam",
        "Karunya University",
        "Karuppagoundan st",
        "Kavundampalayam",
        "KCT - Saravanampatti",
        "Kennedy - R.S.Puram",
        "KG Chavadi - Palghat rd",
        "KG Hospital/Theatre",
        "KG mill/school - Annur",
        "KGISL - Saravanampatti",
        "Kidney Centre",
        "Kinathukadavu",
        "KMCH - Avinashi rd",
        "KNG Pudur",
        "KNG Pudur pirivu",
        "Kottaipalayam",
        "Kovai Kondattam",
        "Kovaipudur",
        "Kovaipudur Pirivu",
        "Kovilmedu",
        "Kovilpalayam - Sathy rd",
        "Kulathupalayam",
        "Kumaran Kottam - Trichy road",
        "Kumaran mill - MTP rd",
        "Kuniamuthur",
        "Kunnathur - Sathy rd",
        "Kurichi",
        "Kurumbapalayam - Sathy rd",
        "Lakshmi Mills Junction",
        "Lakshmi puram - Sathy rd",
        "Law College",
        "Lawley Road",
        "LIC Colony - Selvapuram",
        "LIONs - Singanallur",
        "LMW - MTP rd",
        "Madukkarai",
        "Mahendra - Nehru nagar",
        "Mailkal - Madukkarai",
        "Malumichampatti",
        "Mani School/GKNM Hospl",
        "Maniakaranpalayam",
        "Manis Theatre",
        "Marakkadai",
        "Maruthamalai",
        "Masakkalipalayam",
        "Mathampatti",
        "Mathappur - Somanur",
        "Mullai Nagar - Vadavalli",
        "Murugan mills - MTP rd",
        "Muthu theatre - MTP rd",
        "Muthusamy Colony - Selvapuram",
        "Myleripalayam",
        "Myleripalayam Pirivu",
        "N.G.P Institutes",
        "Nanjundapuram",
        "Narasimmanaicken palayam",
        "Narasipuram",
        "Nava India - Avinashi rd",
        "Navavoor Pirivu",
        "Neelambur",
        "Neelikonampalayam",
        "Nehru nagar",
        "NGGO Colony",
        "North Coimbatore/Vadakovai",
        "Olympus - Ramanathapuram",
        "Omni bus stand",
        "Onapalayam - Thondamuthur rd",
        "Ondipudur",
        "Othakalmandapam",
        "Pachapalayam - Perur",
        "Pal Company(Aavin)",
        "Palathurai",
        "Pallapalayam",
        "Pannimadai",
        "Pappampatti",
        "Pappampatti Pirivu",
        "Park Gate - Nanjappa rd",
        "Pattanam",
        "Peedampalli",
        "Periyanaickenpalayam",
        "Perur",
        "PN pudur - Vadavalli",
        "Podhanur",
        "Polytechnic - Avinashi rd",
        "Poochiyur",
        "Post Office - R.S.Puram",
        "Power House",
        "Press Colony - MTP rd",
        "Pricol - MTP rd",
        "PSG Arts",
        "PSG Hospital",
        "PSG Krishnammal",
        "PSG Tech - Peelamedu",
        "Puliakulam",
        "Puliamaram stop - NSR rd",
        "Railway Station",
        "Rainbow - Trichy rd",
        "Rajalakshmi mills/PERKS",
        "Ramakrishna Hospital",
        "Ramakrishna mill - Sathy rd",
        "Ramanathapuram",
        "Ramanuja Nagar",
        "Ramnarayana mill - MTP rd",
        "Ranganathapuram - Sulur",
        "Rangasamy Goundan pudur",
        "Rasipalayam - Sulur",
        "Rathinam Institutions",
        "Ravathur Pirivu",
        "Residency",
        "RMS Office",
        "Rottigoundanur - Madukkarai",
        "RVS - Sulur",
        "Sadivayal - Siruvani rd",
        "Saibaba Colony",
        "Saibaba Kovil",
        "Samalapuram - Somanur",
        "Sanganoor",
        "Saradhambal Temple - Race Course",
        "Saravanampatti",
        "Savitha Hall - R.S.Puram",
        "Selakkarachal",
        "Sharp Industries",
        "Shivalaya - Perur rd",
        "SIDCO - Pollachi rd",
        "SIHS Colony",
        "Singai Nagar - Singanallur",
        "Singanallur",
        "Sinthamanipudur",
        "SITRA/Airport",
        "Sivaji Colony - Thadagam rd",
        "Sivanandha Colony",
        "Sivanandha mill - Sathy rd",
        "SNS Institutions - Sathy rd",
        "Somanur",
        "Somayanur - Thadagam rd",
        "Sowripalayam",
        "Sowripalayam Pirivu",
        "Sreepathi/Kannan",
        "SRP mill - Sathy rd",
        "Suguna Kalyana Mandapam",
        "Sukravarpettai",
        "Sulur",
        "Sulur Aero",
        "Sundakkamuthur",
        "Sundharapuram",
        "Sungam",
        "Tamil kalloori - Perur",
        "Telungupalayam - Selvapuram",
        "Telungupalayam Pirivu - Annur",
        "Telungupalayam Pirivu - Perur",
        "Textool - Sathy rd",
        "Thadagam/Anuvavi temple",
        "Thanner Pandhal",
        "Theethipalayam - Perur",
        "Thirumalayampalayam",
        "Thomas Park - Race Course",
        "Thondamuthur",
        "Thottipalayam Pirivu",
        "Thudiyalur",
        "Town Hall",
        "TVS - MTP rd",
        "TVS Nagar - Thadagam rd",
        "Udayampalayam - Ganapathy",
        "Udayampalayam - Sowripalayam",
        "Ukkadam",
        "Uppilipalayam - Avinashi rd",
        "Uppilipalayam - Sowripalayam",
        "Vadamadurai",
        "Vadavalli",
        "Varatharaja Mills",
        "Varatharajapuram",
        "Vasantha mills - Singanallur",
        "Vedapatti",
        "Veera Keralam",
        "Veerapandi Pirivu - MTP rd",
        "Velandipalayam",
        "Veppampalayam",
        "Vettuvapalayam",
        "Vellalur",
        "Vellamadai",
        "Venkittapuram",
        "Vilankurichi",
        "Visuwasapuram/Sahara City",
        "VOC Park",
        "Walayar",
        "Womens Polytechnic"
    ];

    function showSuggestions(input, suggestionsContainer) {
        const inputValue = input.value.toLowerCase();
        suggestionsContainer.innerHTML = "";

        if (inputValue) {
            const filteredLocations = locations.filter(location =>
                location.toLowerCase().startsWith(inputValue)
            );

            filteredLocations.forEach(location => {
                const suggestionItem = document.createElement("div");
                suggestionItem.classList.add("suggestion-item");
                suggestionItem.textContent = location;
                suggestionItem.onclick = function () {
                    input.value = location;
                    suggestionsContainer.innerHTML = ""; // Clear suggestions
                    suggestionsContainer.style.display = "none"; // Hide suggestions
                };
                suggestionsContainer.appendChild(suggestionItem);
            });

            suggestionsContainer.style.display = filteredLocations.length ? "block" : "none";
        } else {
            suggestionsContainer.style.display = "none";
        }
    }

    // Event listeners for bus tracking inputs
    startLocationInput.addEventListener("input", function () {
        const suggestionsContainer = document.getElementById("suggestions");
        showSuggestions(startLocationInput, suggestionsContainer);
    });

    destinationInput.addEventListener("input", function () {
        const suggestionsContainer = document.getElementById("destinationSuggestions");
        showSuggestions(destinationInput, suggestionsContainer);
    });

    // Event listeners for car tracking inputs
    carStartLocationInput.addEventListener("input", function () {
        const suggestionsContainer = document.getElementById("carStartSuggestions");
        showSuggestions(carStartLocationInput, suggestionsContainer);
    });

    carStopLocationInput.addEventListener("input", function () {
        const suggestionsContainer = document.getElementById("carStopSuggestions");
        showSuggestions(carStopLocationInput, suggestionsContainer);
    });

    // Event listener for the "Find Buses" button
    findBusesButton.addEventListener("click", function () {
        const startLocation = startLocationInput.value.trim();
        const destination = destinationInput.value.trim();

        if (!startLocation || !destination) {
            alert("Please enter both start location and destination.");
            return;
        }

        // Simulate fetching bus numbers (replace this with your actual API logic)
        const busNumbers = ["22", "35A", "62"];  // Example bus numbers

        if (busNumbers.length > 0) {
            busNumbersSelect.innerHTML = "";  // Clear previous options
            busNumbers.forEach(bus => {
                const option = document.createElement("option");
                option.value = bus;
                option.textContent = Bus Number: ${bus};
                busNumbersSelect.appendChild(option);
            });

            busNumbersContainer.style.display = "block";  // Show the bus numbers container
        } else {
            alert("No buses available for this route.");
        }
    });
});
document.getElementById('findBuses').addEventListener('click', function() {
    const startLocation = document.getElementById('startLocation').value;
    const destination = document.getElementById('destination').value;

    fetch('/track-bus', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            startLocation: startLocation,
            destination: destination
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const busNumbersSelect = document.getElementById('busNumbersSelect');
        busNumbersSelect.innerHTML = ''; // Clear previous options
        data.busNumbers.forEach(busNumber => {
            const option = document.createElement('option');
            option.value = busNumber;
            option.textContent = busNumber;
            busNumbersSelect.appendChild(option);
        });
        document.getElementById('busNumbersContainer').style.display = 'block';
    })
    .catch(error => {
        console.error('Error fetching bus numbers:', error);
        alert('An error occurred while fetching bus numbers.');
    });
});

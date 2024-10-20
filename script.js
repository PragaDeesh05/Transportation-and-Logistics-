document.addEventListener("DOMContentLoaded", () => {
    const destinationInput = document.getElementById('destination');
    const carStartLocationInput = document.getElementById('carStartLocation');
    const carStopLocationInput = document.getElementById('carStopLocation');
    const suggestionsContainer = document.getElementById('suggestions');
    const carStartSuggestionsContainer = document.getElementById('carStartSuggestions');
    const carStopSuggestionsContainer = document.getElementById('carStopSuggestions');

    // Locations extracted from the PDF
    const locations  = [
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

    // Suggest locations for the bus tracking input
    destinationInput.addEventListener('input', function () {
        const query = destinationInput.value.trim().toLowerCase();
        if (query.length > 0) {
            const filteredLocations = locations.filter(location => location.toLowerCase().includes(query));
            displaySuggestions(filteredLocations, suggestionsContainer);
        } else {
            clearSuggestions(suggestionsContainer);
        }
    });

    // Suggest locations for the car start location input
    carStartLocationInput.addEventListener('input', function () {
        const query = carStartLocationInput.value.trim().toLowerCase();
        if (query.length > 0) {
            const filteredLocations = locations.filter(location => location.toLowerCase().includes(query));
            displaySuggestions(filteredLocations, carStartSuggestionsContainer);
        } else {
            clearSuggestions(carStartSuggestionsContainer);
        }
    });

    // Suggest locations for the car stop location input
    carStopLocationInput.addEventListener('input', function () {
        const query = carStopLocationInput.value.trim().toLowerCase();
        if (query.length > 0) {
            const filteredLocations = locations.filter(location => location.toLowerCase().includes(query));
            displaySuggestions(filteredLocations, carStopSuggestionsContainer);
        } else {
            clearSuggestions(carStopSuggestionsContainer);
        }
    });

    // Display location suggestions in the provided container
    function displaySuggestions(suggestions, container) {
        container.innerHTML = '';
        if (suggestions.length > 0) {
            container.style.display = 'block'; // Show the suggestion box
            suggestions.forEach(suggestion => {
                const suggestionItem = document.createElement('div');
                suggestionItem.classList.add('suggestion-item');
                suggestionItem.textContent = suggestion;
                suggestionItem.addEventListener('click', () => selectSuggestion(suggestion, container));
                container.appendChild(suggestionItem);
            });
        } else {
            clearSuggestions(container);
        }
    }

    // Handle suggestion selection
    function selectSuggestion(selectedLocation, container) {
        if (container === suggestionsContainer) {
            if (selectedLocation === carStartLocationInput.value) {
                alert("Starting location cannot be the same as the destination.");
            } else {
                destinationInput.value = selectedLocation; // Set input to the selected location
            }
        } else if (container === carStartSuggestionsContainer) {
            if (selectedLocation === carStopLocationInput.value) {
                alert("Start location cannot be the same as the stop location.");
            } else {
                carStartLocationInput.value = selectedLocation; // Set input for car start
            }
        } else if (container === carStopSuggestionsContainer) {
            if (selectedLocation === carStartLocationInput.value) {
                alert("Stop location cannot be the same as the start location.");
            } else {
                carStopLocationInput.value = selectedLocation; // Set input for car stop
            }
        }
        clearSuggestions(container);
    }

    // Clear suggestions for a specific container
    function clearSuggestions(container) {
        container.innerHTML = '';
        container.style.display = 'none'; // Hide the suggestion box
    }

    // Add event listeners for form submissions (tracking form)
    const trackingForm = document.getElementById('trackingForm');
    trackingForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const destination = destinationInput.value.trim();
        if (destination) {
            findBusesByDestination(destination);
        }
    });

    // Function to find buses by destination
    function findBusesByDestination(destination) {
        // Replace this with your actual API request or logic to fetch bus routes
        fetch(`/api/findBuses?destination=${destination}`)
            .then(response => response.json())
            .then(data => {
                displayBuses(data, destination);
            })
            .catch(error => {
                console.error("Error fetching bus routes:", error);
                suggestionsContainer.innerHTML = `<p>No buses found for ${destination}.</p>`;
            });
    }

    // Function to display bus routes
    function displayBuses(buses, destination) {
        const destinationInfo = document.getElementById('destination-info');
        if (buses.length > 0) {
            let busList = buses.map(bus => `<li>Bus Number: ${bus.number}, Route: ${bus.route}</li>`).join('');
            destinationInfo.innerHTML = `<h3>Buses to ${destination}:</h3><ul>${busList}</ul>`;
        } else {
            destinationInfo.innerHTML = `<p>No buses found for ${destination}.</p>`;
        }
    }
    console.log('Script loaded');

});

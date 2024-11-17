document.addEventListener("DOMContentLoaded", () => {
    
    const apiKey ='3QpjBVXmMY3Qibj+KurJiJfjMD0A92tmWu0Wwi565Tc='
    const destinationSection = document.querySelector(".services-card");
    const topSellingSection = document.querySelector(".title-style .services-card");
    const subscriptionForm = document.querySelector(".form-text");
  
    
    fetch("https://api.brandfetch.io/v2/search/amadeus?c=1idP9BNtva7Bbo-5LEd")
      .then(response => response.json())
      .then(data => {
        populateDestinations(data.destinations);
        populateTopSelling(data.topSelling);
      })
      .catch(error => console.error("Error fetching data:", error));
  
    function populateDestinations(destinations) {
      destinationSection.innerHTML = ""; 
      destinations.forEach(destination => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <img src="${destination.image}" alt="" width="75">
          <h4>${destination.name}</h4>
          <p>${destination.description}</p>
        `;
        destinationSection.appendChild(card);
      });
    }
  
    function populateTopSelling(topSelling) {
      topSellingSection.innerHTML = ""; 
      topSelling.forEach(location => {
        const card = document.createElement("div");
        card.className = "destination-card";
        card.innerHTML = `
          <img src="${location.image}" alt="" width="75">
          <h4>${location.name}<span>${location.price}</span></h4>
          <p>${location.description}</p>
        `;
        topSellingSection.appendChild(card);
      });
    }
  
    subscriptionForm.addEventListener("submit", event => {
      event.preventDefault();
      const emailInput = subscriptionForm.querySelector(".form-control").value;
  
      fetch("http://localhost:3000/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput }),
      })
        .then(response => {
          if (response.ok) {
            alert("Subscribed successfully!");
            subscriptionForm.reset();
          } else {
            alert("Failed to subscribe. Please try again.");
          }
        })
        .catch(error => console.error("Error subscribing:", error));
    });
  });
  
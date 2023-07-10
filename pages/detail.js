document.getElementById("openModal").addEventListener("click", openModal);

function openModal() {
  const modal = document.getElementById("modal");
  const modalImage = document.getElementById("modalImage");

  
  modalImage.src = "/pages/img/MH_HarbiyeAcikHava.gif";

  modal.style.display = "block";
}

document.querySelector(".close").addEventListener("click", closeModal);

function closeModal() {
  document.getElementById("modal").style.display = "none";
}




async function populateTicketCategory() {
  try {
    const response = await axios.get('https://localhost:7296/api/TicketCategory');
    const categories = response.data;
    
    const categorySelect = document.getElementById('category');
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category.name;
      option.text = category.name;
      categorySelect.appendChild(option);
    });
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener('DOMContentLoaded', populateTicketCategory);

async function populateTicketPart() {
  try {
    const response = await axios.get('https://localhost:7296/api/Ticket');
    const tickets = response.data;

    const ticketPartSelect = document.getElementById('price');
    const ticketCategorySelect = document.getElementById('category');
    const selectedCategoryId = parseInt(ticketCategorySelect.value);

    ticketPartSelect.innerHTML = '';

    const filteredTickets = tickets.filter(ticket => {
      return (
        ticket.ticketCategoryId === selectedCategoryId ||
        ticket.ticketName === 'VİP' ||
        ticket.ticketName === 'Sahne Önü'
      );
    });

    filteredTickets.forEach(ticket => {
      const option = document.createElement('option');
      option.value = ticket.price;
      option.text = `${ticket.ticketName} - ${ticket.price} TL`;
      ticketPartSelect.appendChild(option);
    });

    
    ticketCategorySelect.addEventListener('change', () => {
      const selectedTicket = filteredTickets.find(ticket => ticket.ticketName === ticketCategorySelect.value);
      if (selectedTicket) {
        ticketPartSelect.value = selectedTicket.price;
      } else {
        ticketPartSelect.value = ''; 
      }
    });

  } catch (error) {
    console.error(error);
  }
}


document.addEventListener('DOMContentLoaded', populateTicketPart);

async function populateCities() {
  try {
    const response = await axios.get('https://localhost:7296/api/Place');
    const places = response.data;

    const citySelect = document.getElementById('city');

    places.forEach(place => {
      const option = document.createElement('option');
      option.value = place.city;
      option.text = place.city;
      citySelect.appendChild(option);
    });
  } catch (error) {
    console.error(error);
  }
}


document.addEventListener('DOMContentLoaded', populateCities);
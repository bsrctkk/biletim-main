var slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n) {
      showSlides(slideIndex += n);
    }

    function currentSlide(n) {
      showSlides(slideIndex = n);
    }

    function showSlides(n) {
      var i;
      var slides = document.getElementsByClassName("slide");
      var dots = document.getElementsByClassName("dot");
      if (n > slides.length) {
        slideIndex = 1;
      }
      if (n < 1) {
        slideIndex = slides.length;
      }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].className += " active";
    }

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
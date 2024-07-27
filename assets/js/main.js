/**
* Template Name: EstateAgency - v4.8.0
* Template URL: https://bootstrapmade.com/real-estate-agency-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Toggle .navbar-reduce
   */
  let selectHNavbar = select('.navbar-default')
  if (selectHNavbar) {
    onscroll(document, () => {
      if (window.scrollY > 100) {
        selectHNavbar.classList.add('navbar-reduce')
        selectHNavbar.classList.remove('navbar-trans')
      } else {
        selectHNavbar.classList.remove('navbar-reduce')
        selectHNavbar.classList.add('navbar-trans')
      }
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Search window open/close
   */
  let body = select('body');
  on('click', '.navbar-toggle-box', function(e) {
    e.preventDefault()
    body.classList.add('box-collapse-open')
    body.classList.remove('box-collapse-closed')
  })

  on('click', '.close-box-collapse', function(e) {
    e.preventDefault()
    body.classList.remove('box-collapse-open')
    body.classList.add('box-collapse-closed')
  })

  /**
   * Intro Carousel
   */
  new Swiper('.intro-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Property carousel
   */
  new Swiper('#property-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.propery-carousel-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * News carousel
   */
  new Swiper('#news-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.news-carousel-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Testimonial carousel
   */
  new Swiper('#testimonial-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.testimonial-carousel-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Property Single carousel
   */
  new Swiper('#property-single-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.property-single-carousel-pagination',
      type: 'bullets',
      clickable: true
    }
  });

})()


$(document).ready(function() {
  const apiUrl = 'https://si0sgs.github.io/EstateAgency/datos/propiedades.json';

  // Realiza la solicitud AJAX al API
  $.ajax({
      url: apiUrl,
      type: 'GET',
      dataType: 'json',
      success: function(data) {
          console.log('Datos recibidos:', data); // Verifica si los datos se están recibiendo
          const properties = data.propiedades;
          let htmlContent = '';

          // Recorre cada propiedad y crea el HTML correspondiente
          properties.forEach(function(property) {
              htmlContent += `
                  <div class="property-card">
                      <img src="${property.imagen}" alt="${property.clasificacion}" class="property-image">
                      <h3>${property.clasificacion}</h3>
                      <p>${property.descripcion}</p>
                      <p><strong>Precio:</strong> ${property.precio}</p>
                      <p><strong>Tipo:</strong> ${property.tipo}</p>
                      <p><strong>Área:</strong> ${property.detalle.area} m²</p>
                      <p><strong>Habitaciones:</strong> ${property.detalle.rooms}</p>
                      <p><strong>Pisos:</strong> ${property.detalle.floors}</p>
                      <p><strong>Garajes:</strong> ${property.detalle.garages}</p>
                  </div>
              `;
          });

          // Inserta el HTML en el contenedor
          $('#property-grid').html(htmlContent);
      },
      error: function(err) {
          console.error('Error fetching properties:', err);
          $('#property-grid').html('<p>Error al cargar las propiedades. Por favor, inténtalo de nuevo más tarde.</p>');
      }
  });
});

let lon;
let lat;
let temperature= document.querySelector(".temp")
let summary= document.querySelector(".summary")
let loc= document.querySelector(".location")
let icon= document.querySelector(".icon")
let humedad=document.querySelector(".hum");
let viento=document.querySelector(".viento");
const kelvin =273.15;


window.addEventListener("load",() =>{
if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position);
        lon=position.coords.longitude;
        lat=position.coords.latitude;


        const api="9069d23537e1f4ab07f7a904fd3811ad";
    
        const url_base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`;
        fetch(url_base)
        .then((response)=>{
            console.log("respuesta json");
           
            return response.json();

        })
        .then((data)=>{
            console.log("esta es la data");
            console.log(data);


            temperature.textContent=Math.floor(data.main.temp -kelvin)+"°C";
            summary.textContent=data.weather[0].description;
            loc.textContent= data.name +","+data.sys.country;
            humedad.textContent =data.main.humidity;
            viento.textContent =data.wind.speed;
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            document.getElementById('tiempoIcon').src = iconUrl;

           
            

        })

    })
}
$('#tblw').click(function() {
    if (lat && lon) {
        updateWeather(lat, lon);
    } else {
        alert("No se han obtenido las coordenadas.");
    }
});
}
)
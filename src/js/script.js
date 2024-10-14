/* $(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1000,
        adaptiveHeight: true,  
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left-solid.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right-solid.svg"></button>',
        responsive: [
            {
              breakpoint: 768,
              settings: {
                dots:true,
                arrows: false
              }
            },
            {
              breakpoint: 480,
              settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 1
              }
            }
          ]
        //dots: true // переключение снизу
        //autoplay: true, // автоматическое переключение
        //autoplaySpeed: 5000,
        //fade: true, // Появление с заднего фона 
        //cssEase: 'linear'
        //arrows: false // удаление стрелок
        
    });
});


 */




const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false
    /* axis: "vertical" */
});

document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
}) ;
document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
}) ;

$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
  $(this)
    .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
    .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
});


function toggleSlide(item){
  $(item).each(function(i){
    $(this).on('click', function(e){
      e.preventDefault();
      $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
      $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    })
  });
};

toggleSlide('.catalog-item__link');
toggleSlide('.catalog-item__back');

// Modal
$('[data-modal=consultation]').on('click', function(){
  $('.overlay, #consultation').fadeIn('slow');
});

$('.modal__close').on('click', function(){
  $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
});

$('.button_mini').on('click', function(){
  $('.overlay, #order').fadeIn('slow'); 
});

$('.button_mini').each(function(i){
  $(this).on('click', function(){
    $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
    $('.overlay, #order').fadeIn('slow'); 
  })
})

/* $('#consultation-form').validate();
$('#consultation form').validate({
  rules:{
    name: {
      required: true,
      minlength: 2
    },
    phone: "required",
    email: {
      required: true,
      email: true
    }
  },
  messages: {
    name: 
    {
      required: "Пожалуйста, введите свое имя",
      minlength: jQuery.validator.format("Введите {0} символов!")
    },
    phone: "Пожалуйста, введите свой номер телефона",
    email: {
      required: "Пожалуйста, введите свою почту",
      email: "Неправильно введен адрес почты"
    }
  }

});
$('#order form').validate(); */

function valideForms(form){
  $(form).validate({
    rules:{
      name: {
        required: true,
        minlength: 2
      },
      phone: "required",
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      name: 
      {
        required: "Пожалуйста, введите свое имя",
        minlength: jQuery.validator.format("Введите {0} символов!")
      },
      phone: "Пожалуйста, введите свой номер телефона",
      email: {
        required: "Пожалуйста, введите свою почту",
        email: "Неправильно введен адрес почты"
      }
    }
  
  });
};

valideForms('#consultation-form');
valideForms('#consultation form');
valideForms('#order form');
$('input[name=phone]').mask("+7 (999) 999-99-99");

$('form').submit(function(e){
  e.preventDefault();
  $.ajax({
    type: "POST", // отправляем на сервер
    url: "mailer/smart.php", // обработчик
    data: $(this).serialize()
  }).done(function(){
    $(this).find("input").val("");


    $('form').trigger('reset');
  });
  return false;
});

// smooth scroll and pageup

$(window).scroll(function(){
  if($(this).scrollTop() > 1600){
    $('.pageup').fadeIn();
  } else {
    $('.pageup').fadeOut();
  }
});

$("a[href='#up']").click(function(){
  const _href = $(this).attr("href");
  $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
  return false;
});

new WOW().init();





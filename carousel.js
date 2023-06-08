
$('.uix-designer-container').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    cssEase: 'linear',
    asNavFor: '.my-carousel',
    infinite: true,
});
$('.my-carousel').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.uix-designer-container',
    arrows: true,
    centerMode: true,
    focusOnSelect: true,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
});

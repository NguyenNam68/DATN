var link = location.pathname;
if(link === "/"){
    //Slider
    //Cho biết đang ở slide nào
    var currentSlideIndex=2;

    var slideArray = document.querySelectorAll('.sliders');

    //Đưa vào source HTML
    function buildSlider(){
        //Hiển thị slide đầu tiên
        document.getElementById("slide" + currentSlideIndex).style.left=0;
    }

    buildSlider();
    //Xử lý bấm nút chuyển slide trước
    function prevSlide(){
        //Tìm slide trước
        var nextSlideIndex;
        if(currentSlideIndex === 2)
        {
            nextSlideIndex = slideArray.length+1;
        }else{
            nextSlideIndex = currentSlideIndex - 1;
        }

        //Ẩn slide hiện tại, hiện slide "currentSlideIndex"
        document.getElementById("slide" + nextSlideIndex).style.left = "-100%";
        document.getElementById("slide" + currentSlideIndex).style.left = 0;

        //Thêm class để chuyển slide có animation
        document.getElementById("slide" + nextSlideIndex)
        .setAttribute("class" , "singleSlide slideInLeft");
        document.getElementById("slide" + currentSlideIndex)
        .setAttribute("class", "singleSlide slideOutRight");

        //Cập nhật giá trị slide hiện tại
        currentSlideIndex = nextSlideIndex;
    }

    //Xử lý bấm nút chuyển slide tiếp theo
    function nextSlide(){
        var nextSlideIndex;
        if(currentSlideIndex === slideArray.length + 1){
            nextSlideIndex = 2;
        }else{
            nextSlideIndex = currentSlideIndex + 1;
        }

        document.getElementById("slide" + nextSlideIndex).style.left = "100%";
        document.getElementById("slide" + currentSlideIndex).style.left = 0;

        document.getElementById("slide" + nextSlideIndex)
        .setAttribute("class", "singleSlide slideInRight");
        document.getElementById("slide" + currentSlideIndex)
        .setAttribute("class", "singleSlide slideOutLeft");

        currentSlideIndex = nextSlideIndex;
    }

    var inter;
    var timer=function(){
        inter = setInterval(function(){
            nextSlide();
        }, 5000);
    };
    //Tự động chuyển Slide
    document.addEventListener("DOMContentLoaded", function(){
        //Tự động
        timer();
    });

    var buttonSlides = document.querySelectorAll('.slideButton');
    for(var i  = 0 ; i < buttonSlides.length; i++){
        buttonSlides[i].addEventListener('click',function(){
            clearInterval(inter);
        });
    }

    //Slick Slider Product


    //Slick Slider Feedback
    $(document).ready(function(){
        $('.main-service__feedback-slide').slick({
            prevArrow : false,
            nextArrow : false,
            autoplay: true,
            autoplaySpeed: 2000,
            pauseOnFocus : true,
        });
    });
}

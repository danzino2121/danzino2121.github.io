$(document).ready(function(){
    
    // I've divide my script blocks into functions for keep global scope clean
    // Start toggle script
    menuToggling();
    
    function menuToggling() {
        // Submenu toggle script (desktop)
        let submenuBtns = document.querySelectorAll(".submenu-btn");
        submenuBtns.forEach(btn => {
            // Toggle .submenu of its parent
            btn.onclick = function(e) {
                e.preventDefault();
                let menu = btn.parentElement.querySelector(".submenu");
                menu.classList.toggle("show");
            }
        })

        // Menu-btn toggle (mobile)
        let menuBtn = document.querySelector(".menu-btn");
        menuBtn.onclick = function() {
            this.classList.toggle("close");
            let menu = document.querySelector(".nav");
            menu.classList.toggle("show");
        }
    }

    // Header background slider
    bgSlider();
    
    function bgSlider() {
        let header = document.querySelector("header");
        let dots = header.querySelectorAll(".dot");
        dots.forEach((dot, i) => {
            dot.onclick = function() {
                // Do not toggle active btn
                if (this.classList.contains("active")) return;

                // Manipulation with dot's active class
                clearActiveDots();
                this.classList.add("active");

                // Custom styles
                header.style.opacity = 0

                // Custom animation (change this to spec class)
                setTimeout(function() {
                    header.style.backgroundImage = `url(img/header-bg-${i + 1}.jpg)`;
                    header.style.opacity = 1;
                }, 300)
            }
        });

        function clearActiveDots() {
            dots.forEach(dot => {
                dot.classList.remove("active");
            })
        }
    }
    
    // Waypoints
    $(".section__head h2").animated("fadeInLeft");
    $(".tours .tour-btn").animated("fadeInLeft");
    $(".advantages p").animated("fadeInRight");
    $(".advantages .img-wrap").animated("fadeInLeft");
    $(".form").animated("fadeInUp");
    $("footer").waypoint(function() {
        $("footer .content > div").each(function(index) {
            setTimeout(() => {
                this.classList.add("animated", "fadeInRight");
            }, 150 * index);
        });
    }, {
        offset : "180%"
    });

    // Slick.js Slider (it needs jQuery)
    $('.tours .slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: $(".slider-buttons .btn-prev"),
        nextArrow: $(".slider-buttons .btn-next"),
        responsive: [{
            breakpoint: 1650,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                prevArrow: $(".slider-buttons .btn-prev"),
                nextArrow: $(".slider-buttons .btn-next"),
            }
        },{
            breakpoint: 1200,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                centerMode: true,
                prevArrow: $(".slider-buttons .btn-prev"),
                nextArrow: $(".slider-buttons .btn-next"),
            }
        },{
            breakpoint: 968,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                prevArrow: $(".slider-buttons .btn-prev"),
                nextArrow: $(".slider-buttons .btn-next"),
            }
        },{
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: true,
                variableWidth: true,
                prevArrow: $(".slider-buttons .btn-prev"),
                nextArrow: $(".slider-buttons .btn-next"),
            }
        },{
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                prevArrow: $(".slider-buttons .btn-prev"),
                nextArrow: $(".slider-buttons .btn-next"),
            }
        }]
    });
    
    // Change slides (hot & popular tours)
    $('.tour-btn').on('click', function(){
        if ( $(this).hasClass("active") ) return;
        
        $('.tours .slider').slick('slickUnfilter');
        // Change shown tours
        let type = $(this).attr("data-tour-type");
        console.log(type)
        $('.tours .slider').slick('slickFilter', "." + type);
        
        // Set this .active; unset .active from all another
        $(".tour-btn").each(function() {
            $(this).removeClass("active");
        });
        
        $(this).addClass("active");
        
    });
    
    
    // Validation
    // Choose form and run on submit function validate ( forms[ form's name attribute ] )
    document.forms["offer-form"].onsubmit = validate;
    
    function validate(e) {
        e.preventDefault();
        
        // Inputs
        let inputName = this.elements["username"];
        let inputEmail = this.elements["email"];
        let inputPhone = this.elements["phone"];
        
        // In new RegExp I must use double escaping instead of usual 
        let nameRegex = new RegExp("^[a-zA-Zа-яА-Я ]+$");
        let emailRegex = new RegExp("^[a-zA-Z0-9]+@[a-z]{2,5}\\.[a-z]{2,4}$");  // example@mail.com
        let phoneRegex = new RegExp("^\\+?[0-9]{2,3}?\\s?\\(?[0-9]{3}\\)?\\s?[0-9]{3}\\s?[0-9]{2}\\s?[0-9]{2}$");  // +38 (098) 000 00 00 || 098 000 00 00
        
        // Simple error messages 
        let nameError = "Имя должно состоять из букв английского или русского алфавита и только из букв: Виктор, Viktor ";
        let emailError = "E-mail должен выглядеть так: example@mail.com";
        let phoneError = "Номер должен быть прописан таким образом: +38 098 000 00 00 , или таким: 098 000 00 00";
        
        // Short function for checking inputs
        function checkInput(field, regex, errorMessage) {
            if (!regex.test( field.value )) {
                alert(errorMessage);
                field.style.border = "1px solid red";
                return false;
            } else {
                field.style.border = "";
                return true;
            }
        }
        
        // Check in-place
        let isCorrect = true;
        isCorrect = checkInput(inputName, nameRegex, nameError);
        isCorrect = checkInput(inputEmail, emailRegex, emailError);
        isCorrect = checkInput(inputPhone, phoneRegex, phoneError);
        
        if (isCorrect) {
            let userData = {
                name: inputName.value,
                email: inputEmail.value,
                phone: inputPhone.value
            }
            
            console.log("userData = " + JSON.stringify(userData));
        }
        
        return false;
    }
    
    // Slide to form on click
    $("header .content .btn").click(function (e) {
        e.preventDefault();
		elementClick = $(this).attr("href");
		destination = $(elementClick).offset().top;
		$("body,html").animate({scrollTop: destination }, 800);
	});
    
    // Lazy load 
    lazyLoad();
    
    function lazyLoad() {
        
        let images = document.querySelectorAll("img[data-src]");
        
        // Observer is used to update images only in the viewport
        let options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.1
        }
        let observer = new IntersectionObserver(handleImg, options);

        images.forEach(img => {
            observer.observe(img);
        })

        function handleImg(myImages) {
            myImages.forEach(myImg => {
                if (myImg.intersectionRatio > 0) {
                    loadImage(myImg.target);
                }
            });
        }

        // I change src to real image and clean data-src
        function loadImage(image) {
            image.src = image.getAttribute("data-src");
            observer.unobserve(image);
            image.removeAttribute("data-src");
        }
    }
    
    // Sticky footer (with js, 'cause height is not fixed)
    stickyFooter();
    
    function stickyFooter() {
        var foot = document.querySelector('footer');
        var footHeight = foot.offsetHeight;
        foot.style.marginTop = -footHeight+"px";
        document.querySelector('main').style.paddingBottom = footHeight+"px";
    }
    
    
    
});


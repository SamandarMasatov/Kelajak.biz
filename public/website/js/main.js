
$(document).ready(function(){ 
    window.asd = $('.SlectBox').SumoSelect({ csvDispCount: 3, selectAll:true, captionFormatAllSelected: "" });
            window.test = $('.testsel').SumoSelect({okCancelInMulti:true, captionFormatAllSelected: "Yeah, OK, so everything." });

            window.testSelAll = $('.testSelAll').SumoSelect({okCancelInMulti:true, selectAll:true });

            window.testSelAll2 = $('.testSelAll2').SumoSelect({selectAll:true});

            window.testSelAlld = $('.SlectBox-grp').SumoSelect({okCancelInMulti:true, selectAll:true, isClickAwayOk:true });

            window.Search = $('.search-box').SumoSelect({ csvDispCount: 3, search: true, searchText:'Enter here.' });
            window.sb = $('.SlectBox-grp-src').SumoSelect({ csvDispCount: 3, search: true, searchText:'Enter here.', selectAll:true });
            window.searchSelAll = $('.search-box-sel-all').SumoSelect({ csvDispCount: 3, selectAll:true, search: true, searchText:'Enter here.', okCancelInMulti:true });
            window.searchSelAll = $('.search-box-open-up').SumoSelect({ csvDispCount: 3, selectAll:true, search: false, searchText:'Enter here.', up:true });
            window.Search = $('.search-box-custom-fn').SumoSelect({ csvDispCount: 3, search: true, searchText:'Enter here.', searchFn: function(haystack, needle) {
              var re = RegExp('^' + needle.replace(/([^\w\d])/gi, '\\$1'), 'i');
              return !haystack.match(re);
            } });

            window.groups_eg_g = $('.groups_eg_g').SumoSelect({selectAll:true, search:true });


            $('.SlectBox').on('sumo:opened', function(o) {
              console.log("dropdown opened", o)
            });


    $('.js-example-basic-single').select2();


    $("header span.bars_header").click(function(){
        $("header div.header_media").css({
            'transform': 'translateX(0%)'
        });
        $("div.fixtop").css({
            'display': 'block',
       
        });
        
        
    });
    $("header a.click_drop").click(function(){
        $("ul#drop").slideToggle(0);
    });

    $("header i.exit_media").click(function(){
        $("header div.header_media").css({
            'transform': 'translateX(-102%)'
        });
        $("div.fixtop").css({
            'display': 'none',
            // 'z-index': '7'
        });
    });
    $("div.fixtop").click(function(){
        $("header div.header_media").css({
            'transform': 'translateX(-102%)'
        });
        $("div.fixtop").css({
            'display': 'none',
            // 'z-index': '7'
        });
    });



    $(".tolovlar div.one_month div.top span i").click(function(){
        $(".tolovlar div.one_month div.content").toggleClass("none_content");
        $(this).addClass("none");
        $(".tolovlar div.one_month div.top span i").not(this).removeClass("none");
    });

    $(".tolovlar div.two_month div.top span i").click(function(){
        $(".tolovlar div.two_month div.content").toggleClass("none_content");
        $(this).addClass("none");
        $(".tolovlar div.two_month div.top span i").not(this).removeClass("none");
    });

   

    $("div.profile_kurs div.now_courses span i").click(function(){
        $("div.profile_kurs div.now_courses div.content").slideToggle(0);
        $(this).addClass("not");
        $("div.profile_kurs div.now_courses span i").not(this).removeClass("not");
    });
    $("div.profile_kurs div.ended_courses span i").click(function(){
        $("div.profile_kurs div.ended_courses div.content").slideToggle(0);
        $(this).addClass("not");
        $("div.profile_kurs div.ended_courses span i").not(this).removeClass("not");
    });



    $(".dashboard_content div.elon div.top div.right i").click(function(){
        $(this).addClass("none");
        $(".dashboard_content div.elon div.top div.right i").not(this).removeClass("none");
        $(".dashboard_content div.elon .elon_content").slideToggle(0);
    });

    $(".dashboard_content div.profil_card div.top div.right i").click(function(){
        $(this).addClass("none");
        $(".dashboard_content div.profil_card div.top div.right i").not(this).removeClass("none");
        $(".dashboard_content div.profil_card .profil_content").slideToggle(0);
    });
    var len_pas = parseInt($("h3.parol_view").text().length);
    var pas_val = $("h3.parol_view").text();
    var ss = "*";
    for(var i = 0; i<len_pas-1; i++){
        ss = "*" + ss;
    }
    $("h3.parol_view").text(ss);

    $(".simple_eye").click(function(){
        $("h3.parol_view").text(pas_val);
        $(this).addClass("not");
        $(".slash_eye").removeClass("not");
    }); 
    $(".slash_eye").click(function(){
        var len_pas = parseInt($("h3.parol_view").text().length);

        var ss = "*";
        for(var i = 0; i<len_pas-1; i++){
            ss = "*" + ss;
        }
        $("h3.parol_view").text(ss);
        $(this).addClass("not");
        $(".simple_eye").removeClass("not");
    });

    $("div.card_list .cardd").click(function(){

        $(this).addClass("active_svg");
        $("span.listt").removeClass("active_svg");


         $("div.cours_paginition aside").css({
            'border': 'none',
         });
        //  $("div.cours_paginition aside").addClass("flex_a");
         $("div.cours_paginition aside a.items").css({
            'display': 'block',
            'width': '23%',
            'margin-right': '17px',
            'margin-bottom': '15px',
            'box-shadow': '0px 3px 4px rgba(0, 0, 0, 0.2)',
            'border': '1px solid #BFBFBF',

            'padding': '0px'
         });
         $("div.cours_paginition aside a div.row_card").css({
            'flex-wrap': 'wrap'
         });
         $("div.cours_paginition aside a div.row_card .left").css({
            'width': '100%'
         });
         $("div.cours_paginition aside a div.row_card .center").css({
            'width': '100%',
            'padding-right': '15px',
            'padding-bottom': '15px',
        });
        $("div.cours_paginition aside a div.row_card .center .joy").css({
            'justify-content': 'flex-start'
        });
        $("div.cours_paginition aside a div.row_card .center .top").css({
            'flex-wrap': 'wrap'
        });
        $("div.cours_paginition aside a div.row_card .center .top .rat").css({
            'margin-top': '10px',
            'margin-bottom': '5px',

        });
        $("div.cours_paginition aside a div.row_card .center div.info_text").css({
            'display': 'none'
        }); 
    });



    $("div.card_list .listt").click(function(){

        $(this).addClass("active_svg");
        $("span.cardd").removeClass("active_svg");


         $("div.cours_paginition aside").css({
            'border': '0.5px solid #BFBFBF',
            'border-bottom': 'none !important',
            'border-left': 'none !important',
         });
        //  $("div.cours_paginition aside").addClass("flex_a");
         $("div.cours_paginition aside a.items").css({
            'display': 'block',
            'width': '100%',
            'margin-right': '0px',
            'margin-bottom': '0px',
            'box-shadow': 'none',
            
            'border-bottom': '0.5px solid #BFBFBF',
            'border-left': '0.5px solid #BFBFBF',
            'border-top': 'none',
            'border-right': 'none',
            'padding': '20px'
         });
         $("div.cours_paginition aside a div.row_card").css({
            'flex-wrap': 'wrap'
         });
         $("div.cours_paginition aside a div.row_card .left").css({
            'width': '25%'
         });
         $("div.cours_paginition aside a div.row_card .center").css({
            'width': '75%',
            'padding-right': '0px',
            'padding-bottom': '0px',
        });
        $("div.cours_paginition aside a div.row_card .center .joy").css({
            'justify-content': 'flex-end'
        });
        $("div.cours_paginition aside a div.row_card .center .top").css({
            'flex-wrap': 'wrap'
        });
        $("div.cours_paginition aside a div.row_card .center .top .rat").css({
            'margin-top': '0px',
            'margin-bottom': '0px',

        });
        $("div.cours_paginition aside a div.row_card .center div.info_text").css({
            'display': 'block'
        }); 
    });

    

    if($("#checkedAll").is(":checked")){
        $(".checkSingle").each(function() {
            this.checked=true;
        });
    }


    $("#checkedAll").change(function() {
        if (this.checked) {
            $(".checkSingle").each(function() {
                this.checked=true;
            });
        } else {
            $(".checkSingle").each(function() {
                this.checked=false;
            });
        }
    });

    $(".checkSingle").click(function () {
        if ($(this).is(":checked")) {
            var isAllChecked = 0;

            $(".checkSingle").each(function() {
                if (!this.checked)
                    isAllChecked = 1;
            });

            if (isAllChecked == 0) {
                $("#checkedAll").prop("checked", true);
            }     
        }
        else {
            $("#checkedAll").prop("checked", false);
        }
    });

    var ll = parseInt($("div.cours_paginition div#content .items").length);
    for(var i = 0; i<ll; i++){
        $("div.cours_paginition .items").eq(i).addClass("id_items" + i);
    }
    var aside_len = Math.ceil(ll/8);

    for(var i = 0; i<aside_len; i++){
        if(i == 0){
            $("div.cours_paginition div#content").append("<aside class='act' id='aside" + i + "'></aside>");
        }
        else{
            $("div.cours_paginition div#content").append("<aside id='aside" + i + "'></aside>");
        }
    }
    var sas = 0;

        for(var j = 0; j<ll; j++){
            var aim = $("div.cours_paginition .id_items" + j);
            if(j%8 == 0 && j!=0){
                sas=sas+1;
            }
            $("div.cours_paginition div#content aside#aside" + sas).append(aim);

            
        }

    
    $("div.carousel_mnogo div.next2").click(function(){
        $("div.carousel_mnogo .owl-next").click();
    });
    $("div.carousel_mnogo div.next31").click(function(){
        $("div.mnogo31 .owl-next").click();
    });
    $("div.carousel_mnogo div.next32").click(function(){
        $("div.mnogo32 .owl-next").click();
    });
    $(".davomt_car div.davomat_one div.next_davomat").click(function(){
        $(".davomt_car div.davomat_one .owl-next").click();
    });
    $(".davomt_car div.davomat_two div.next_davomat").click(function(){
        $(".davomt_car div.davomat_two .owl-next").click();
    });
    var plen = $("div.cours_paginition div#content aside").length;
    
    for(var i = 1; i<=plen; i++){

        if(i == 1){
            $("#pagingControls ul").append("<li class='active'>" + i + "</li>");
        }
        else{
            $("#pagingControls ul").append("<li>" + i + "</li>");
        }
    }
  
    var aa = $('div#pagingControls li');
	var divv = $('div.cours_paginition aside');

	aa.click(function(){
        $(this).addClass("active");
        aa.not(this).removeClass("active");
		divv.removeClass('act').eq($(this).index()).addClass('act');

        if(parseInt($('div#pagingControls li.active').text()) == plen ){
            $("div#pagingControls .next").addClass("zap");
        }
        if(parseInt($('div#pagingControls li.active').text()) > 1 ){
            $("div#pagingControls .prev").removeClass("zap");
        }
        if(parseInt($('div#pagingControls li.active').text()) == 1 ){
            $("div#pagingControls .prev").addClass("zap");
        }
        if(parseInt($('div#pagingControls li.active').text()) < plen ){
            $("div#pagingControls .next").removeClass("zap");
        }
    });
    
    $("div#pagingControls .next").click(function(){
        
        if(parseInt($('div#pagingControls li.active').text()) < plen ){

            $('div.cours_paginition aside.act').addClass("act0");
            $('div.cours_paginition aside.act').next().addClass("act");
            $('div.cours_paginition aside.act0').removeClass("act");
            $("div.cours_paginition aside").removeClass("act0");

            $('div#pagingControls li.active').addClass("active0");
            $('div#pagingControls li.active').next().addClass("active");
            $('div#pagingControls li.active0').removeClass("active");
            $('div#pagingControls li').removeClass("active0");
        }
        if(parseInt($('div#pagingControls li.active').text()) == plen ){
            $("div#pagingControls .next").addClass("zap");
        }
        if(parseInt($('div#pagingControls li.active').text()) > 1 ){
            $("div#pagingControls .prev").removeClass("zap");
        }
    });

    $("div#pagingControls .prev").click(function(){
       
        
        if(parseInt($('div#pagingControls li.active').text()) > 1 ){


            $('div.cours_paginition aside.act').addClass("act0");
            $('div.cours_paginition aside.act').prev().addClass("act");
            $('div.cours_paginition aside.act0').removeClass("act");
            $("div.cours_paginition aside").removeClass("act0");
            // $("div.cours_paginition aside.act:first-child").removeClass("act");


            $('div#pagingControls li.active').addClass("active0");
            $('div#pagingControls li.active').prev().addClass("active");
            $('div#pagingControls li.active0').removeClass("active");
            $('div#pagingControls li').removeClass("active0");
        }
        if(parseInt($('div#pagingControls li.active').text()) == 1 ){
            $("div#pagingControls .prev").addClass("zap");
        }
        if(parseInt($('div#pagingControls li.active').text()) < plen ){
            $("div#pagingControls .next").removeClass("zap");
        }
    });

      

    $("div.owl_next").click(function(){
        $("nav.active .owl-next").click();
    });

    $("div.cours_one .next2").click(function(){
        $("div.cours_one button.owl-next").click();
    });
    $("div.tavsiya .prev2").click(function(){
        $("div.tavsiya button.owl-prev").click();
    });

    $("div.inputdiv input").focus(function(){
        $(this).parent().find("path").css({
            'fill': '#24B383'
        });
    });

    $("div.inputdiv input").focusout(function(){
        $(this).parent().find("path").css({
            'fill': '#999999'
        });
    });

    var ht = $('div.header_top');
    var htc = $('div.header_top button.enter_button');
    htc.click(function(){
        ht.slideUp(300);
    });
    
    var click_login = $("header button.enter_button");
    var click_login2 = $("header span.enter");
    var login = $("div.login1");
    var login2 = $("div.login2");
    var exit = $("div.login i.exit");
    var exit2 = $("div.fixvh");


    $(window).scroll(function(){
        login.css({
            'top': 320 + scrollY +  'px'
        });
        $("div.login").css({
            'top': 200 + scrollY +  'px'
        });
        $(".sucsess").css({
            'top': 320 + scrollY +  'px'
        });
        
    });

    $("div.yozilish div.register").click(function(){
        $("div.cours_write").css({
            'transform': 'translate(-50%, -50%) scale(1)'
        });
        exit2.css({
            'display': 'block'
        });
        $("body").css({
            'overflow-y': 'hidden'
        });
    });

    $(".write_cours").click(function(){
        $(".sucsess").css({
            'transform': 'translate(-50%, -50%) scale(1)'
        });
        $("div.cours_write").css({
            'transform': 'translate(-50%, -50%) scale(0)'
        });
    });

    click_login.click(function(){
        login.css({
            'transform': 'translate(-50%, -50%) scale(1)'
        });
        exit2.css({
            'display': 'block'
        });
        $("body").css({
            'overflow-y': 'hidden'
        });
    });
    $(".login1 div.botitem .enter2").click(function(){
        
        login.css({
            'transform': 'translate(-50%, -50%) scale(0)'
        });
        $("div.login2").css({
            'transform': 'translate(-50%, -50%) scale(1)'
        });
        exit2.css({
            'display': 'block'
        });
        $("body").css({
            'overflow-y': 'hidden'
        }); 
    });
    click_login2.click(function(){
        $("div.login2").css({
            'transform': 'translate(-50%, -50%) scale(1)'
        });
        exit2.css({
            'display': 'block'
        });
        $("body").css({
            'overflow-y': 'hidden'
        });
    });

    exit.click(function(){
        $(".sucsess").css({
            'transform': 'translate(-50%, -50%) scale(0)'
        });
        login.css({
            'transform': 'translate(-50%, -50%) scale(0)'
        });
        $("div.login").css({
            'transform': 'translate(-50%, -50%) scale(0)'
        }); 
        login2.css({
            'transform': 'translate(-50%, -50%) scale(0)'
        });
        exit2.css({
            'display': 'none'
        });
        $("body").css({
            'overflow-y': 'unset'
        });
    });
    
    $("div.sucsess .okk").click(function(){
        exit2.css({
            'display': 'none'
        }); 
        $(".sucsess").css({
            'transform': 'translate(-50%, -50%) scale(0)'
        });
        $("body").css({
            'overflow-y': 'unset'
        });
    });
    exit2.click(function(){
        $(".sucsess").css({
            'transform': 'translate(-50%, -50%) scale(0)'
        });
        $("div.login").css({
            'transform': 'translate(-50%, -50%) scale(0)'
        }); 
        login.css({
            'transform': 'translate(-50%, -50%) scale(0)'
        }); 
        login2.css({
            'transform': 'translate(-50%, -50%) scale(0)'
        });
        exit2.css({
            'display': 'none'
        });
        $("body").css({
            'overflow-y': 'unset'
        });
    });

    /////////////////////////////////////////////////////// Tab_index
    var a = $('div.right ul.tab li');
	var div = $('div.right nav.tab-content nav');

	a.click(function(){
        $(this).addClass("activ");
        a.not(this).removeClass("activ");
		div.removeClass('active').eq($(this).index()).addClass('active');

    });
    
    var itab = $('div.tab_index_all ul li');
	var ctab = $('div.tab_index_all nav');

	itab.click(function(){
        $(this).addClass("activ");
        itab.not(this).removeClass("activ");
		ctab.removeClass('active_nav').eq($(this).index()).addClass('active_nav');

    });

    var ktab = $('div.watch-tab ul li');
	var jtab = $('div.watch-tab nav');

	ktab.click(function(){
        $(this).addClass("activ-watch");
        ktab.not(this).removeClass("activ-watch");
		jtab.removeClass('active-watch-nav').eq($(this).index()).addClass('active-watch-nav');

    });
    
    // $('.watch-carousel').owlCarousel({
	//     nav: true,
	//     responsive:{
	//         0:{
    //             items:1,
	//         },
	//         300:{
    //             items:1,
	//         },
	//         600:{
    //             items:1,
	//         },
	//         1000:{
	//             items:2,
	//         }
	//     }
    // })
    $('.slide_carousel').owlCarousel({ 
	    loop:true,
	    autoplay: false,
	    nav: true,
	    responsive:{
	        0:{
                items:1,
	        },
	        300:{
                items:1,
	        },
	        600:{
                items:1,
	        },
	        1000:{
	            items:1,
	        }
	    }
    });
    $('.cours-carousel1').owlCarousel({
	    loop:true,
	    autoplay: true,
        autoplayTimeout: 3000,
        margin: 20,
        slideBy: 1,
	    nav: true,
	    responsive:{
	        0:{
                items:1,
	        },
            385:{
                items:1.5,
	        },
	        500:{
                items:2,
	        },
	        768:{
                items:3,
	        },
	        1000:{
	            items:4
	        }
	    }
    });
    $('.cours-carousel2').owlCarousel({
	    // loop:true,
	    autoplay: false,
        margin: 20,
        slideBy: 4,

	    nav: true,
	    responsive:{
	        0:{
                items:1,
	        },
	        300:{
                items:1.5,
	        },
	        700:{
                items:3,
	        },
	        1000:{
	            items:4
	        }
	    }
    });
    
    $('.cours-carousel3').owlCarousel({
	    // loop:true,
	    autoplay: false,
        margin: 20,
        slideBy: 4,

	    nav: true,
	    responsive:{
	        0:{
                items:1,
	        },
	        300:{
                items:1.5,
	        },
	        700:{
                items:3,
	        },
	        1000:{
	            items:4
	        }
	    }
    });
    
    $('.cours-carousel4').owlCarousel({
	    // loop:true,
	    autoplay: false,
        margin: 20,
        slideBy: 4,

	    nav: true,
	    responsive:{
	        0:{
                items:1,
	        },
	        300:{
                items:1.5,
	        },
	        700:{
                items:3,
	        },
	        1000:{
	            items:4
	        }
	    }
	});

    $('.carus5').owlCarousel({
	    loop:true,
	    autoplay: true,
        margin: 20,
	    nav: true,
	    responsive:{
	        0:{
                items:1,
	        },
	        300:{
                items:1,
	        },
	        600:{
                items:1,
	        },
	        1000:{
	            items:1
	        }
	    }
    });
    $('.reklama5').owlCarousel({
	    loop:true,
	    autoplay: true,
        margin: 20,
        autoplayTimeout: 9000,
	    nav: true,
	    responsive:{
	        0:{
                items:1,
	        },
	        300:{
                items:1,
	        },
	        600:{
                items:1,
	        },
	        1000:{
	            items:1
	        }
	    }
    });
    $('.right_carousel').owlCarousel({
	    loop:true,
	    autoplay: true,
        margin: 20,
	    nav: true,
	    responsive:{
	        0:{
                items:1,
	        },
	        300:{
                items:1,
	        },
	        600:{
                items:1,
	        },
	        1000:{
	            items:1
	        }
	    }
    });
    $('.cours_type').owlCarousel({
	    loop:true,
	    autoplay: true,
        margin: 20,
	    nav: true,
	    responsive:{
	        
	        300:{
                items:2,
	        },
	        600:{
                items:3,
	        },
	        1000:{
	            items:5
	        }
	    }
    });
    

    $('.carus_mnogo').owlCarousel({
	    loop:true,
	    autoplay: true,
        autoplayTimeout: 3000,
        margin: 20,
	    nav: true,
	    responsive:{
            0:{
                items:1,
	        },
	        300:{
                items:1,
	        },
	        400:{
                items:2,
	        },
            900:{
                items:3,
	        },
	        1200:{
	            items:4
	        }
	    }
    });
    $('.davomat_carousel_one').owlCarousel({
	    loop:false,
	    // autoplay: true,
        margin: 20,
	    nav: true,
	    responsive:{
	        
	        300:{
                items:1,
	        },
	        600:{
                items:2,
	        },
	        1000:{
	            items:3
	        }
	    }
    });
});

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()



  
  
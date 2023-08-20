$(function () {
  // menu
  let menuWidth = $(".navigation").innerWidth();
  $("header").css("left", -menuWidth);

  // open
  $(".open").click(function (e) {
    e.stopPropagation();
    e.preventDefault();
    console.log(e.target);
    $("header").animate({ left: "0" }, 500);
    // home content
    $(".home__content").animate({ left: menuWidth / 2 }, 500);

    $(".open").fadeOut(10);
  });

  // close
  $(".close").click(function (e) {
    e.stopPropagation();
    e.preventDefault();
    $("header").animate({ left: -menuWidth }, 300, function () {
      $(".open").fadeIn(300);
    });
    $(".home__content").animate({ left: "0" }, 500);
  });
  // Escape pressed
  $(document).keydown(function (e) {
    console.log(e);
    if (e.key == "Escape") {
      $("header").animate({ left: -menuWidth }, 300, function () {
        $(".open").fadeIn(300);
      });
      $(".home__content").animate({ left: "0" }, 500);
    }
  });
  // click on document
  // $("body").click(function (e) {
  //   e.preventDefault();

  //   $("header").animate({ left: -menuWidth }, 300, function () {
  //     $(".open").fadeIn(300);
  //   });
  // });

  //   scrollto by menu

  $(".nav__link:not(:first)").click(function () {
    $(".nav__link:not(:first)").not(this).removeClass("active");
    $(this).addClass("active");
    let navHref = $(this).attr("href");
    // console.log(navHref);
    let offsetTop = $(navHref).offset().top;
    // console.log(offsetTop);
    $("body, html").animate({ scrollTop: offsetTop }, 1000);
  });

  // scroll window to bottom

  let offsetAccordion = $("#accordions").offset().top - 450;

  $(window).scroll(() => {
    let windowScroll = $(window).scrollTop();
    console.log(windowScroll >= offsetAccordion);
    if (windowScroll >= offsetAccordion) {
      console.log($("#accordions").offset().top);
      $(".btn").css("background-color", "rgb(214, 46, 51)");
    } else {
      $(".btn").css("background-color", "transparent");
    }
  });

  // accordion
  $(".accordion .accordion__item p:not(:first)").css("display", "none");
  $(".accordion .accordion__item h3").on("click", function () {
    $(this).siblings().slideToggle(600);
    $(".accordion .accordion__item h3").not(this).next().slideUp(500);
  });

  // duration

  // day and hour and minute and  second in milliseconds
  const day = 24 * 60 * 60 * 1000;
  const hour = 60 * 60 * 1000;
  const minute = 60 * 1000;
  const second = 1000;
  const dateFuture = new Date("2023 10 25");
  console.log(dateFuture.getTime());

  // function to calculate

  const stop = setInterval(function () {
    // date now
    const dateNow = new Date();
    //   console.log(dateNow.getTime());

    const dataRemainder = dateFuture.getTime() - dateNow.getTime();
    //   console.log(dataRemainder);

    //   calculate the days and hours and minutes and seconds
    //   days
    const days = Math.floor(dataRemainder / day);
    // hours
    const hours = Math.floor((dataRemainder - days * day) / hour);
    //   minute
    const minutes = Math.floor(
      (dataRemainder - (days * day + hours * hour)) / minute
    );
    const seconds = Math.floor(
      (dataRemainder - (days * day + hours * hour + minutes * minute)) / second
    );
    if (dataRemainder < 0) {
      window.clearInterval(stop);
    } else {
      $(".day").html(`${days} Days`);
      $(".hour").html(`${hours} Hour`);
      $(".min").html(`${minutes} Minute`);
      $(".sec").html(`${seconds} Seconds`);
    }

    //
  }, 1000);

  // number of letters in textarea
  $("#messgeUser").on("keyup", function () {
    let letters = $(this).val();
    letters.length >= 100
      ? $("#letterNum").text("your available character finished")
      : $("#letterNum").text(100 - letters.length);
  });
});

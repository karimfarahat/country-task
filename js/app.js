var eventsMediator = {
  events: {},
  on: function (eventName, callbackfn) {
    this.events[eventName] = this.events[eventName]
      ? this.events[eventName]
      : [];
    this.events[eventName].push(callbackfn);
  },
  emit: function (eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(function (callBackfn) {
        callBackfn(data);
      });
    }
  },
};

eventsMediator.on("selected-country", function (data) {
  //   debugger;
  $.ajax({
    method: "GET",
    url: data,
    // url: country.find((item) => item.name == e.target.id).url,
  }).done(function (respone) {
    model.currentArticles = respone.articles;

    articlesView.render();

    // controller.setArticles();
    // LAZEM DEE
    // eventsMediator.emit("picture-clicked");
  });
});

//Onclick event inside of it
// eventsMediator.emit(
//   "selected-country",
//   model.country.find((item) => item.name == e.target.id).url
// );

var model = {
  currentArticles: [],
  country: [
    {
      name: "us",
      src: "./imgs/us.jpeg",
      url: "https://newsapi.org/v2/top-headlines?country=us&apiKey=b1f2801c41a34ff0b63c91c159cd152b",
    },
    {
      name: "br",
      src: "./imgs/br.jpg",
      url: "https://newsapi.org/v2/top-headlines?country=br&apiKey=b1f2801c41a34ff0b63c91c159cd152b",
    },
    {
      name: "au",
      src: "./imgs/au.jpg",
      url: "https://newsapi.org/v2/top-headlines?country=au&apiKey=b1f2801c41a34ff0b63c91c159cd152b",
    },
  ],
};

var carouselView = {
  render: function () {
    var country = model.country;
    var template = $("#template").html();
    var rendered = Mustache.render(template, { country });
    $("#carousel").html(rendered);
    //////////
    $(".img-fluid").on("click", function (e) {
      // debugger;
      eventsMediator.emit(
        "selected-country",
        model.country.find((item) => item.name == e.target.id).url
      );
      //////////////////////////
      //   $.ajax({
      //     method: "GET",
      //     url: country.find((item) => item.name == e.target.id).url,
      //   }).done(function (respone) {
      //     model.currentArticles = respone.articles;
      //     articlesView.render();
      //     // controller.setArticles();
      //     // LAZEM DEE
      //     // eventsMediator.emit("picture-clicked");
      //   });
    });
  },
};
var articlesView = {
  render: function () {
    debugger;
    var articles = model.currentArticles;
    var template = $("#template2").html();
    var rendered = Mustache.render(template, { articles });
    $("#articles").html(rendered);
  },
};

var controller = {
  init: function () {
    carouselView.render();
  },
  setArticles: function (articles) {
    articles.forEach((element) => {
      console.log(element);
    });
  },
};

$(document).ready(function () {
  controller.init();
  $(".owl-carousel").owlCarousel({
    navigation: false, // Show next and prev buttons

    dots: false,

    slideSpeed: 300,

    paginationSpeed: 400,

    items: 1,

    itemsDesktop: false,

    itemsDesktopSmall: false,

    itemsTablet: false,

    itemsMobile: false,
  });
});

var data = { cityId: '500100', source: 'web' }
var app = new Vue({
  el: "#app",
  data: {
    imgList: null,
    speciallist: null,
    columnlist: null,
    adList: null,
    resultlist: null,
    houseList: null,
    houseList1: null,
    houseList2: null,
  },
  mounted: function () {
    this.getImg()
    this.getList()
    console.log(this.data)
  },
  methods: {
    getImg: function () {
      this.$http.jsonp({
        data: data,
        method: "POST",
        url: url.getHome,
        emulateJSON: true
      }).then(function (res) {
        app.imgList = res.data.result.carousel
        app.speciallist = res.data.result.special
        app.columnlist = res.data.result.column
        app.adList = res.data.result.ad
        $(".homepage-top").next().css("margin-top", 120)
        $(".homepage-top .hp-top-right span").on("click", function () {
          $(".homepage-top").css("display", "none")
          $(".homepage-top").next().css("margin-top", 0)
        })
        // console.log(imgList)
        // console.log(speciallist)
        // console.log(columnlist)
      })
    },
    getList: function () {
      this.$http.jsonp({
        data: data,
        method: "POST",
        url: url.getRecommend,
        emulateJSON: true
      }).then(function (res) {
        console.log(res.data.result)
        app.resultlist = res.data.result
        app.houseList = res.data.result[0].houseList
        app.houseList1 = res.data.result[1].houseList
      })
    },
    btnSeemore: function (e) {
      console.log($(e.target).prev().text())
      if ($(e.target).prev().text() === "日租") {
        document.location.href = "Dailyrent/dailyrentpage.html"
      } else if ($(e.target).prev().text() === "长租") {
        document.location.href = "Longrent/longrentpage.html"
      } else if ($(e.target).prev().text() === "时租") {
        console.log("未开放")
      }
    },
    imgclick(imgItem) {
      var imgvalue = imgItem.houseMasterId;
      location.href = 'Longrent/longhousinglist.html?' + 'houseMasterId=' + imgvalue
    },
    specialimg(specialItem) {
      var specialvalue = specialItem.houseMasterId;
      location.href = 'Longrent/longhousinglist.html?' + 'houseMasterId=' + specialvalue
    },
    test(columnItem) {
      console.log(columnItem.title)
      if (columnItem.title === "长租") {
        document.location.href = "Longrent/longrentpage.html"
      }
      else if (columnItem.title === "日租") {
        document.location.href = "Dailyrent/dailyrentpage.html"
      }
      else if (columnItem.title === "房东招募") {
        document.location.href = "else/join.html"
      }
      else {
        console.log("error")
      }
    },
    btnSeemore: function (e) {
      console.log($(e.target).prev().text())
      if ($(e.target).prev().text() === "日租") {
        document.location.href = "Dailyrent/dailyrentpage.html"
      } else if ($(e.target).prev().text() === "长租") {
        document.location.href = "Longrent/longrentpage.html"
      } else if ($(e.target).prev().text() === "时租") {

      }
    },
    getHouse: function (houseItem) {
      console.log(houseItem.houseId);
      location.href = 'Dailyrent/dailyparticulars.html?' + 'houseId=' + encodeURI(houseItem.houseId)
        + '&lng=' + encodeURI(houseItem.lng) + '&lat=' + encodeURI(houseItem.lat);
    },
    getHouse1: function (houseItem1) {
      location.href = 'Longrent/longparticulars.html?' + 'houseId=' + encodeURI(houseItem1.houseId)
        + '&lng=' + encodeURI(houseItem1.lng) + '&lat=' + encodeURI(houseItem1.lat)
    }
  }
})
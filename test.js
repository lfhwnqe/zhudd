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
        str: "?imageview2/format/png"
    },
    updated: function () {
        console.log("world")
        console.log("hello")
    },
    created:
    function () {
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
                emulateJSON: true,
                // header: {
                //     a:"Access-Control-Allow-Credentials: true",
                //     b: "Access-Control-Allow-Origin:  . $url"
                // }
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
        imgclick: function (imgItem) {
            if (imgItem.imgHref === "" & imgItem.houseMasterId != 0 & imgItem.houseType === 1) {
                var imgvalue = imgItem.houseMasterId;
                location.href = 'Longrent/longhousinglist.html?' + 'houseMasterId=' + imgvalue
            } else if (imgItem.imgHref === "" & imgItem.houseMasterId != 0 & imgItem.houseType === 2) {
                location.href = 'Dailyrent/dailyhousinglist.html?' + 'houseMasterId=' + imgItem.houseMasterId
            } else if (imgItem.imgHref){
                location.href = imgItem.imgHref
            } else {
                console.log("banner error")
            }
        },
        specialimg: function (specialItem) {
            // var specialvalue = specialItem.houseMasterId;
            // location.href = 'Longrent/longhousinglist.html?' + 'houseMasterId=' + specialvalue
            if (specialItem.houseType === 1) {
                console.log("长租")
                location.href = 'Longrent/longhousinglist.html?' +
                    "houseMasterId=" + specialItem.houseMasterId
            } else if (specialItem.houseType === 2) {
                console.log("短租")
                location.href = 'Dailyrent/dailyhousinglist.html?' +
                    "houseMasterId=" + specialItem.houseMasterId
            } else if (specialItem.houseType === 3) {
                console.log("时租")
            }
        },
        test: function (columnItem) {
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
                document.location.href = "Dailyrent/dailyhousinglist.html"
            } else if ($(e.target).prev().text() === "长租") {
                document.location.href = "Longrent/longhousinglist.html"
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
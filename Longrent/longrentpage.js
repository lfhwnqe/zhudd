$(function () {
    $('.range-slider').jRange({
        from: 0,
        to: 3000,
        step: 1,
        //				scale: [0,25,50,75,100],
        format: '%s',
        width: 700,
        showLabels: true,
        isRange: true
    });
    setTimeout(function () {
        $("#div_btnmore").css("opacity", "1");
        $("#div_btnmore").css("display", "none");
    }, 1000);
});
//			json文件读取（POI.json）
var areadata = {
    province: [],
    city: [],
    district: []
}
initAreaData();
function initAreaData() {
    var dataroot = "../POI.json";
    $.getJSON(dataroot, function (data) {
        areadata.province = data.poi;
        console.log(areadata.province.length)
        for (var i = 0; i < areadata.province.length; i++) {
            $("#divD").append('<div class="adr-filtrate divD_div' + i + '">' +
                '<div class="col-xs-12 divD_title "><span><img src="../img/quyu' + i + '.png"/></span><span>' + areadata.province[i].name + '</span></div></div>')

            for (var j = 0; j < areadata.province[i].result.length; j++) {
                $('.divD_div' + i + '').append('<div class="col-xs-12 divD_details"><span>' + areadata.province[i].result[j].name + '</span></div>')
            }
        }
        $(".divD_details").click(function () {
            var index = $(this).parent().index() - 2;
            var index1 = $(this).index() - 1;
            if (index == 0) {
                Fadein();
                data1['lng'] = '';
                data1['lat'] = '';
                data1['areaId'] = areadata.province[index].result[index1].areaId;
                console.log(data1);
                $.ajax({
                    type: "POST",
                    url: "https://apis.zhudd.com/v3/house/getHouseList",
                    data: data1,
                    dataType: "json",
                    success: function (data) {
                        demo1.resultlist = '';
                        demo1.resultlist = data.result;
                    }
                });
            } else {
                Fadein();
                data1['areaId'] = '';
                data1['lng'] = areadata.province[index].result[index1].log;
                data1['lat'] = areadata.province[index].result[index1].lat;
                console.log(data1);
                $.ajax({
                    type: "POST",
                    url: "https://apis.zhudd.com/v3/house/getHouseList",
                    data: data1,
                    dataType: "json",
                    success: function (data) {
                        demo1.resultlist = '';
                        demo1.resultlist = data.result;
                    }
                });
            }
            $("#btnFadein").children().children().html($(this).children().html());
        });

        $('.divD_title').on('click', function () {
            var dis = $(this).siblings().css('display');
            if (dis == 'none') {
                $(this).siblings().show();
                $(this).addClass("divD_img");
            } else {
                $(this).siblings().hide();
                $(this).removeClass("divD_img");
            }
        });
    });
    //搜索我的附近房源
    $("#near").click(function () {
        Fadein();
        data1['areaId'] = '';
        data1['lng'] = localStorage.getItem("getLng");
        data1['lat'] = localStorage.getItem("getLat");
        console.log(data1)
        $.ajax({
            type: "POST",
            url: "https://apis.zhudd.com/v3/house/getHouseList",
            data: data1,
            dataType: "json",
            success: function (data) {
                demo1.resultlist = '';
                demo1.resultlist = data.result;
            }
        });
        $("#btnFadein").children().children().html($(this).children("span:last-child").html());
    });
}

$(document).ready(function () {
    $("#btnFadein").bind("click", Fadein); //为btnFadein绑定click事件
    $("#btnmore").bind('click', btnmore);
    $("#recommend").bind('click', recommend);
    $('#cancel_btn').bind("click", Fadeout);
    $('#btnmore_btn').bind("click", btnmorebtn);
    $('#recommend_btn').bind("click", recommendbtn);
    //				整租合租的筛选
    $(".zhengzu").on('click', function () {
        $('.zhengzu').addClass("zhengzus");
        $('.zhengzu').addClass("houseactive");
        $('.hezhu').removeClass("hezhus");
        $('.hezhu').removeClass("houseactive");
    });
    $(".hezhu").on('click', function () {
        $('.zhengzu').removeClass("zhengzus");
        $('.zhengzu').removeClass("houseactive");
        $('.hezhu').addClass("hezhus");
        $('.hezhu').addClass("houseactive");
    });
    //				居室
    $(".roomvalue").on('click', function () {
        $(this).addClass("roomactive");
        $(this).parent().siblings().children().removeClass("roomactive");
    })
    //				更多筛选的确认按钮
    $("#confirm_btn").on('click', function () {
        var aa = $(".range-slider").val().split(',');
        var minvalue = aa[0];//筛选的最小价格
        var maxvalue = aa[1];//筛选的最大价格
        var housetype = $('.houseactive').next().text();//房源类型的值（整租==合租）
        var bedroom = $('.roomactive').parent().index() + 1;//筛选得到的居室
        var peoplenum = $(".clearfix .active").index() + 1;//筛选得到的宜居人数
        var speciallabel = demolabel.selectId.join(",");//筛选得到的特色标签
        var fac_content = demofacilities.facilities.join(",");//筛选得到的设施
        console.log(demolabel.selectId)
        console.log(demofacilities.facilities)
        data1['priceLow'] = minvalue;
        data1['priceLowHigh'] = maxvalue;
        if (housetype == "整租") {
            data1['longJoinRent'] = '';
            data1['longHouseRent'] = 1;
        } if (housetype == "合租") {
            data1['longHouseRent'] = '';
            data1['longJoinRent'] = 1;
        }
        if (bedroom == 5) {
            data1['room'] = "不限";
        } else if (bedroom == 0) {
            data1['room'] = '';
        } else {
            data1['room'] = bedroom;
        }
        data1['personNumber'] = peoplenum;
        data1['tags'] = speciallabel;
        data1['amenityIdList'] = fac_content;
        console.log(data1)
        $.ajax({
            type: "POST",
            url: "https://apis.zhudd.com/v3/house/getHouseList",
            data: data1,
            dataType: "json",
            success: function (data) {
                demo1.resultlist = '';
                demo1.resultlist = data.result;
            }
        });
        btnmorebtn();
    })
    //				推荐排序
    $('.recommend_div').on('click', function () {
        var pricesindex = $(this).index()
        $(this).addClass("confirm");
        $(this).siblings().removeClass("confirm");
        if (pricesindex == 1) {
            //						alert(1)
            recommend();
            data1['prices'] = 1;
            console.log(data1)
            $.ajax({
                type: "POST",
                url: "https://apis.zhudd.com/v3/house/getHouseList",
                data: data1,
                dataType: "json",
                success: function (data) {
                    demo1.resultlist = '';
                    demo1.resultlist = data.result;
                }
            });
        } else if (pricesindex == 2) {
            recommend();
            data1['prices'] = 2;
            console.log(data1)
            $.ajax({
                type: "POST",
                url: "https://apis.zhudd.com/v3/house/getHouseList",
                data: data1,
                dataType: "json",
                success: function (data) {
                    demo1.resultlist = '';
                    demo1.resultlist = data.result;
                }
            });
        } else {
            recommend();
            data1['prices'] = '';
            console.log(data1)
            $.ajax({
                type: "POST",
                url: "https://apis.zhudd.com/v3/house/getHouseList",
                data: data1,
                dataType: "json",
                success: function (data) {
                    demo1.resultlist = '';
                    demo1.resultlist = data.result;
                }
            });
        }
        $("#recommend").children().children().html($(this).children().html())
    })
});

function Fadein() {
    $("#div_recommend").hide();
    $("#div_btnmore").hide();
    $("#btnmore").children().removeClass("btnFadein_span");
    $("#recommend").children().removeClass("btnFadein_span");
    var divD = $("#divD").css('display')
    if (divD == 'none') {
        $("#divD").slideDown("slow"); //滑入 
        $(".body").css("overflow-y", "hidden");
        $("#btnFadein").children().addClass("btnFadein_span");
    } else {
        $("#divD").slideUp("slow"); //滑出 
        $(".body").css("overflow-y", "scroll");
        $("#btnFadein").children().removeClass("btnFadein_span");
    }

}
function btnmore() {
    $("#divD").hide();
    $("#div_recommend").hide();
    $("#btnFadein").children().removeClass("btnFadein_span");
    $("#recommend").children().removeClass("btnFadein_span");
    var divbtnmore = $("#div_btnmore").css('display')
    if (divbtnmore == 'none') {
        $("#div_btnmore").slideDown("slow"); //滑入 
        $(".body").css("overflow-y", "hidden");
        $(this).children().addClass("btnFadein_span");
    } else {
        $("#div_btnmore").slideUp("slow"); //滑出 
        $(".body").css("overflow-y", "scroll");
        $(this).children().removeClass("btnFadein_span");
    }

}
function recommend() {
    $("#divD").hide();
    $("#div_btnmore").hide();
    $("#btnFadein").children().removeClass("btnFadein_span");
    $("#btnmore").children().removeClass("btnFadein_span");
    var divrecommend = $("#div_recommend").css('display')
    if (divrecommend == 'none') {
        $("#div_recommend").slideDown("slow"); //滑入 
        $(".body").css("overflow-y", "hidden");
        $("#recommend").children().addClass("btnFadein_span");
    } else {
        $("#div_recommend").slideUp("slow"); //滑出 
        $(".body").css("overflow-y", "scroll");
        $("#recommend").children().removeClass("btnFadein_span");
    }

}
function Fadeout() {
    $("#divD").slideUp("slow"); //滑出 
    $(".body").css("overflow-y", "scroll")
    $("#btnFadein").children().removeClass("btnFadein_span");
}
function btnmorebtn() {
    $("#div_btnmore").slideUp("slow"); //滑出 
    $(".body").css("overflow-y", "scroll")
    $("#btnmore").children().removeClass("btnFadein_span");
}
function recommendbtn() {
    $("#div_recommend").slideUp("slow"); //滑出 
    $(".body").css("overflow-y", "scroll")
    $("#recommend").children().removeClass("btnFadein_span");
}







var data = {
    cityId: '500100',
    source: 'web',
    houseType: '1',
    page: "1"
};
var longrentpage = new Vue({
    el: "#longrentpage",
    data: {
        imgList: null,
        columnlist: null,
        resultlist: null,
        labellist: null,
        selectId: null,
        items: null,
        facilitieslist: null,
        facilities: null,
        icons: null,
    },
    created: function () {
        this.getImg()
        this.getList()
        this.getLabel()
        this.getAmenity()
        this.clickNextPage()
    },
    mounted: function () {
    },
    methods: {
        getImg: function () {
            this.$http.jsonp({
                data: data,
                method: 'POST',
                url: url.getColumn,
                emulateJSON: true,
            }).then(function (res) {
                // console.log(url.getImg)
                // console.log(res.data.result.carousel)
                carouseldata = res.data.result.carousel
                columndata = res.data.result.column
                longrentpage.imgList = carouseldata
                longrentpage.columnlist = columndata
                // console.log($(window).scrollTop() + $(window).height())
            }
                )
        },
        getList: function () {
            console.log(data.page)
            this.$http.jsonp({ //调用接口
                data: data,
                method: 'POST',
                url: url.getHouseList,
                emulateJSON: true,
            }).then(function (res) { //接口返回数据
                this.resultlist = res.data.result
                data.page++
            })
            $(window).on("scroll", function () {
                if ($(window).scrollTop() + $(window).height() + 1 >= $(document).height()) {
                    $(".nextPage").trigger("click")
                }
            })
            // }

        },
        clickNextPage: function () {
            this.$http.jsonp({ //调用接口
                data: data,
                method: 'POST',
                url: url.getHouseList,
                emulateJSON: true,
            }).then(function (res) { //接口返回数据
                var curList = res.data.result
                if (this.resultlist) {
                    this.resultlist = this.resultlist.concat(curList)
                    data.page++
                }
            })
        },



        // getLabel: function () {
        //     this.$http.jsonp({ //调用接口
        //         data: data,
        //         method: 'POST',
        //         url: url.getTags,
        //         emulateJSON: true,
        //     }).then(function (res) { //接口返回数据
        //         labellist = res.data.result;
        //         longrentpage.labellist = labellist;
        //         longrentpage.labellist.forEach(function (item) {
        //             this.items.push({ isSelect: false });
        //         })
        //         console.log(res)
        //     })
        // },




        getAmenity: function () {
            this.$http.jsonp({ //调用接口
                data: data,
                method: 'POST',
                url: url.getAmenity, //this指data
                emulateJSON: true,
            }).then(function (res) { //接口返回数据
                facilitieslist = res.data.result;
                longrentpage.facilitieslist = facilitieslist;

                longrentpage.facilitieslist.forEach(function (item) {
                    longrentpage.icons.push(true);
                })
            }, function (error) { })
        },
        // scroll: function () {
        //     if ($(window).scrollTop() + $(window).height() + 20 >= $(document).height()) {
        //         console.log("hello")
        //     }
        // }
    }
})





// window.onload =
// function () {
//     var divD = document.getElementById("divD");
//     var divbtnmore = document.getElementById("div_btnmore");
//     var divrecommend = document.getElementById("div_recommend");
//     var oDiv = document.getElementById("float"),
//         H = 0,
//         Y = oDiv
//     while (Y) { H += Y.offsetTop; Y = Y.offsetParent }
//     window.onscroll = function () {

//         var s = document.body.scrollTop || document.documentElement.scrollTop
//         if (s > H + 150) {
//             oDiv.classList.add("height-float");
//             divD.style.paddingTop = '230px';
//             divD.style.paddingBottom = '150px';
//             divbtnmore.style.paddingTop = '230px';
//             divbtnmore.style.paddingBottom = '150px';
//             divrecommend.style.paddingTop = '230px';
//             divrecommend.style.paddingBottom = '150px';
//         } else {
//             oDiv.classList.remove("height-float");
//             divD.style.paddingTop = '130px';
//             divbtnmore.style.paddingTop = '130px';
//             divrecommend.style.paddingTop = '130px';
//         }
//     }
// }
// var data = { cityId: '500100', source: 'web' };
// var demo = new Vue({
//     el: '#app',
//     data: {
//         imgList: [],
//         columnlist: [],
//         speciallist: [],
//         // url: 'http://192.168.1.43:8070/v3/home/getHome'
//         url: "https://apis.zhudd.com/v3/home/getHome"
//     },
//     created: function () {
//         this.getImg();//定义方法
//     },
//     methods: {
//         getImg: function () {
//             var that = this;
//             that.$http.jsonp({           //调用接口
//                 data: data,
//                 method: 'POST',
//                 url: this.url,  //this指data
//                 emulateJSON: true,
//             }).then(function (response) {  //接口返回数据
//                 console.log(response);
//                 carouseldata = response.data.result.carousel;
//                 columndata = response.data.result.column;
//                 specialdata = response.data.result.special;
//                 //                  	console.log(JSON.stringify(response.data));
//                 //						console.log(JSON.stringify(response.data))
//                 demo.imgList = carouseldata;
//                 demo.columnlist = columndata;
//                 demo.speciallist = specialdata;
//                 // console.log(demo.columnlist.length)
//                 // console.log($('.optwidth').children().length)
//             }, function (error) {
//             })
//         },
//         imgclick(imgItem) {
//             var imgvalue = imgItem.houseMasterId;
//             location.href = 'Longrent/longhousinglist.html?' + 'houseMasterId=' + imgvalue
//         },
//         specialimg(specialItem) {
//             var specialvalue = specialItem.houseMasterId;
//             location.href = 'Longrent/longhousinglist.html?' + 'houseMasterId=' + specialvalue
//         },
//         test(columnItem) {
//             console.log(columnItem.title)
//             if (columnItem.title === "长租") {
//                 document.location.href = "Longrent/longrentpage.html"
//             }
//             else if (columnItem.title === "日租") {
//                 document.location.href = "Dailyrent/dailyrentpage.html"
//             }
//             else if (columnItem.title === "房东招募") {
//                 document.location.href = "else/join.html"
//             }
//             else {
//                 console.log("error")
//             }
//         }
//     }
// })
// var demo1 = new Vue({
//     el: '#app1',
//     data: {
//         resultlist: [],
//         houseList: [],
//         houseList1: [],
//         houseList2: [],
//         url: 'https://apis.zhudd.com/v3/home/getRecommend'
//     },
//     created: function () {
//         this.getlist();//定义方法
//     },
//     methods: {
//         getlist: function () {
//             var that = this;
//             that.$http.jsonp({           //调用接口
//                 data: data,
//                 method: 'POST',
//                 url: this.url,  //this指data
//                 emulateJSON: true,
//             }).then(function (response) {  //接口返回数据
//                 resultlist = response.data.result;
//                 houseList = response.data.result[0].houseList;
//                 houseList1 = response.data.result[1].houseList;
//                 console.log(resultlist);
//                 console.log(resultlist.houseType)
//                 // console.log(response)
//                 //						console.log(response.data.result[1].houseList.length)
//                 demo1.resultlist = resultlist;
//                 demo1.houseList = houseList;
//                 demo1.houseList1 = houseList1;
//             }, function (error) {
//                 console.log("error")
//             })
//         },
//         btnSeemore: function (e) {
//             console.log($(e.target).prev().text())
//             if ($(e.target).prev().text() === "日租") {
//                 document.location.href = "Dailyrent/dailyrentpage.html"
//             } else if ($(e.target).prev().text() === "长租") {
//                 document.location.href = "Longrent/longrentpage.html"
//             } else if ($(e.target).prev().text() === "时租") {

//             }
//         }
//     },
// })
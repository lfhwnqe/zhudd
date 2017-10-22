// var u = navigator.userAgent, app = navigator.appVersion;
// var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端  
// var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器  

// function openApp() {
//     /* 判断是安卓还是ios ,调用的方法要跟ios端和安卓端约定方面名参数*/
//     if (isAndroid) {
//         location.href = "android://main"
//         androidDown()
//     } else {
//         location.href = "com.zhudd.appname://"
//         iosDown()
//     }
// }

function iosDown() {
    setTimeout(function () {
        location.href = "https://itunes.apple.com/us/app/zhu-duo-duo/id1138606224?l=zh&ls=1&mt=8"
    }, 2000)
}
function androidDown() {
    setTimeout(function () {
        location.href = 'https://apis.zhudd.com/app/zhudd_v3.1.3.apk'
    }, 2000)
}


// function downloadApp() {
//     setTimeout(check(), 5000)
// }

$(".homepage-top button").on("click", function () {
    var u = navigator.userAgent, app = navigator.appVersion;
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端  
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器      
    if (isAndroid) {
        // alert("an")
        location.href = "android://main"
        setTimeout(androidDown(), 2000)
    } else {
        // alert("ios")
        location.href = "com.zhudd.appname://"
        setTimeout(iosDown(), 2000)
    }
})

// $(".homepage-top button").on("click", function(e){
//     console.log(e.target)
//     var u = navigator.userAgent, app = navigator.appVersion;
//     var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端  
//     var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器  
//     $(e.target)    
// })


// $(".homepage-top button").on("click", openApp())
console.log("api start")
var url = {
    getHome: "/home/getHome",
    getRecommend: "/home/getRecommend",
    getColumn: "/house/getColumn",
    getHouseList: "/house/getHouseList",
    getTags: "/home/getTags",
    getAmenity:"/home/getAmenity"
}
var host = "https://apis.zhudd.com/v3"


for (var key in url) {
    url[key] = host + url[key]
}
console.log(url)

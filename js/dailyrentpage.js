//首页广告栏关闭 
$(".homepage-top .hp-top-right span").on("click", function(){
    $(".homepage-top").css("display", "none")
    console.log("hello")
    $(".homepage-top").next().css("margin-top", 0)
  })
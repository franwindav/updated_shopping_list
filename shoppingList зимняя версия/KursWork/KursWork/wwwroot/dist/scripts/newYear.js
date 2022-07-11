window.addEventListener(`resize`, event => {
    let hat = $(".hat");
    let inputCreateList = $(".inputCreateList");
    hat.offset({left: inputCreateList.offset().left + 10, top: inputCreateList.offset().top - 38}).left
    let controlPanel = $(".controlServer");
    $(".FirstBalls").offset({top: controlPanel.offset().top + 76, left: controlPanel.offset().left + 10})
    $(".FirstBalls").width(40 * Math.floor((controlPanel.width()+ 35 )/40))
}, false);
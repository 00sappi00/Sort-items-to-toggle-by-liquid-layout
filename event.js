'use strict';

var mql = window.matchMedia('(min-width: 960px)');
var widthChange = function(mq){
  if(mq.matches){
    $('.container').empty();
    $.ajax({
        type: 'GET',
        url: "./data.json",
        dataType: "json",
        success: function(data) {
          pcEventSort(data);
        },
        error: function(){}
    });
  }else{
    $('.container').empty();
    $.ajax({
        type: 'GET',
        url: "./data.json",
        dataType: "json",
        success: function(data) {
          spEventSort(data);
        },
        error: function(){}
    });
  }
}

mql.addListener(widthChange);
widthChange(mql);

var pcEventSort = function(data){
  var grid = "<div class='grid clearfix'><div class='grid-col'></div><div class='grid-col'></div><div class='grid-col'></div></div>";
  $('.container').append(grid);
  for(var i = 0; i < data.event.length; i++){
    var el = "<div class='grid-item grid-item0" + (i+1) + "'>";
    el += "<div class='grid-img'><img src='" + data.event[i].image + "'></div>";
    el += "<dl><dt>" + data.event[i].event_name + "</dt>";
    el += "<dd style='display:none;'>" + data.event[i].detail + "</dd>";
    el += "</dl></div>"

    if( (i+1)%3 == 1){
      $('.grid-col:nth-child(1)').append(el);
    }else if( (i+1)%3 == 2){
      $('.grid-col:nth-child(2)').append(el);
    }else if( (i+1)%3 == 0){
      $('.grid-col:nth-child(3)').append(el);
    }
  }
}
var spEventSort = function(data){
  var grid = "<div class='grid clearfix'></div>";
  $('.container').append(grid);
  for(var i = 0; i < data.event.length; i++){
    var el = "<div class='grid-item grid-item0" + (i+1) + "'>";
    el += "<div class='grid-img'><img src='" + data.event[i].image + "'></div>";
    el += "<dl><dt>" + data.event[i].event_name + "</dt>";
    el += "<dd style='display:none;'>" + data.event[i].detail + "</dd>";
    el += "</dl></div>";
    $('.grid').append(el);
  }
}
$(window).on('load',function(){
  $('dt').on('click',function(){
    $(this).next('dd').slideToggle();
  });
})

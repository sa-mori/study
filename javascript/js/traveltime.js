function init() {
  window.TravelTimer = {};
  TravelTimer.geo = new google.maps.Geocoder();
}

// 地図を表示する
function mapCall(locations) {
  console.log('mapCall start');
  console.log(locations[0]);
  var map;
  var directionsService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer();
  var mapCenter = new google.maps.LatLng('35.6811673','139.76705160000006');


  // 地図初期化のオプション
  var mapOptions = {
    zoom: 17,
    center: mapCenter,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scaleControl: true,
  };

  console.log(mapOptions);

  // 地図を表示
  map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

  console.log('=== 1 ===');
  // ルートを取得
  var request ={};
  var requestWaypoints = [];
  locations.forEach((result,index) => {
    console.log('==location==');
    console.log(index);
    console.log(locations.length);
    console.log(locations[index]);

    if (index === 0){
      request['origin'] = locations[index];
    }else if(index === locations.length-1){
      request['destination'] = locations[index];
    }else{
      requestWaypoints.push({
        location: locations[index],
        stopover: true  // falseの時はただの通過点としてマーカがつかない。
      });
    };
  });
  request['travelMode'] = google.maps.DirectionsTravelMode.WALKING; // ルートの種類
  request['waypoints'] = requestWaypoints;

  console.log(requestWaypoints);
  console.log(request);
  console.log('====req====');

  directionsService.route(request, function(result, status) {
    directionsRenderer.setDirections(result); // 取得したルートをセット
    directionsRenderer.setMap(map); // ルートを地図に表示
    console.log(status);
    console.log('=== Render ===');
  });
}

// 時間を秒にする
function HmToSec(hm_time){
  var sec = "";
  var HourtoSec = hm_time.substr(0,2) * 3600;
  var MintoSec = hm_time.substr(3,2) * 60;

  sec = HourtoSec + MintoSec;
  return sec;
}

// 秒を時間にする
function SecToHms(sec) {
  var hms = "";
  var SecToHour = sec / 3600 | 0;
  var SecToMin = sec % 3600 /60 | 0;
  var SecToSec = sec % 60;

  if (SecToHour!=0) {
    hms = SecToHour + "時間" + padZero(SecToMin) + "分" + padZero
(SecToSec) + "秒";
  } else if (SecToMin!=0) {
    hms = SecToMin + "分" + padZero(SecToSec) + "秒";
  } else {
    hms = SecToSec + "秒";
  }
  return hms;
}

// ゼロ埋め
function padZero(v){
  if (v < 10) {
    return "0" + v;
  } else {
    return v;
  }
}

function calculateDuration(locations){

  // 全ての移動時間取得後に所要時間を計算するため、親のpromiseを作成する。
  var promises=[];

  locations.forEach(function(value,index){
    var durationTime = 0;
    var directionsService = new google.maps.DirectionsService();


    console.log(index + ':' + value);

    // indexが0の時は１拠点しかなく、移動時間の計算が不要
    if (index !== 0){
      // get duration between a and b
      console.log('============')
      console.log(index);
      console.log(locations[index]);
      console.log(locations[index-1]);

      var request = {
        origin: locations[index-1],   // 出発地点の緯度経度
        destination: locations[index],    // 目的地の緯度経度
        travelMode: google.maps.DirectionsTravelMode.WALKING // ルートの種類
      };

      const promise = new Promise((resolve, reject) => {
        directionsService.route(request, (result, status) => {
         var time1 = result.routes[0].legs[0].duration.text;  // 所要時間(最適)
         var time2 = result.routes[0].legs[0].duration.value; // 所要時間(秒)
         console.log('区間' + index)
         console.log(time1);
         console.log(time2);
        // 
         if (index==1){
           document.getElementById("duration").innerText = time1
         }else{
           document.getElementById("duration" + (index-1)).innerText = time1
         }
         resolve(result);
        });
      });
      promises.push(promise);
    };
  });

  Promise
    .all(promises)
    .then((results) => {
      console.log('============');
      console.log(results);

      // 移動時間の集計処理
      var allDuration = 0;
      results.forEach((result) => {
        allDuration = allDuration + result.routes[0].legs[0].duration.value;
        console.log(result.routes[0].legs[0].duration.value);
      });
      var allStayTime = 0;
      $('.inputStayTime').each(function(i){
        allStayTime = allStayTime + HmToSec($(this).val());
        console.log('====stay====')
        console.log(allStayTime);
      });

      var dt = new Date();
      console.log(dt.setSeconds(dt.getSeconds() + allDuration + allStayTime));
      console.log(dt.toLocaleString());
      document.getElementById("allDuration").innerText = dt.toLocaleString();
      console.log('====end=====');

    });
}

$(function(){
  init();
  var currentNumber = 0;

    // 項目の追加
    $("#btnAddText").on('click',function(){
      currentNumber++;
      $("#item").append('<p><label id=\"lblDuration' + currentNumber + 
                                          '\">移動時間' + 
                                          '：<span id =duration' + currentNumber + '\></span></label>');

      $("#item").append('<label id=\"lblTarPoint' + currentNumber + 
                                          '\">目的地' + currentNumber + '</label>');
      $("#item").append('<input class="inputTarget" id=\"txtTarPoint' + currentNumber + 
                                          '\" type=\"text\" name=\"text1\" size=\"30\" />');

      $("#item").append('<label id=\"lblStayTime' + currentNumber + 
                                          '\">滞在時間</label>');
      $("#item").append('<input class="inputStayTime" id=\"timeStayTime' + currentNumber + 
                                          '\" type=\"time\" name=\"text1\" style=\"width:80px\" />');


    });
    // 項目の削除
    $("#btnRemoveText").on('click',function(){
      if (currentNumber > 0){
        $('#lblTarPoint' + currentNumber).remove();
        $('#lblDuration' + currentNumber).remove();
        $('#txtTarPoint' + currentNumber).remove();
        $('#lblStayTime' + currentNumber).remove();
        $('#timeStayTime' + currentNumber).remove();
        currentNumber--;
      }
    });

    // 対象エリアの緯度経度取得
    $("#btnCulTime").on('click',function(){
      // promiseで実行するn個の緯度経度を格納
      var promises = [];
      // 出発地および、目的地の入力項目から緯度経度を取得
      $('.inputTarget').each(function(i){
        var txtTarget = $(this).val();
        const promise= new Promise((resolve, reject) => {
          var req = {
            address: txtTarget,
          };
          TravelTimer.geo.geocode(req,(result, status) => {
            if (status != google.maps.GeocoderStatus.OK) {
              alert(status);
              return;
            }
          resolve(result);
          });
        });
        promises.push(promise);
      });
      Promise
        .all(promises)
        .then((results) => {
          console.log('============')
          console.log(results);
          var latlngs = [];
          results.forEach((result) => {
            // 結果の緯度経度をlatlngsへ追加
            // 後に()があるとAPIにそのまま渡せないため、除外する。
            var latlng = result[0].geometry.location.toString();
            latlngs.push(latlng.substr(1,latlng.length - 2));
          });
          // 所要時間計算
          calculateDuration(latlngs);

          // ルート表示
          mapCall(latlngs);
        })
        .catch((error) => {
          console.error(error);
          alert(error);
        });
    });
});

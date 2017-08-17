function init() {
  window.TravelTimer = {};
  TravelTimer.geo = new google.maps.Geocoder();
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

      // 前後に()があるとdirectionsServiceがエラーになるため、除外する。
      var originLatlng = locations[index].substr(1,locations[index].length - 2);
      var destinationLatlng = locations[index-1].substr(1,locations[index-1].length - 2);
      console.log('========');
      console.log(originLatlng);
      console.log(destinationLatlng);

      var request = {
        origin: originLatlng,   // 出発地点の緯度経度
        destination: destinationLatlng,    // 目的地の緯度経度
        travelMode: google.maps.DirectionsTravelMode.WALKING // ルートの種類
      };

      // todo:ここをpromiseにして、全ての移動時間処理が終わったら、所要時間を計算する。
      directionsService.route(request, function(result, status) {
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
      });
      // todo: ここに合計所要時間計算処理を入れる。
    };
  });
}

$(function(){
  init();
  var currentNumber = 0;

    // 項目の追加
    $("#btnAddText").on('click',function(){
      currentNumber++;
      $("#item").append('<label id=\"lblTarPoint' + currentNumber + 
                                          '\">目的地' + currentNumber + '</label>');
      $("#item").append('<input class="inputTarget" id=\"txtTarPoint' + currentNumber + 
                                          '\" type=\"text\" name=\"text1\" size=\"30\" />');

      $("#item").append('<label id=\"lblStayTime' + currentNumber + 
                                          '\">滞在時間</label>');
      $("#item").append('<input class="inputStayTime" id=\"timeStayTime' + currentNumber + 
                                          '\" type=\"time\" name=\"text1\" style=\"width:80px\" />');

    $("#item").append('<p><label id=\"lblDuration' + currentNumber + 
                                          '\">移動時間' + 
                                          '：<span id =duration' + currentNumber + '\></span></label>');

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
            latlngs.push(result[0].geometry.location.toString());
          });
          calculateDuration(latlngs);
        })
        .catch((error) => {
          console.error(error);
          alert(error);
        });
    });
    // todo: jqueryで時間の項目に変更があれば、所要時間を書き換える。
    // todo: 全経路の地図表示i、promiseで区間移動時間を全て処理した後に動くこと。
});

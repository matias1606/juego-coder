function consultarApi(){
  let itemId = "/padded";
  $.ajax({
    type: "GET",
    url: "https://www.dnd5eapi.co/api/equipment" + itemId,
    dataType: "json",
    success: function (response) {
      console.log(JSON.stringify(response))
      alert("peticion enviada y aceptada")
    },
    error:  function(error){
      alert(error.error)
    }

  });
}

consultarApi()
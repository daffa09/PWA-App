$(document).ready(function(){

var _url = "https://my-json-server.typicode.com/daffa09/pwa_api/products"

var dataResults = ''
var catResults = ''
var categories = []

$.get(_url, function(data){

  $.each(data, function(key, items){

    _cat = items.category

    dataResults += "<div>"
                  + "<h3>" + items.name + "</h3>"
                  + "<p>" + _cat + "</p>"
                  "</div>";

    if ($.inArray(_cat, categories) == -1) {
      categories.push(_cat)
      catResults += "<option value'"+_cat+"'>"+_cat+"</option>"
    }

  })

  $('#products').html(dataResults)
  $('#cat_select').html("<option value='all'>semua</option>"+catResults)
})

var networkDataReceived = false

// fresh data from online
var networkUpdate = fetch(_url).then(function(response){
  return response.json()
}).then(function(data){
  networkDataReceived = true
  renderPage(data)
})

// return data from cache
caches.match(_url).then(function(response){
  if (!response) throw Error('no data on cache')
  return response.json()
}).then(function(data){
  if (!networkDataReceived) {
    renderPage(data)
    console.log('render data from cache')
  }
}).catch(function(){
  return networkUpdate
})

// fungsi filter
$('#cat_select').on('change', function(){
  updateProducts($(this).val())
})

function updateProducts(cat) {

  var dataResults = ''
  var newUrl = _url

  if (cat != 'all')
    newUrl = _url + "?category=" + cat

  $.get(newUrl, function(data){

  $.each(data, function(key, items){

    _cat = items.category

    dataResults += "<div>"
                  + "<h3>" + items.name + "</h3>"
                  + "<p>" + _cat + "</p>"
                  "</div>"
  })

  $('#products').html(dataResults)
})
}
})
// end of jwuery code

// PWA
if ('serviceWorker' in navigator) {
   navigator.serviceWorker.register("/serviceworker.js");
}
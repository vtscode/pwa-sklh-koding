$(document).ready(function(){
	var _url = "https://my-json-server.typicode.com/vtscode/typicode-json-server/products";

	var dataResults = '';
	var catResults = '';
	// tiap kategori unique 
	var categories = [];

	function renderPage(data){

		$.each(data,function(key,items){

			_cat = items.category

			dataResults += `<div><h3> ${items.name}</h3>
							<p>${_cat}</p>
							</div>`;

			if($.inArray(_cat,categories) == -1){
				categories.push(_cat);
				catResults += `<option value="${_cat}">${_cat}</option>`;
			}

		});

		$("#products").html(dataResults);
		$("#cat_select").html(`<option value="all">Semua</option>${catResults}`);

	}


	// console.log(clone());

	var networkDataReceived = false;

	// fresh data from online
	var networkUpdate = fetch(_url).then(response => response.json())
	.then(function(data){
		networkDataReceived = true;
		renderPage(data);
	});

	// return data from cache
	caches.match(_url).then(function(response){
		if (!response) throw Error("No data");
  		return response.json();
	}).then(function(data){
		if(!networkDataReceived){
			renderPage(data);
		}
	}).catch(function(){
		return networkUpdate;
	});



	// fungsi filter
	$('#cat_select').on('change',function(){
		updateProduct($(this).val())
	});

	function updateProduct(cat){
		var _newUrl = _url
		var dataResults ='';
		if(cat != 'all')
			_newUrl = `${_url}?category=${cat}`  

		$.get(_newUrl,function(data){

			$.each(data,function(key,items){

				_cat = items.category

				dataResults += `<div><h3> ${items.name}</h3>
								<p>${_cat}</p>
								</div>`;

			});

			$("#products").html(dataResults);

		});
	}

}); // end document ready jquery


// PWA

// 1. mengecek sudah di suport di browser atau belum  : 'serviceWorker' in navigator
// 2. ketika selesai diload maka register nama file bedasarkan lokasi
// 	tentu di root jika mau service worker di semua halamannya, jika di taruh di /subfolder/sw.js maka hanya bermain di subfolder itu saja
//3. nanti di console log apaka berhasil atau tidak

//jadi di sw ada installasi, aktivasi, fetch atau terminated

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('../serviceworker.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}










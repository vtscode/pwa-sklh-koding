Cara running

terminal linux : python3 server.py
terminal windows : python server.py

Hasilnya website: https://pwasklhkoding.ventuscode.now.sh/


PWA utk membuat website yg bisa diakses secara offline atau jaringan lgi g bagus dan bisa juga dilihat di android dengan adanya cache dan service worker

ini dari developer goole.com

service worker = bekerja di dlm suatu pearngkat/ background sistem dari website dan biasanya mengambil data dari cache di dlm memory HP, komputer, shg saat jaringan tidak bagus masih bisa mengakses data dari cache


web app manifest == adalah file json, bisa dibuat pake generator , berisi data2 singkat, contohnya logo, nama, start_url nya, dari apps kita. Web app manifest yg mengatur tampilan kita utk menambah apps ke home screen apps. Semacam shortcut utk website kita. 

memakai inisialisasi di 
<link rel="manifest" href="./manifest.json" />


Project
1. Client app (konsumsi API)
2. membuat API 
3. mebuat server dengan python 3.7:
	python -m http.server 8080 --bind 127.0.0.1

	atau mebuat file server.py kemudian jalankan dengan perintah di cli/shell:
	$ python3 server.py

4. Membuat service worker : https://bitsofco.de/  ==> service worker
https://developers.google.com/web/fundamentals/primers/service-workers/?hl=id

5. Strategi service workernya dengan cara: https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/?hl=id 
yaitu cache then network dmn jika network offline maka akan dieksekusi dulu, jika sudah online maka nanti terupdate data2 nya.













	
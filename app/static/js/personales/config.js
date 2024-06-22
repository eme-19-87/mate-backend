window.addEventListener("load", ()=>{
	//cargo los datos iniciales de los productos en caso que no existan
	//if (localStorage.getItem("data")===null) setDatosIniciales();
	insertarFavicon();
	insertarFontAwesome();
	//insertarCssBoostrap();
	//insertarScriptBoostrap();
	insertarEstilos();
	//alert("Entra");
});

window.addEventListener('scroll', function() {
    var etiqueta = document.getElementById('btnReturn');
    var posicionMitadPantalla = window.innerHeight / 2; // Calcula la posición de la mitad de la pantalla
    var posicionScroll = window.scrollY; // Obtiene la posición del scroll vertical

    // Si la posición del scroll es mayor o igual a la posición de la mitad de la pantalla, muestra la etiqueta
    if (posicionScroll >= posicionMitadPantalla) {
        etiqueta.style.display = 'block';
    } else {
        etiqueta.style.display = 'none'; // Oculta la etiqueta si no estamos a la mitad de la pantalla
    }
});

window.addEventListener("close",()=>{
	localStorage.removeItem("data");
	sessionStorage.removeItem("data");
})


function insertarFavicon(){
	let favicon = document.createElement('link');
	let head=document.getElementsByTagName("head")[0];

	// Establecer el nuevo favicon
	favicon.type = 'image/x-icon';
	favicon.rel = 'icon';
	favicon.href = 'assets/img/Logos/te-de-mate.ico'; // Cambiar 'ruta/a/tu/nuevo/favicon.ico' con la ruta a tu nuevo favicon

	// Reemplazar el favicon existente con el nuevo
	head.appendChild(favicon);
}
function insertarCssBoostrap(){
	
	let head=document.getElementsByTagName("head")[0];
	let bootstrapIcons = document.createElement("link");
	let linkBootstrap = document.createElement("link");
	bootstrapIcons.setAttribute("href","https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css");
	bootstrapIcons.setAttribute("rel","stylesheet");
	linkBootstrap.setAttribute("href","assets/css/bootstrap.min.css");
	linkBootstrap.setAttribute("rel","stylesheet");
	head.append(linkBootstrap);
	head.append(bootstrapIcons);
}


function insertarFontAwesome(){
	let head=document.getElementsByTagName("head")[0];
	let fontAwesome = document.createElement("link");
	fontAwesome.setAttribute("href","https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css");
	fontAwesome.setAttribute("integrity","sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==");
	fontAwesome.setAttribute("crossorigin","anonymous");
	fontAwesome.setAttribute("rel","stylesheet");
	fontAwesome.setAttribute("referrerpolicy","no-referrer");
	head.append(fontAwesome);
}

function insertarScriptBoostrap(){
	let linkBootstrap = document.createElement("script");
	let body=document.getElementsByTagName("body")[0];
	linkBootstrap.setAttribute("src","assets/js/bootstrap.bundle.js");
	body.append(linkBootstrap);
}

function insertarEstilos(){
	const titleHTML=document.getElementsByTagName('title')[0];
	let generalStyles = document.createElement("link");
	let formStylesCss= document.createElement("link");
	let cardStylesCss= document.createElement("link");
	let animatedCss=document.createElement("link");
	let footerStyle=document.createElement("link");
	let head=document.getElementsByTagName("head")[0];
	generalStyles.setAttribute("href","./assets/css/personales/styles.css");
	generalStyles.setAttribute("rel","stylesheet");
	formStylesCss.setAttribute("href","./assets/css/personales/responsiveFormStyle1.css");
	formStylesCss.setAttribute("rel","stylesheet");
	//cardStylesCss.setAttribute("href","./assets/css/personales/cardStyle.css");
	cardStylesCss.setAttribute("rel","stylesheet");
	footerStyle.setAttribute("href","./assets/css/personales/responsiveFooter.css");
	footerStyle.setAttribute("rel","stylesheet");
	animatedCss.setAttribute("href","https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css");
	animatedCss.setAttribute("rel","stylesheet");
	head.insertBefore(footerStyle,titleHTML);
	head.insertBefore(generalStyles,titleHTML);
	head.insertBefore(cardStylesCss,titleHTML);
	head.insertBefore(animatedCss, titleHTML);
}

function getProduct(category){
	const url='productView.html?category='+category;
	window.location.href = url;
}

async function encodeFileAsBase64URL(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.addEventListener('loadend', () => {
            resolve(reader.result);
        });
        reader.readAsDataURL(file);
    });
};


/**
 * Uso de encodeFileAsBase64URL
 * encodeFileAsBase64URL(e.target.files[0]).then((encodeImg)=>{
		
	});
 */

	/**
	 * Convertir la Base64url en imagen
	 * 
	 * string baseStr64="/9j/4AAQSkZJRgABAQE...";
	 *	imgElem.setAttribute('src', "data:image/jpg;base64," + baseStr64);
	 *
	 *Otra forma de usarlo
	 *
	 *const base64URL = await encodeFileAsBase64URL(inputFile.files[0]);
	 */


	/**
	 * Código para crear una sesión con javascript
	 * Hace poco que he sabido que se pueden guardar sesiones en javascript, esto se consigue de manera similar a como funcionan las cookies. Para guardar sesiones en javascript hay que usar el objeto sessionStorage. En javascript las sesiones solo se almacenaran hasta que se cierre la ventana o pestaña del navegador.
     *Los métodos que se manejan son:
	 *setItem (key,value): El parámetro "key" especifica el nombre con el que se guardará el valor y el parámetro "value" indica el valor
	 *getItem (key): Recupera el valor almacenado en la clave "key". AL usar el método setItem
	 *removeItem (key): elimina el índice pasado por parámetro.
	 *
	 * Fuente: https://blogprog.gonzalolopez.es/articulos/sesiones-en-javascript.html
	 * 
	 *  sessionStorage.setItem("nombre", "Gonzalo");

     * var nombre = sessionStorage.getItem("nombre");

     *sessionStorage.removeItem("nombre");
	 */
	
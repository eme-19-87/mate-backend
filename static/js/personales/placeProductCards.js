window.addEventListener("load", ()=>{
    if (localStorage.getItem("dataAlmacenMate")===null) setDatosIniciales();
    //En caso de producirse algun error, muestra una de las categorías solamente
   // try {
        /*
        Recupero el nombre de la categoria que voy a buscar
        la idea es que window.location.href me devuelve la dirección que aparece en el
        navegador.
        Con split parto la cadena en dos: lo que está a la derecha de ? y lo que está a la 
        izquierda de ?. El primer [1] me permite recuperar la parte derecha
        Ahora el segundo split parte en dos la cadena anterior usando =
        Con el segundo [1] recupero la parte derecha
        De esa manera, si la cadena de la url es 
         http://localhost/Mates/customCard.html?category=Mate
        El primer split me da
        Posición 0: localhost/Mates/customCard.html
        Posición 1: category=Mate
        Me quedo con el resultado de la posición 1.
        El segundo splir parte category=Mate usando el signo =. El resultado será
        Posición 0: category
        Posición 1: Mate
        Me quedo con la posición 1 y, entonces, recupero los productos de la categoría Mate
        */
       
        if(window.location.href.split('?').length>1){
            category=window.location.href.split('?')[1].split('=')[1];
            placeCards(category);
        }else{
            placeCards();
        }
          
    /*} catch (error) {
        window.location.href="http://localhost/Mates"
    }*/
    
   
});







function placeCards(category="EquipoMatero"){

    const categoryData=JSON.parse(localStorage.getItem("dataAlmacenMate"));

    const dataToShow=categoryData.datos.filter((data)=>{
        return data.categoria===category;
    })

    dataToShow.forEach((data)=>{
        
        placeACard(data);
    })
}

function placeACard(data){
    const cardItem=document.createElement('li');
    const card=document.createElement('div');
    const cardImg=document.createElement('img');
    const cardContent=document.createElement('div');
    const cardTitle=document.createElement('div');
    const cardText=document.createElement('p');
    const cardButton=document.createElement('button');
    const cartButton=document.createElement("a");
    const detailsContainer=document.createElement("div");

    const cardContainer=document.getElementById("cardContainer");
    cardItem.setAttribute('class','cards__item');
    card.setAttribute('class','card');
    cardImg.setAttribute('class','card__image');
    cardImg.classList.add('class','card__image--fence');
    cardImg.setAttribute('alt',data.nombre);
    cardContent.setAttribute('class','card__content');
    cardTitle.setAttribute('class','card_title');
    cardText.setAttribute("class","card__text");
    cardButton.setAttribute("class","btn");
    cardButton.classList.add("class","btn--block");
    cardButton.classList.add("class","card__btn");
    cartButton.setAttribute("class","cart-button");
    cartButton.classList.add("class","fa-solid");
    cartButton.classList.add("class","fa-cart-arrow-down");
    detailsContainer.setAttribute("class","details-container");

    cardTitle.innerHTML=data.nombre;
    cardText.innerHTML=data.precio;
    //cardImg.setAttribute('src', "data:image/jpg;base64," + data.rutaImg);
    cardImg.setAttribute('src','assets/img/'+data.rutaImg);
    cardButton.innerText="Detalles";
    cartButton.innerHTML="Agregar";
    card.append(cardImg);
    card.append(cardContent);
    cardContent.append(cardTitle);
    cardContent.append(cardText);
    detailsContainer.append(cardButton);
    detailsContainer.append(cartButton);
    cardContent.append(detailsContainer);
    cardItem.append(card);

    cardContainer.append(cardItem);

   /* const cardProduct=document.createElement("div");
    const dataProduct=document.createElement("div");
    const imgProduct=document.createElement("img");
    const titleProduct=document.createElement("h4");
    const priceProduct=document.createElement("h5");
    const detailsProduct=document.createElement("p");
    const cartButton=document.createElement("a");

   

    cartButton.setAttribute("class","cart-button bi bi-cart");
   
    cartButton.innerHTML="Carrito";
    cardProduct.setAttribute('class',"card-product");
    dataProduct.setAttribute('class',"product-data");
    titleProduct.setAttribute('class',"product-title");
    imgProduct.setAttribute('class',"img-product");
 
        imgProduct.setAttribute('src', "data:image/jpg;base64," + data.rutaImg);
        //imgProduct.src=data.rutaImg;
 
   
    
    titleProduct.innerHTML=data.nombre;
    priceProduct.setAttribute('class',"product-price");
    priceProduct.innerHTML=data.precio;
    detailsProduct.setAttribute('class',"product-details");


    //insertamos los elementos según corresponda
    dataProduct.append(imgProduct);
    dataProduct.append(titleProduct);
    dataProduct.append(priceProduct);
    dataProduct.append(cartButton);
    cardProduct.append(dataProduct);
    cardContainer.append(cardProduct)*/
}
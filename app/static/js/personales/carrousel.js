//Controlará las posiciones de las imágenes
//Hay que mejorar el código
let position=0;
let imgPosition=0;

window.addEventListener('load',()=>{
    //el botón que moverá las imagnes hacia "la izquierda"
    const btnLeft=document.querySelector(".btn-left");
    //el botón que moverá las imagenes hacia "la derecha"
    const btnRigth=document.querySelector(".btn-rigth");

    //El contenedor de las imágenes
    const sliderSection=document.querySelectorAll('.slider-section');
 const totalImg=sliderSection.length;
    //Los eventos para los botones. sliderSection.length obtiene la cantidad de imagenes en el carrusel
    //100/sliderSection.length indica cuántas partes ocupará cada imagen para poder desplazarlas
    btnLeft.addEventListener('click',e=>moveLeft(totalImg,100/sliderSection.length));
    btnRigth.addEventListener('click',e=>moveRigth(totalImg,(100/sliderSection.length)));
    
});

/**
 * Permite desplazar al carrusel hacia la izquierda moviendo la imagen hacia "la izquierda". Si llega a la
 * imagen del principio, retornará automáticamente a la última imagen del carrusel
 * @param {Integer} totalImg El total de imágenes que posee el carrusel
 * @param {Integer} longImg Indica la longitud que cada imagen tomará dentro del contenedor de las imágenes
 * Si tenemos 4 imágenes, cada una ocupará 100/longImg partes
 */
function moveLeft(totalImg,longImg){
    console.log("entra izquierda")
    const slider=document.querySelector('#slider');
    imgPosition--;
    let operacion=position;
    if(imgPosition<0){
        /*posicion img 3
        posicion img 66.6
         posicion img 66.6*/

        imgPosition=(totalImg-1);
        position=(totalImg-1)*longImg;
        operacion=position;
        //operacion-=33.3;
      
        slider.style.transform=`translate(-${operacion}%)`;
        slider.style.transition="none";
    }else{
        operacion=operacion-longImg;
        position=operacion;
        slider.style.transform=`translate(-${operacion}%)`;
        slider.style.transition='all ease 0.6s';
    }
 
 
}

/**
 * Permite desplazar al carrusel hacia la derecha moviendo la imagen hacia "derecha". Si llega a la
 * imagen final, retornará automáticamente a la primera imagen del carrusel
 * @param {Integer} totalImg El total de imágenes que posee el carrusel
 * @param {Integer} longImg Indica la longitud que cada imagen tomará dentro del contenedor de las imágenes
 * Si tenemos 4 imágenes, cada una ocupará 100/longImg partes
 */
function moveRigth(totalImg,longImg){
    const slider=document.querySelector('#slider');
    imgPosition++;
    let operacion=position;
    if(imgPosition>=totalImg){
        imgPosition=0;
        position=0;
        operacion=position;
     
      
        slider.style.transform=`translate(-${operacion}%)`;
        slider.style.transition="none";
    }else{
        operacion=operacion+longImg;
        position=operacion;
        slider.style.transform=`translate(-${operacion}%)`;
        slider.style.transition='all ease 0.6s';
    }
    
    //console.log({'operacion':operacion,'posicion':position,'totalImg':totalImg,'longImg':longImg});
        
}

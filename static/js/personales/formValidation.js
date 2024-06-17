//Revisar este vídeo para las validaciones y diseño de formulario
//https://www.youtube.com/watch?v=cEKDyzoTXb4

window.addEventListener("load",()=>{
    applyBlurEffect();
})

function applyBlurEffect(){
    const name=document.querySelector("[name=name]");
    const lastName=document.querySelector("[name=lastName]");
    const email=document.querySelector("[name=email]");
    const telephone=document.querySelector("[name=telephone]");
    const password=document.querySelector("[name=password]");
    const repeatPassword=document.querySelector("[name=repeatPassword]");

    name.addEventListener("blur",(e)=>{
        spanName="errorName";
        error=controlName(e.target);
        error!==""?placerSpanError(e.target,error,spanName):removeErrors(e.target,spanName);
       /* errorSpan=document.querySelector(`[name=${spanName}]`);
        if(errorSpan!==null){
            errorSpan.classList.add("animate__animated");
            errorSpan.classList.add("animate__flash");
        }*/
        applyAnimation(spanName,"animate__shakeY");
            

        
    });

    lastName.addEventListener("blur",(e)=>{
        spanName="errorLastName";
        error=controlLastName(e.target);
        error!==""?placerSpanError(e.target,error,spanName):removeErrors(e.target,spanName);
        applyAnimation(spanName,'animate__wobble');
    });
}

function controlName(nameInput){
    $errorMessage="";
    if(nameInput.value.length===0) $errorMessage="Coloque un nombre por favor";
    if(nameInput.value.length<=3 && $errorMessage==="") $errorMessage="El nombre debe tener mínimo 3 caracteres";

    return $errorMessage.trim();

}

function controlLastName(nameInput){

    $errorMessage="";
    if(nameInput.value.length===0) $errorMessage="No deje el apellido en blanco";
    if(nameInput.value.length<=3 && $errorMessage==="") $errorMessage="El apellido debe tener mínimo 3 caracteres";

    return $errorMessage.trim();
}

function placerSpanError(htmlElement,message,nameSpan){
    /*const spanMessage=document.createElement("span");
    spanMessage.innerHTML=message;
    htmlElement.after(spanMessage);*/

    //Segunda forma
    //Parámetros de insertAdjacentHTML
    //beforeend, afterbegin, beforebegin,afterend
    removeErrors(htmlElement,nameSpan);
    htmlElement.classList.add("error-input");
    htmlElement.parentElement.insertAdjacentHTML(
        "beforebegin",
        `<p name=${nameSpan} class="span-error"> ${message} </p>`
    )
}

function removeErrors(htmlElement,spanName){
    const spanElement=document.querySelector(`[name=${spanName}]`);
    if (spanElement!==null) spanElement.remove();
}

function applyAnimation(nameSpan,animation){
    errorSpan=document.querySelector(`[name=${nameSpan}]`);
    if (errorSpan!==null){
      
            errorSpan.classList.add("animate__animated");
            errorSpan.classList.add(`${animation}`);
    }
   
}





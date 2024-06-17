
window.addEventListener("load",()=>{
    const form=document.querySelector("[id=form]");
    form.addEventListener("submit",(e)=>{
        let error="";
        e.preventDefault();
        const name=document.querySelector("[name=name]");
        const lastName=document.querySelector("[name=lastName]");
        const email=document.querySelector("[name=email]");
        const telephone=document.querySelector("[name=telephone]");
        const password=document.querySelector("[name=password]");
        const repeatPassword=document.querySelector("[name=password2]");
        const avatar=document.querySelector("[name=avatar]");
        const terms=document.querySelector("[name=terms]");
        const sex=document.querySelectorAll("[name=genre]");
        const state=document.querySelector("[name=state]");
        
       
        //Creo un arreglo donde almaceno todos los errores que se produzcan
        error=[];
        error.push(controlName(name));
        error.push(controlLastName(lastName));
        error.push(controlEmail(email));
        error.push(controlTelephone(telephone));
        error.push(controlPassword(password));
        error.push(controlRepeatPassword(repeatPassword));
        error.push(controlSex(sex));
        error.push(controlAvatar(avatar));
        error.push(controlState(state));
        error.push(terms.checked?'':'Acepte los términos y condiciones');
        //controlo que todos los errores sean vacíos
        const acum=("Acumulado: ",error.reduce((er,accum)=>{return accum+=er},""));
        
        /*error!==""?controlError('email-error','iconErrorEMail',email):removeErrors('email-error','iconErrorEmail');
        error!==""?controlError('phone-error','iconErrorPhone',telephone):error=controlPassword(password);
        error!==""?controlError('password-error','iconPasswordName',password):error=controlPassword(password);
        error!==""?controlError('password2-error','iconPassword2Name',password2):error="";*/

        //si es vacío todos los errores, muestro el éxito
        if(acum===""){
            applySuccessToSubmit(form);
           
        }else{
            //applyErrorToSubmit(error);
            controlError('name-error','iconErrorName',name);
            controlError('lastName-error','iconErrorLastName',lastName);
            controlError('email-error','iconErrorEmail',email);
            controlError('phone-error','iconErrorPhone',telephone);
            controlError('password-error','iconErrorPassword',password);
            controlError('password2-error','iconErrorPassword2',repeatPassword);
            controlError('sex-error','iconErrorSex',sex);
            controlError('avatar-error','iconErrorAvatar',avatar);
            controlError('state-error','iconErrorState',state);
            controlError('terms-error','iconErrorTerms',terms);


        }
    
     })
     applyBlurEffect();
     form.reset();
})

//#################################################################
// Inicio de la aplicación del eventListener para el blur
//de los distintos campos del formulario
//#################################################################
function applyBlurEffect(){
    const name=document.querySelector("[name=name]");
    const lastName=document.querySelector("[name=lastName]");
    const email=document.querySelector("[name=email]");
    const telephone=document.querySelector("[name=telephone]");
    const password=document.querySelector("[name=password]");
    const repeatPassword=document.querySelector("[name=password2]");
    const avatar=document.querySelector("[name=avatar]");
    const sex=document.querySelectorAll("[name=genre]");
    const state=document.querySelector("[name=state]");
    const terms=document.querySelector("[name=terms]");
    

    name.addEventListener("keyup",(e)=>{controlError('name-error','iconErrorName',e.target);});
    name.addEventListener("blur",(e)=>{controlError('name-error','iconErrorName',e.target);});

    lastName.addEventListener("keyup",(e)=>{controlError('lastName-error','iconErrorLastName',e.target);});
    lastName.addEventListener("blur",(e)=>{controlError('lastName-error','iconErrorLastName',e.target);});

    email.addEventListener("keyup",(e)=>{controlError('email-error','iconErrorEmail',e.target);});
    email.addEventListener("blur",(e)=>{controlError('email-error','iconErrorEmail',e.target);});
    
    telephone.addEventListener("keyup",(e)=>{controlError('phone-error','iconErrorPhone',e.target);});
    telephone.addEventListener("blur",(e)=>{controlError('phone-error','iconErrorPhone',e.target);});

    password.addEventListener("keyup",(e)=>{controlError('password-error','iconErrorPassword',e.target);});
    password.addEventListener("blur",(e)=>{controlError('password-error','iconErrorPassword',e.target);});

    repeatPassword.addEventListener("keyup",(e)=>{controlError('password2-error','iconErrorPassword2',e.target);});
    repeatPassword.addEventListener("blur",(e)=>{controlError('password2-error','iconErrorPassword2',e.target);});
    
    avatar.addEventListener("change",(e)=>{controlError('avatar-error','iconErrorAvatar',e.target);});
   
    //Le aplico a cada botón para que revise si hay un error al momento
    //De hacer click.
    sex.forEach((sexButton)=>{
        sexButton.addEventListener("click",(e)=>{
            controlError('sex-error','iconErrorSex',sex);
        });
    });
    
    

    state.addEventListener("change",(e)=>{
        controlError('state-error','iconErrorState',state); 
    });

    terms.addEventListener("click",(e)=>{
        controlError('terms-error','iconErrorTerms',terms);
    });
}

//#################################################################
//Fin de los addListener para el blur
//#################################################################

//#################################################################
//Inicio de los controles para los campos
//#################################################################


/**
 * Controla los errores en el campo nombre
 * @param {HTMLInputElement} nameInput El input que registrará el nombre del usuario
 * @returns {String} retornará un string que será vacío en caso de que no haya errores
 */
function controlName(nameInput){
    $errorMessage="";
    if($errorMessage==="") $errorMessage=onlyLetters(nameInput).replace('campo','nombre');
    if(nameInput.value.length===0 && $errorMessage==="") $errorMessage="Coloque un nombre por favor";
    if(nameInput.value.length<3 && $errorMessage==="") $errorMessage="El nombre debe tener mínimo 3 caracteres";
    

    return $errorMessage.trim();

}

/**
 * Controla los errores en el campo apellido
 * @param {HTMLInputElement} lastNameInput El input que registra el apellido del usuario
 * @returns {String} Retornará un string que será vacío en caso de error
 */
function controlLastName(lastNameInput){

    errorMessage="";
    if(lastNameInput.value.length===0) errorMessage="No deje el apellido en blanco";
    if(lastNameInput.value.length<=3 && errorMessage==="") errorMessage="El apellido debe tener mínimo 3 caracteres";
    if(errorMessage==="") errorMessage=onlyLetters(lastNameInput).replace('campo','apellido');
    return errorMessage.trim();
}

/**
 * Controla los errores en el campo email
 * @param {HTMLInputElement} emailInput El input con los datos del email
 * @returns {String} Retorna un string con el mensaje de error producido por el mail
 */
function controlEmail(emailInput){
    const emailRegex=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const errorMessage=emailRegex.test(emailInput.value)?"":"Email Inválido";
    return errorMessage.trim();
}

/**
 * Controla los errores en el campo teléfono
 * @param {HTMLInputElement} phoneInput El input con los datos del teléfono
 * @returns {String} Retorna un string con el error del teléfono
 */
function controlTelephone(phoneInput){
    let msgError=onlyIntegers(phoneInput);
    return msgError!==''? msgError.replace('campo','teléfono'):msgError;
}

/**
 * Controla los errores para la contraseña
 * @param {HTMLInputElement} passwordInput El input con los datos de la contraseña
 * @returns {String} Retorna un string con el error de la contraseña
 */
function controlPassword(passwordInput){
    const passRegex=/^.{8,64}$/;
    const errorMessage=passRegex.test(passwordInput.value)?"":"La contraseña debe contener un mínimo de 8 caracteres";
    return errorMessage.trim();
}


/**
 * Controla los errores para la repetición de la contraseña
 * @param {HTMLInputElement} repeatInput El input con los datos de la contraseña repetida
 * @returns {String} Retorna un string con el error producido.
 */
function controlRepeatPassword(repeatInput){
    const password=document.querySelector("[name=password]");
    const errorMessage=password.value!==repeatInput.value?"Las constraseñas no coinciden":"";
    return errorMessage.trim();
}

/**
 * Revisa que el campo tenga solamente letras
 * @param {HTMLInputElement} dataInput El input con los datos que se controlarán
 * @returns {String} Retorna un string con el
 */
function onlyLetters(dataInput){
    const onlyLetterRegex=/^[A-ZÁÉÍÓÚÑ]+$/i;
    const errorMessage=onlyLetterRegex.test(dataInput.value)?"":"El campo sólo debe contener letras";
    return errorMessage.trim();
}

function onlyIntegers(dataInput){
    const onlyIntegersRegex=/^\d{8,10}$/;
    const errorMessage=onlyIntegersRegex.test(dataInput.value)?"":"El campo sólo debe contener de 8 a 10 números";
    return errorMessage.trim();
}

function controlAvatar(dataInput){
    
    var allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
    let errorMessage='';
    if(dataInput.files.length===0) errorMessage='Por favor, seleccione una imagen';
    if(errorMessage==='' && !allowedExtensions.exec(dataInput.value)) errorMessage='Por favor, elija un archivo jpg, jpeg, png, gif';
    return errorMessage;
}

function controlSex(dataInput){
    let msg='';
    msg=dataInput===undefined?'Seleccione un sexo por favor':'';
    if(msg.length===0){
        msg='Seleccione un sexo por favor';
        for (let i = 0; i < dataInput.length; i++){ 
            
            if (dataInput[i].checked) {
               msg='';
               break;
           }
        } 
    }
    return msg;
}

function controlState(dataInput){
    let msg='';
    let valueState=parseInt(dataInput.value);
    if(isNaN(valueState) || valueState<1) msg='Seleccione una provincia';
    return msg;

}

//#################################################################
//Fin de los controles para los campos
//#################################################################

/**
 * 
 * @param {String} tagName El nombre que tendrá la etiqueta de error para el input específico
 * @param {String} iconName El nombre para el ícono de erorr
 * @param {HTMLInputElement} htmlElement El input que podría tener el error
 * @returns {String} Retorna un string con el error producido
 */
function controlError(tagName,iconName,htmlElement){

    let error="";
    switch(tagName){
        case 'name-error':
            error=controlName(htmlElement);
            break;
        case 'lastName-error':
            error=controlLastName(htmlElement);
            break;
        case 'email-error':
            error=controlEmail(htmlElement);
            break;
        case 'phone-error':
            error=controlTelephone(htmlElement);
            break;
        case 'password-error':
            error=controlPassword(htmlElement);
            break;
        case 'password2-error':
            error=controlRepeatPassword(htmlElement);
            break;
        case 'avatar-error':
            error=controlAvatar(htmlElement);
            break;
        case 'sex-error':
            error=controlSex(htmlElement);
            break;
        case 'state-error':
                error=controlState(htmlElement);
                break;
        case 'terms-error':
            error=htmlElement.checked?'':'Acepte los términos y condiciones'
        
    }
    
    removeErrors(tagName,iconName);
    if(error!==""){
        placerSpanError(htmlElement,error,tagName,iconName)
        applyAnimation(tagName,"animate__flash");
    }
   
     return error;
}



/**
 * 
 * @param {HTMLInputElement} htmlElement el elemento input al que se le agregará el efecto
 * @param {String} message El mensaje de error que se mostrará
 * @param {String} nameSpan El nombre del span de error al que se le aplicará el efecto
 * @param {String} iconName El nombre de la etiqueta del ícono de error
 */
function placerSpanError(htmlElement,message,nameSpan,iconName){
 
    /*const spanMessage=document.createElement("span");
    spanMessage.innerHTML=message;
    htmlElement.after(spanMessage);*/
    let errorElement=document.getElementById(nameSpan);
    let iconError=document.createElement("i");
    //const errorTagExist=document.querySelector(`[name=${nameSpan}]`)
    //Segunda forma
    //Parámetros de insertAdjacentHTML
    //beforeend, afterbegin, beforebegin,afterend
    errorElement.classList.add("form__input-error");
    errorElement.classList.add(`${nameSpan}`);
    errorElement.setAttribute('name',nameSpan);
        //si no es el input del avatar, coloco un estilo particular
        //esto lo hago así porque el ícono queda feo para la etiqueta de la imagen
       
           
            iconError.classList.add('form__validation-state');
            iconError.classList.add('fa-regular');
            iconError.classList.add('fa-circle-xmark');
            iconError.setAttribute('name',iconName);
            errorElement.innerHTML=message;
            if(htmlElement.type==='INPUT') htmlElement.before(iconError);
            //htmlElement.after(errorElement);
            
 
}

/**
 * 
 * @param {String} spanName El nombre de la etiqueta que tiene el mensaje de error
 * @param {String} iconName El nombre del ícono que muestra el mensaje de error
 */
function removeErrors(spanName,iconName){
    const spanElement=document.querySelector(`[name=${spanName}]`);
    const iconElement= document.querySelector(`[name=${iconName}]`);
    let removed=false;
    //const iconElement=document.querySelector(`[name=${iconName}]`);
    if (spanElement!==null){
        spanElement.innerText='';
        removed=true;
    }
    if(iconElement!==null)iconElement.remove();
    return removed;
}

/**
 * 
 * @param {String} nameSpan El nombre de la etiqueta que muestra el error
 * @param {String} animation El nombre de la animación que se colocará a la etiqueta
 */
function applyAnimation(nameSpan,animation){
    errorSpan=document.querySelector(`[name=${nameSpan}]`);
    if (errorSpan!==null){
      
            errorSpan.classList.add("animate__animated");
            errorSpan.classList.add(`${animation}`);
    }
   
}

function applyErrorToSubmit(msgError){
    /*const containerSuccess=document.querySelector(`[id=msgSuccess]`);
    const containerError=document.querySelector(`[id=msgError]`);;
    if(containerSuccess!==null) containerSuccess.remove();
    if(containerError!==null) containerError.remove();
    let containerElement=document.createElement("div");
    let errorElement=document.createElement("small");
    let iconError=document.createElement("i");
    containerElement.classList.add('form__msg');
    containerElement.setAttribute('id','msgError');
    iconError.classList.add('bi');
    iconError.classList.add('bi-exclamation-triangle-fill');
    iconError.innerHTML=msgError;
    errorElement.appendChild(iconError);
    containerElement.appendChild(errorElement);
    form.before(containerElement);
    containerElement.style.textAlign="center";
    containerElement.scrollIntoView({ behavior: 'smooth', block: 'start' });*/
    let errorUl=document.createElement('ul');
    
    //filtro los campos que puedan estar en blanco
    msgError=msgError.filter((error)=>error!=='');
    //recorro el arreglo de errores y voy creando un li para cada uno de ellos
    msgError.forEach((error)=>{
        let errorLi=document.createElement('li');
        errorLi.innerText=`${error}`;
        errorUl.append(errorLi);
    })
    Swal.fire({
        icon: "error",
        title: "Oops...",
        html: errorUl,
      });

}

async function applySuccessToSubmit(formRegister){
    /*const containerError=document.querySelector(`[id=msgError]`);
    if(containerError!==null) containerError.remove();
    let containerElement=document.createElement("div");
    let successElement=document.createElement("small");
    let iconSuccess=document.createElement("i");
    containerElement.classList.add('form__msg');
    containerElement.setAttribute('id','msgSuccess');
    iconSuccess.classList.add('bi');
    iconSuccess.classList.add('bi-exclamation-triangle-fill');
    iconSuccess.innerHTML='Formulario completado con éxito';
    successElement.appendChild(iconSuccess);
    containerElement.appendChild(successElement);
    form.before(containerElement);
    containerElement.style.textAlign="center";
    containerElement.scrollIntoView({ behavior: 'smooth', block: 'start' });*/
    /*Swal.fire({
        title: "Formulario Correcto ¿Deseas enviarlo?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Enviar",
        denyButtonText: `No Enviar`
      }).then((result) => {
       
        if (result.isConfirmed) {
          formRegister.submit();
          
        } else if (result.isDenied) {
          Swal.fire("Formulario no enviado", "", "info");
        }
      });*/

      const { value: url } = await Swal.fire({
        title:'Formulario Comprobado',
        text:'¿Desea enviarlo a formfree? Coloque la url',
        icon:'success',
        showCancelButton:true,
        input: "url",
        inputLabel: "URL address",
        inputPlaceholder: "Enter the URL"
      });
      if (url) {
        const form=document.querySelector('#form')
        form.setAttribute('action',url);
        formRegister.submit();
      }
      
}


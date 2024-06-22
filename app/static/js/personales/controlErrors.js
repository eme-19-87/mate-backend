/**
 * Controla si el valor de input está vacío
 * @param {HTMLInputElement} dataInput El input con los datos que se verificará si está en blanco
 * @returns {String} Retorna un string con el mensaje de error producido. Vacío en caso contrario
 */
function controlWhite(dataInput){
    const errorMessage=dataInput.value.length===0?"Datos vacíos":"";
    return errorMessage.trim();
}



/**
 * Comprueba si los datos del input son sólamente letras
 * @param {HTMLInputElement} dataInput El elemento input que contendrá el dato que vamos a controlar
 * @returns {String} Retorna un string con el código de error. En caso de que no haya, será vacío
 */
function onlyLetters(dataInput){
    const onlyLetterRegex=/^[A-ZÁÉÍÓÚÑ]+$/i;
    const errorMessage=onlyLetterRegex.test(dataInput.value)?"":"El campo sólo debe contener letras";
    return errorMessage.trim();
}

/**
 * Comprueba si el valor de un input es entero
 * @param {HTMLInputElement} dataInput El elemento input que contendrá el dato que vamos a controlar
 * @returns {String} Retorna un string con el código de error. En caso de que no haya, será vacío
 */
function onlyIntegers(dataInput){
    const value=parseInt(dataInput.value);
    const errorMessage=isNaN(value)?"El valor debe ser un entero":"";
    return errorMessage.trim();
}

/**
 * Comprueba si el valor de un input es numérico no negativo
 * @param {HTMLInputElement} dataInput El elemento input que contendrá el dato que vamos a controlar
 * @returns {String} Retorna un string con el código de error. En caso de que no haya, será vacío
 */
function onlyIntegersNoNegative(dataInput){
    const value=parseInt(dataInput.value);
    let errorMessage=isNaN(value)?"El valor debe ser un entero":"";
    errorMessage=='' && value<0?"El valor debe ser mayor a cero":"";
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
 * Controla si el valor de input cumple las condiciones de un dni
 * @param {HTMLInputElement} dnilInput El input con los datos del email
 * @returns {String} Retorna un string con el mensaje de error producido por el mail
 */
function controlDni(dniInput){
    const dniRegex=/^[0-9]{2}\.?[0-9]{3,3}\.?[0-9]{3,3}$$/i;
    const errorMessage=dniRegex.test(dniInput.value)?"":"Email Inválido";
    return errorMessage.trim();
}



export { 
    onlyIntegers,
    onlyLetters,
    controlEmail,
    onlyIntegersNoNegative,
    controlDni,
    controlWhite
}
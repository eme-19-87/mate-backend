window.addEventListener('load',()=>{
    placeCards();
})


function placeCards(){
    let peopleData=
    [
        {'nombre':'Enrique',
        'apellido':'Espinoza',
        'nacimiento':'31/01/1987',
        'descripcion':'Estudio Licenciatura en sistemas en la Universidad Nacional Del Nordeste. Estoy en tercer año. Tengo conocimientos sobre Python, HTML, CSS, Javascript, PHP y Base De Datos Con MySQL'+
        '<p>Me gusta leer y mejorar mis técnicas de programación.</p>',
        'img':'assets/img/persona1.jpg'
        },
        {'nombre':'Karen',
        'apellido':'Amarilla',
        'nacimiento':'04/01/1994',
        'descripcion':'Soy estudiante del CBC en la Universidad de Buenos Aires, Tengo conocimientos básicos de Python y Java.'+
        '<p>En mis tiempos libres me gusta leer novelas, anime y practicar Taekwondo.</p>',
        'img':'assets/img/karen.jpg'},

        {'nombre':'Matías',
        'apellido':'Cirigliano',
        'nacimiento':'18/07/1984',
        'descripcion':'Soy Licenciado en Producción de Bioimágenes, trabajo en Radioterapia. Hace poco me inicié en el mundo de la programación, por curiosidades que surgieron en mi trabajo. Me gusta hacer actividad física, principalmente fútbol y escalada deportiva.',
        'img':'assets/img/persona1.jpg'},

    ];

    peopleData.forEach((data)=>placeACard(data));
}

function placeACard(data){
    let mainTag=document.getElementById("us-information");
    let divCardContainer=document.createElement("div");
    let divCardDescription=document.createElement("div");
    let divCardMeta=document.createElement("div");
    let h1CardDescription=document.createElement("h1");
    let h2CardDescription=document.createElement("h2");
    let pCardDescription=document.createElement("p");
    let divCardPhoto=document.createElement("div");

    divCardContainer.setAttribute('class','blog-card');
    divCardContainer.classList.add('alt');
    divCardDescription.setAttribute('class','description');
    divCardMeta.setAttribute('class','meta');
    divCardPhoto.setAttribute('class','photo');
    divCardDescription.classList.add('text-wrap');
    h1CardDescription.innerText=data.nombre+' '+data.apellido;
    h2CardDescription.innerText=data.nacimiento;
    pCardDescription.innerHTML=data.descripcion;
    divCardPhoto.style.backgroundImage="url('" + data.img + "')"

    divCardDescription.append(h1CardDescription);
    divCardDescription.append(h2CardDescription);
    divCardDescription.append(pCardDescription);
    divCardMeta.append(divCardPhoto);
    divCardContainer.append(divCardDescription);
    divCardContainer.append(divCardMeta);
    mainTag.append(divCardContainer);


}
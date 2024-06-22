function getProductos(){
    return[
        {
            id:1,
            nombre:'Set Matero con Bolso Premium Crudo Super Deluxe',
            precio:'$57.295,00',
            rutaImg:'setMatero2.png',
            descripcion:'Set Matero De Prueba',
            categoria:"EquipoMatero",
            activo:1
         },
         {
        id:2,
         nombre:'Set Matero con Canasta Neo Negro',
         precio:'$33.115,00',
         rutaImg:'set_mate_2.png',
         descripcion:'Set Matero prueba 2',
         categoria:"EquipoMatero",
         activo:1
        },
        {
        id:3,
        nombre:'Set Matero con Bolso Premium Begin',
        precio:'$57.295,00',
        rutaImg:'setMatero3.png',
        descripcion:'Set Matero prueba 3',
        categoria:"EquipoMatero",
        activo:1
        },
        {
        id:4,
        nombre:'Set Matero con Bolso Premium Crudo',
        precio:'$57.295,00',
        rutaImg:'setMatero4.png',
        descripcion:'Set Matero De Prueba 4',
        categoria:"EquipoMatero",
        activo:1
        },
        {
            id:5,
            nombre:'Set Matero 5 De Cuero',
            precio:'$7600',
            rutaImg:'prod1.png',
            descripcion:'Set matero 5 de prueba cuero',
            categoria:'EquipoMatero',
            activo:1
        },
        {
        id:6,
        nombre:'Mate Pampa',
        precio:'$8.060,00',
        rutaImg:'mate1.png',
        descripcion:'Prueba primer mate',
        categoria:"Mate",
        activo:1
     },
     {
        id:7,
     nombre:'Mate Uruguayo Camionero',
     precio:'$10.415,00',
     rutaImg:'mate2.png',
     descripcion:'prueba segundo mate',
     categoria:"Mate",
     activo:1
    },
    {
        id:8,
     nombre:'Yerba Mate "Fronteras" en Lata ',
     precio:'$10.000,00',
     rutaImg:'yerbamate_lata.png',
     descripcion:'Yerba en Lata',
     categoria:"Latas",
     activo:1
    },
    {
        id:9,
     nombre:'Bolso Matero Camel',
     precio:'$20.000,00',
     rutaImg:'bolso_matero.png',
     descripcion:'Bolso matero, ideal salidas',
     categoria:"BolsoMatero",
     activo:1
    },
    {
        id:10,
     nombre:'Termo Lumi Argentina',
     precio:'$25.000,00',
     rutaImg:'termoArg.svg',
     descripcion:'Argentina Mi país',
     categoria:"Termos",
     activo:1
    },
 {
        id:11,
     nombre:'Little Mate de Colores',
     precio:'$2.500,00',
     rutaImg:'mate3.png',
     descripcion:'Mates pequeños, colores varios',
     categoria:"Mate",
     activo:1
    },

    
    ];
}

function setDatosIniciales(){
    const categoryData=JSON.stringify({
        datos:getProductos(),
        categorias:['Equipo Mate','Mate']
    });
    localStorage.setItem("dataAlmacenMate", categoryData);
}

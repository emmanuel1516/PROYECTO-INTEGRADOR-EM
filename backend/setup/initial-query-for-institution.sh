db.institutions.insertOne({
    name: "SneakerZone",
    address: "Av. Siempreviva 100, San Juan, Argentina",
    phone: "+54 264 1234-5678",
    email: "info@miapp.com",
    logo: "logo.png",
    mission: {
        description: "Nuestra misión es ofrecer calzados de las mejores marcas del mundo al mejor precio, priorizando la calidad, el confort y el estilo. Buscamos brindar una experiencia de compra ágil, confiable y accesible, garantizando productos originales y asesoramiento personalizado para cada cliente. Creemos que la moda urbana y el rendimiento deportivo deben estar al alcance de todos.",
        image: "mission.png",
    },
    vision: {
        description: "Ser reconocidos como la tienda de calzado líder en el mercado argentino y latinoamericano, destacándonos por la excelencia en atención, la innovación constante y la integración de nuevas tendencias. Aspiramos a construir una comunidad de clientes fieles que encuentren en SneakerZone no solo productos, sino identidad, confianza y una marca que los acompaña en su estilo de vida.",
        image: "vision.png",
    },
    values: {
        description: "Trabajamos exclusivamente con marcas reconocidas y productos garantizados. Brindamos una atención cercana, profesional y transparente. Nos apasionan el diseño, las tendencias y la cultura sneaker. Apostamos por una cadena de consumo más consciente y sostenible. Fomentamos la colaboración, el respeto y el crecimiento colectivo.",
        image: "values.png",
    },
    createdAt: new Date(),
    updatedAt: new Date()
});
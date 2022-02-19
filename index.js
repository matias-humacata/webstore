const express = require("express"); // Es el framework que utilizamos para crear el back-end //
const app = express(); // Inicializa la aplication //
const port = 3000; // Indica que va a usar el puerto 3000 //

//middleware del body-parser //
app.use(express.json());

// Creamos una constante, en este caso un Array con objetos //
// Dentro de este array estarán los productos que tenemos en el Front-End //
let products = [
    {
      id: 1,
      name: "2 Pesas",
      price: 50,
      image: "images/product-1.jpg",
      stock: 3,
    },
    {
      id: 2,
      name: "Banco ajustable",
      price: 50,
      image: "images/product-2.jpg",
      stock: 3,
    },
    {
      id: 3,
      name: "Kit de discos con barra",
      price: 50,
      image: "images/product-3.jpg",
      stock: 50,
    },
    {
      id: 4,
      name: "2 Mancuernas",
      price: 50,
      image: "images/product-4.jpg",
      stock: 50,
    },
    {
      id: 5,
      name: "Barra dorsalera",
      price: 50,
      image: "images/product-5.jpg",
      stock: 50,
    },
    {
      id: 6,
      name: "Pesa Rusa",
      price: 50,
      image: "images/product-6.jpg",
      stock: 50,
    },
  ];

// creamos la aplication del Get, con la dirección /api/products //
// La app va a retornar la lsita de productos
app.get("/api/products", (req, res) => {
      res.send(products); 
});

// Definimos el post //
app.post("/api/pay", (req, res) => {
 let ids = req.body; // Delcaramos el id para luego recorrerlo //
 const productsCopy = products.map(p => ({...p}));
 ids.forEach(id => {  // Recorremos el producto con un forEach //
   const product = productsCopy.find(p => p.id === id); // Utilizamos un find() para obtener el id //
   if(product.stock > 0){
    product.stock --; // Generamos el descuento del stok en la lsita del producto //
   }
   else {
     throw("Sin stock"); // Generamos un alerta en el back cuando cuando no haya stock //
   }
   
 });
 products = productsCopy;
  res.send(products); 
});

//app use, que nos enviara a la carpeat de archivos staticos ////
app.use("/", express.static("fe"));


// app que escucha el puerto donde correra el server //
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
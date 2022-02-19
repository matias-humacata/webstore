let productList = []; // Declaramos la variable de forma lgobal //
let carrito = [];
let total = 0;

// Function para introducir los elementos al array de products //
//contabiliza los productos //
function add(productId, price) {
    // Generamos que el stock no quede en negativo //
    const product = productList.find(p => p.id === productId); 
    product.stock --;

    console.log(productId, price);
    carrito.push(productId);
    total = total + price;
    document.getElementById("checkout").innerHTML = `Pagar $${total}`
    displayProducts();
}

//Metodo post //
// Solucionamos el error 404 con un try/catch //
async function pay() {
    try{
        const productList = await (await fetch("/api/pay", {
            method: "post",
            body: JSON.stringify(carrito),
            headers: {
             "Content-Type": "application/json"
            }
        })).json();

    }
    catch{
       window.alert("Sin stock"); // generamos un alert cuando no haya más stock //
    }
     carrito = [];
     total = 0;
     await fetchProducts();
     document.getElementById("checkout").innerHTML = `Pagar $${total}`
}

// Creamos una function que nos traiga los archivos staticos del html //
// Para eso iteramos la lsita de productos = en  un función con un forach //
// Función con la que extraeremos los elelemntos del contenido html del Front //

function displayProducts() {
    let productsHTML = ''; // String donde vamos a mandar cada iteración sobre la lista //
    productList.forEach(p => {
      let buttonHTML = `<button class="button-add" onclick="add(${p.id}, ${p.price})">Agregar</button>`;
        // Anulamos el button cuando nos quedemos sin stock //
         if(p.stock <= 0){
            buttonHTML = `<button disabled class="button-add desabled" onclick="add(${p.id}, ${p.price})">Sin Stock</button>`; 
         }

        productsHTML +=
        `<div class="product-container">
            <h3>${p.name}</h3> 
            <img src="${p.image}" />
            <h1>$${p.price}</h1>
            ${buttonHTML}
        </div>`
    });
// generamos que el contenido padre del html sea igual a la variable string de iteración //
    document.getElementById('page-content').innerHTML = productsHTML;
}

async function fetchProducts(){
    productList = await (await fetch("/api/products")).json();
    displayProducts(); // llamamos la función con la lista de productos como referencia //
}

// Creamos un fetch //
// con esta app ingresamos la dirección: /api/productsy nos devolvera la lista de prodcutos //
// con esto buscamos que la lsita de productos rempace lo que tenemos hardcodeo en el front estaticos //
window.onload = async() => {
    await fetchProducts();
    console.log(productList);
    
}

// https://www.youtube.com/watch?v=niT-i9dWrs4 //
// pausada 05:21 hs  //
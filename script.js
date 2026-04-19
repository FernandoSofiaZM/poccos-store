async function cargarProductos() {
    const res = await fetch("productos.json");
    const productos = await res.json();
    window.lista = productos;
    mostrarProductos(productos);
}

function mostrarProductos(lista) {
    const contenedor = document.getElementById("productos");
    contenedor.innerHTML = "";

    lista.forEach(p => {
        contenedor.innerHTML += `
        <div class="card">
            <img src="${p.imagen}">
            <h3>${p.nombre}</h3>
            <p>L.${p.precio}</p>
            <p class="${p.estado === 'Disponible' ? 'disponible':'agotado'}">${p.estado}</p>
            ${
                p.estado === "Disponible"
                ? `<button onclick="comprar('${p.nombre}',${p.precio})">Comprar</button>`
                : `<p class="agotado">No disponible</p>`
            }
        </div>`;
    });
}

function filtrar(cat) {
    if(cat === "todos") {
        mostrarProductos(window.lista);
    } else {
        mostrarProductos(window.lista.filter(p => p.categoria === cat));
    }
}

function comprar(nombre, precio) {
    const mensaje = `Hola, quiero comprar:%0AProducto: ${nombre}%0APrecio: L.${precio}`;
    window.open(`https://wa.me/504TU_NUMERO?text=${mensaje}`);
}

cargarProductos();

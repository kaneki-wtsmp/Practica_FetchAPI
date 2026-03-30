function mostrarContactos() {
    fetch("http://localhost:3000/contactos")
        .then((response) => response.json())
        .then((data) => {
            const tbody = document.getElementById("tablaContactos");
            tbody.innerHTML = "";

            data.data.forEach((contacto) => {
                const fila = document.createElement("tr");
                const celdaNombre = document.createElement("td");
                celdaNombre.textContent = contacto.nombre;

                const celdaTelefono = document.createElement("td");
                celdaTelefono.textContent = contacto.telefono;
                const celdaAcciones = document.createElement("td");
                const botonEliminar = document.createElement("button");
                botonEliminar.textContent = "Eliminar";
                botonEliminar.className = "btn btn-sm btn-danger delete-btn";
                botonEliminar.addEventListener("click", () => {
                    eliminarContacto(contacto.id);
                });
                celdaAcciones.appendChild(botonEliminar);

                fila.appendChild(celdaNombre);
                fila.appendChild(celdaTelefono);
                fila.appendChild(celdaAcciones);

                tbody.appendChild(fila);
            });
        })
        .catch((error) => {
            console.error("Error al cargar contactos:", error);
        });
}
mostrarContactos();

const form = document.getElementById("contactForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;

    
    fetch("http://localhost:3000/contactos", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({ nombre: nombre, telefono: telefono }) 
    })
    .then((response) => response.json()) 
    .then((data) => {
        console.log("Servidor respondió:", data);

        mostrarContactos();

        form.reset();
    })
    .catch((error) => {
        console.error("Hubo un error al guardar el contacto:", error);
    });
});

function eliminarContacto(id) {
    fetch(`http://localhost:3000/contactos/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => response.json())
    .then((data) => {
    
        alert(data.message);

    
        mostrarContactos();
    })
    .catch((error) => {
        console.error("Error al eliminar contacto:", error);
    });
}
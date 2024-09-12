
function obtenerDatos() {
    const nombrePersonajeInput = document.getElementById("nombrePersonaje");
    const infoPersonaje = document.getElementById("infoPersonaje");

    const nombrePersonaje = nombrePersonajeInput.value.toLowerCase();


    if (nombrePersonaje === "") {
        infoPersonaje.innerHTML = `<p>Introduce un nombre de personaje</p>`;
        return;
    }
    fetch(`https://rickandmortyapi.com/api/character/?name=${nombrePersonaje}`)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                const { name, status, species, gender, origin, image } = data.results[0];

                infoPersonaje.innerHTML = `
                    <h2>${name}</h2>
                    <p>Estado: ${status}</p>
                    <p>Especie: ${species}</p>
                    <p>Género: ${gender}</p>
                    <p>Origen: ${origin.name}</p>
                    <img src="${image}" alt="${name}"/>
                `;
            } else {
                infoPersonaje.innerHTML = `<p>No se encontró ningún personaje con ese nombre</p>`;
            }
        })
        .catch(error => {
            console.error(error);
            infoPersonaje.innerHTML = `<p>No ha sido posible acceder al personaje</p>`;
        });
}
// Seleccionamos los elementos del HTML
const inputCiudad = document.getElementById('ciudadInput');
const btnBuscar = document.getElementById('btnBuscar');
const divResultado = document.getElementById('resultado');
const apiKey = "9404c22ad73b43211a73b75494107b7c";

// Escuchamos el clic del botón
btnBuscar.addEventListener('click', () => {
    const ciudad = inputCiudad.value.trim();

    if (ciudad === "") {
        divResultado.innerHTML = "<p style='color: red;'>Por favor, escribe una ciudad.</p>";
        return;
    }

    consultarClima(ciudad);
});

// Función para consultar la API
async function consultarClima(ciudad) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;

    try {
        divResultado.innerHTML = "Buscando...";
        
        // Petición fetch estándar a la API
        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        // Si la ciudad no existe
        if (datos.cod === "404") {
            divResultado.innerHTML = "<p style='color: red;'>Ciudad no encontrada.</p>";
            return;
        }

        // Si la API Key da error o aún se está activando
        if (datos.cod === 401) {
            divResultado.innerHTML = "<p style='color: red;'>Error: API Key inválida o activándose.</p>";
            return;
        }

        // Pintamos los datos en pantalla
        const temperatura = datos.main.temp;
        const descripcion = datos.weather[0].description;
        const nombreCiudad = datos.name;

        divResultado.innerHTML = `
            <h3>Clima en ${nombreCiudad}</h3>
            <p style='font-size: 24px; font-weight: bold;'>${temperatura} °C</p>
            <p style='text-transform: capitalize;'>${descripcion}</p>
        `;

    } catch (error) {
        divResultado.innerHTML = "<p style='color: red;'>Hubo un error de conexión.</p>";
        console.error(error);
    }
}

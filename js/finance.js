let url ='https://www.dolarsi.com/api/api.php?type=valoresprincipales' //defino variable url donde hacemos referencia al origen de los datos

var contenido=document.querySelector('#contenido')

fetch (url)
.then(res => res.json())
.then(dato=>{
    console.log(dato)
    contenido.innerHTML = `
    <a href="" class="quotes-type">
        <p class="quotes-title">Dólar Banco Nación</p>
        <p class="quotes-number">${dato[0].casa.venta}</p>
    </a>
    <a href="" class="quotes-type">
        <p class="quotes-title">Dólar Blue</p>
        <p class="quotes-number">${dato[1].casa.venta}</p>
    </a>
    <a href="" class="quotes-type">
        <p class="quotes-title">Dólar MEP</p>
        <p class="quotes-number">${dato[4].casa.venta}</p>
    </a>
    <a href="" class="quotes-type">
        <p class="quotes-title">Dólar CCL</p>
        <p class="quotes-number">${dato[3].casa.venta}</p>
    </a>


    `

})


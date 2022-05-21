

const btn = document.querySelector('.btnBuscar')
let tabla = document.querySelector('.tabla')
let campo = document.querySelector('.inputUsuario')

btn.addEventListener('click', () =>{
    mostrarEvento()
})


campo.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
     event.preventDefault();
     mostrarEvento()
    }
})

const mostrarEvento = () => {
    let input = campo.value
    tabla.innerHTML = ` <tr>
                            <th>Id</th>
                            <th>Email</th>
                            <th>Contraseña</th>
                        </tr>`

    if(input.length === 0) {
        
        getData()
    }else{
        filtrarData(input)
    }
}

const filtrarData = async (id)=> {
    const url = `https://jsonplaceholder.typicode.com/users?id=${id}`
    const resp = await fetch(url)
    const data = await resp.json()
    if(data.length > 0){
        const { name, email} = data[0]
            tabla.innerHTML += `
                <tr>
                    <td> ${id}</td>
                    <td>${name}</td>
                    <td> ${email}</td>
                </tr>` 
    }else{
        tabla.innerHTML = `<tr>No existe usuario con ese ID</tr>`
    }

}

const getData = async () => {
    const url = 'https://jsonplaceholder.typicode.com/users'
    const resp = await fetch(url)
    const data = await resp.json()



    data.map(element => {
        const {id, name, email} = element
        tabla.innerHTML += `
            <tr>
                <td> ${id}</td>
                <td>${name}</td>
                <td> ${email}</td>
            </tr>
            `
    })
    
}

getData()
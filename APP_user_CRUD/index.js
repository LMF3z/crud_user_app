document.addEventListener('DOMContentLoaded', () => {
    const formAdd = document.querySelector('#formAddUser')

    formAdd.addEventListener('submit', e => {
        e.preventDefault()

        let tipoForm = e.explicitOriginalTarget.id

        if(tipoForm == 'add'){
            const name = document.querySelector("input[name='nombre']").value
            const userName = document.querySelector("input[name='userName']").value

            if(validar(name, userName)){
                agregar(name, userName)
            }
        }else if(tipoForm == 'ed'){

            const listaVal = document.querySelector('#list')
            const name = document.querySelector("input[name='nombre']").value
            const userName = document.querySelector("input[name='userName']").value
            const id_user = document.querySelector("#id_user").value

            for(let c of listaVal.children){
                if(c.id == id_user){
                    c.children[0].childNodes[0].textContent = name
                    c.children[1].childNodes[0].textContent = userName
                }
            }

            document.querySelector('#formAddUser').reset()
            document.querySelector('#add').style.display = 'block'
            document.querySelector('#ed').style.display = 'none'
        }


    })


    // eliminar
    document.querySelector('#list').addEventListener('click', e => {
       let nameBtn = e.target.name
       let identificador = e.target.id
    //    let valores = e.target.parentElement

       if(nameBtn == 'delete'){
           eliminar(identificador)
       }else if(nameBtn == 'edit'){
           editar(identificador)
       }
    })
})

const validar = (n, un) => {
    if(n == '' || un == ''){
        alert('Campos no deben estar vacios')
        return null
    }else if(!isNaN(n) || !isNaN(un)){
        alert('No se admiten campos numericos')
        return null
    }else{
        return true
    }
}

const agregar = (nombre, user) => {

    const llave = Date.now()
    const lista = document.querySelector('#list')
    lista.innerHTML += `<tr id="${llave}">
    <td>${nombre}</td>
    <td>${user}</td>
    <td>
        <button class="btn btn-success" name="edit" id="${llave}">Editar</button>
        <button class="btn btn-danger" name="delete" id="${llave}">Eliminar</button>
    </td>
    </tr>`

    document.querySelector('#formAddUser').reset()
}

const eliminar = ident => {

    const tabla = document.querySelector('#list')

    for(let c of tabla.children)
        c.id == ident ? c.remove() : ''
}

const editar = ident => {
    document.querySelector('#add').style.display = 'none'
    document.querySelector('#ed').style.display = 'block'

    let n = ''
    let us = ''

    const listaVal = document.querySelector('#list')

    for(let c of listaVal.children){
        if(c.id == ident){
            // console.log(c.children[0].childNodes[0].textContent)

            n = c.children[0].childNodes[0].textContent
            us = c.children[1].childNodes[0].textContent
        }
    }

    document.querySelector('input[name="nombre"]').value = n
    document.querySelector('input[name="userName"]').value = us
    document.querySelector('#id_user').value = ident
}

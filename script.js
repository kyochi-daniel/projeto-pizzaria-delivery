let cart = []
let modalQt = 1
let modalKey = 0

const el = (el)=> document.querySelector(el)
const elAll = (el)=> document.querySelectorAll(el)

// Listagem das Pizzas
pizzaJson.map((item, index)=> {
    let pizzaItem = el('.models .pizza-item').cloneNode(true)

    pizzaItem.querySelector('a').setAttribute('data-key', index)
    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
    pizzaItem.querySelector('a').addEventListener('click', (e)=> {
        e.preventDefault()
        let key = e.currentTarget.getAttribute('data-key')
        modalQt = 1
        modalKey = key
        
        el('.pizzaBig img').src = pizzaJson[key].img;
        el('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        el('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        el('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        el('.pizzaInfo--size.selected').classList.remove('selected')
        elAll('.pizzaInfo--size').forEach((size, sizeIndex)=> {
            if(sizeIndex == 2) {
                size.classList.add('selected')
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
        })

        el('.pizzaInfo--qt').innerHTML = modalQt

        el('.pizzaWindowArea').style.opacity = 0
        el('.pizzaWindowArea').style.display = 'flex'
        setTimeout(()=> {
            el('.pizzaWindowArea').style.opacity = 1
        }, 200)
    })

    el('.pizza-area').append(pizzaItem)
})

// Eventos do MODAL
function closeModal() {
    el('.pizzaWindowArea').style.opacity = 0
    setTimeout(()=> {
        el('.pizzaWindowArea').style.display = 'none'
    }, 500)
}

elAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=> {
    item.addEventListener('click', closeModal)
})

el('.pizzaInfo--qtmenos').addEventListener('click', ()=> {
    if(modalQt > 1) {
        modalQt--
        el('.pizzaInfo--qt').innerHTML = modalQt  
    }
})

el('.pizzaInfo--qtmais').addEventListener('click', ()=> {
    modalQt++
    el('.pizzaInfo--qt').innerHTML = modalQt
})

elAll('.pizzaInfo--size').forEach((size, sizeIndex)=> {
    size.addEventListener('click', (e)=> {
        el('.pizzaInfo--size.selected').classList.remove('selected')
        size.classList.add('selected')
    })
})

el('.pizzaInfo--addButton').addEventListener('click', ()=> {
    let size = parseInt(el('.pizzaInfo--size.selected').getAttribute('data-key'))

    let identifier = pizzaJson[modalKey].id+'@'+size

    let key = cart.findIndex((item)=> item.identifier == identifier)

    if(key > -1) {
        cart[key].qt += modalQt
    } else {
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            size,
            qt: modalQt
        })
    }

    closeModal()
})

//Call on Load
let currentPage = 1
getMonsters(currentPage)

//Fetches
function getMonsters(page){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(resp => resp.json())
    .then(data => renderMonsters(data))
}

function newMonster(e){
    fetch('http://localhost:3000/monsters', {
        method :'post',
        headers : {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        },
        body : JSON.stringify({
            'name' : e.target.name.value,
            'age' : e.target.age.value,
            'description' : e.target.bio.value
        })
    })
    .then(res => res.json())
    .then(monster => {alert(`Thanks for adding ${monster.name}, aged ${monster.age}!`)})
}

//Change DOM
function renderMonsters(monsters){
    document.querySelector('#monster-container').innerHTML = ""
    monsters.forEach(mon => {
        let div = document.createElement('div')
        let h2 = document.createElement('h2')
        let h4 = document.createElement('h4')
        let p = document.createElement('p')
        h2.innerText = mon["name"]
        h4.innerText = `Age: ${mon["age"]}`
        p.innerText = `Bio: ${mon["description"]}`
        div.appendChild(h2)
        div.appendChild(h4)
        div.appendChild(p)
        document.querySelector('#monster-container').appendChild(div)
    })
}

//Event Handlers
function addMonster(e){
    e.preventDefault()
    if (e.target.name.value === "" || e.target.age.value === "" || e.target.bio.value === ""){
        alert("You must fill in all fields")
    } else {
        newMonster(e)
        e.target.name.value = ""
        e.target.age.value = ""
        e.target.bio.value = ""
    }
}

function pageBack(){
    currentPage -= 1
    getMonsters(currentPage)
}

function pageForward(){
    currentPage += 1
    getMonsters(currentPage)
}


//Event Listeners
document.querySelector('#new-monster').addEventListener('submit', addMonster)
document.getElementById('back').addEventListener('click', pageBack)
document.getElementById('forward').addEventListener('click', pageForward)


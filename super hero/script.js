//paste in the reference url
// https://superheroapi.com/api/access-token/character-id
// make sure to add .php to this specific api
// first .then is to get a response
// second .then is to do something with that json

const SUPERHERO_TOKEN = '591797616292804'
const BASE_URL = `https://superheroapi.com/api.php/${SUPERHERO_TOKEN}`

const newHeroButton = document.getElementById('NewHeroButton')
const heroImageDiv = document.getElementById('heroImage')
const searchButton = document.getElementById('searchButton')
const searchInput = document.getElementById('searchInput')




const getSuperHero = (id, name) => {
  
  fetch(`${BASE_URL}/${id}`)
    .then(response => response.json())
    .then(json => { 
      console.log(json.powerstats)
      const superHero = json
      showHeroInfo(json)
      
    }) 
      


}

const statToEmoji = {
  intelligence: '🧠',
  strength: '💪',
  speed: '⚡',
  durability: '🏋️',
  power: '💡',
  combat: '⚔️',
  
}

const showHeroInfo = (character) => {
  
  const name = `<h2>${character.name}</h2>`

  const img = `<img src= ${character.image.url} height=300 width=300 />`
  
  const stats = Object.keys(character.powerstats).map(stat => {
    return `<p>${statToEmoji[stat]} ${stat}: ${character.powerstats[stat]}</p>`
  }).join('')

  console.log(name)

  heroImageDiv.innerHTML = `${name}${img}${stats}`
  
}

const searchSuperHero = (name) => {
  console.log(searchInput.value)
  fetch(`${BASE_URL}/search/${name}`)
    .then(response => response.json())
    .then(json => {
      const hero = json.results[0]
      showHeroInfo(hero)
      })
}



const randomHero = () => {
  const numberOfHeroes = 731
  return Math.floor(Math.random() * numberOfHeroes) + 1

}

newHeroButton.onclick = () => getSuperHero(randomHero())
searchButton.onclick = () => searchSuperHero(searchInput.value)

//Next step here is to search for a superhero by entering the name
// name 👉 base_url/search/batman
// id: 👉 base_url/id
// we'll use json.results[0].image.url 
// because we should be safe grabbing the 0th result if we search by name








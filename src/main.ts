
type Brewery = {
    id: string,
    name: string,
    brewery_type: string,
    street: string,
    address_2: string |null,
    address_3:string | null,
    city: string,
    state: string,
    county_province:string | null,
    postal_code: string,
    country:string,
    longitude: string |null,
    latitude: string | null,
    phone: string,
    website_url:string | null,
    updated_at: string,
    created_at: string
}

type State={
    USState: string
    breweries: Brewery[],
}

let state: State={
    USState: "",
    breweries: [],
}

let mainEl=document.querySelector('main')

function renderMainHeader(){
 if(!mainEl) return

let h1El=document.createElement('h1')
h1El.textContent='List of Breweries'

let headerEl=document.createElement('header')
headerEl.classList.add('search-bar')

let formEl=document.createElement('form')
formEl.id='search-breweries-form'
formEl.autocomplete='off'

let labelEl=document.createElement('label')
labelEl.htmlFor='search-breweries'
labelEl.textContent='Search breweries:'

let h2El=document.createElement('h2')
h2El.textContent='Search breweries:'

let inputEl=document.createElement('input')
inputEl.id='search-breweries'
inputEl.name='search-breweries'
inputEl.type='text'

formEl.append(labelEl,inputEl)
headerEl.append(h1El,formEl)
mainEl.append(headerEl)
}

function breweriesByState(){
    fetch(`https://api.openbrewerydb.org/breweries?by_state=${state.USState}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            }
            })
            .then(response => response.json())
            .then(breweriesFromServer => {
                 state.breweries=breweriesFromServer
                 render()
})
}

function renderBreweryListItem(brewery: Brewery, ulEl: HTMLElement){

    let liEl=document.createElement('li')

    let h2El=document.createElement('h2')
    h2El.textContent=brewery.name
  
      let divEl=document.createElement('div')
      divEl.classList.add('type')
      divEl.textContent=brewery.brewery_type
  
      let sectionEl=document.createElement('section')
      sectionEl.classList.add('address')
  
      let h3El=document.createElement('h3')
      h3El.textContent='Address:'
  
      let pEl=document.createElement('p')
      pEl.textContent=brewery.street
  
      let pEl2=document.createElement('p')
      let strongEl=document.createElement('strong')

      strongEl.textContent=`${brewery.city} ${brewery.postal_code}`
      sectionEl.append(h3El,pEl,pEl2)
  
      let sectionEl2=document.createElement('section')
      sectionEl2.classList.add('phone')
  
      let h3El2=document.createElement('h3')
      h3El2.textContent='Phone:'
  
      let pEl3=document.createElement('p')
      pEl3.textContent=brewery.phone ? brewery.phone:'No phone number'
      sectionEl2.append(h3El2,pEl3)
  
      let sectionEl3=document.createElement('section')
      sectionEl3.classList.add('link')
  
      let aEl=document.createElement('a')
      if(brewery.website_url){
            aEl.href=brewery.website_url
            aEl.textContent='Visit Website'
        }
        else{
            aEl.textContent='No website'
        }

      sectionEl3.append(aEl)
      liEl.append(h2El,divEl,sectionEl,sectionEl2,sectionEl3)
      sectionEl.append(h3El,pEl,pEl2)
      sectionEl2.append(h3El2,pEl3)
      pEl2.append(strongEl)
      ulEl.append(liEl)
}
function listenToForm(){
    let formEl=document.querySelector<HTMLFormElement>('#select-state-form')
    formEl?.addEventListener('submit',function(event){
        event.preventDefault()
        let searchState=formEl['select-state'].value
        state.USState=searchState
        console.log(state.USState)
         breweriesByState()
    }
    )
}
listenToForm()

function renderBreweries(){
    if(!mainEl) return
  let articleEl=document.createElement('article')
  let ulEl=document.createElement('ul')
  ulEl.classList.add('breweries-list')
    
    for(let brewery of state.breweries){
      renderBreweryListItem(brewery,ulEl)
    
    }
    articleEl.append(ulEl)
    mainEl.append(articleEl)
  
}



function render(){
    if(!mainEl) return
    mainEl.textContent=''
    renderMainHeader()
    renderBreweries()
}
render()


const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''
messageTwo.textContent = ''
weatherform.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'loading.......'
    messageTwo.textContent = ''
    if(!location){
        messageOne.textContent='Enter the loaction'
        messageTwo.textContent =''
    } else{
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error) {
            messageOne.textContent = data.error
            messageTwo.textContent = ""
        }else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            }
        })  
    })
    }
})
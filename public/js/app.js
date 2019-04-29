const submitBtn = document.querySelector("form")
const input = document.querySelector("input")
const message1 = document.querySelector(".msg-1")
const message2 = document.querySelector(".msg-2")

submitBtn.addEventListener("submit", (e) => {
    e.preventDefault()
    const location = input.value
    
    message1.textContent = "Loading..."
    message2.textContent = ""

    fetch("http://localhost:3000/weather?address=" + location )
      .then(res => res.json())
      .then(data => {
        if(data.error){
            message2.textContent = data.error
        } else {
            message1.textContent = data.forecast
            message2.textContent = data.location
        }
    })
    
})
let mainDiv = document.querySelector('.main-container');
let inputBox = document.querySelector('#search-input');
let sound = document.querySelector('.sound');
let search = document.querySelector('#search-btn');
let resultContainer = document.querySelector('#result-container');
let baseApi = `https://api.dictionaryapi.dev/api/v2/entries/en`;

const findResult = async (userVal) => {
    if (userVal === '') {
        alert('Write something to search!');
    } else {
        try {
            const response = await fetch(`${baseApi}/${userVal}`);
            const data = await response.json();
            let showDiv = document.createElement('div');
            showDiv.innerHTML = '';
            showDiv.classList.add('show-div');
            resultContainer.appendChild(showDiv);
         

            showDiv.innerHTML = `<button onclick = 'playSound()' class = 'audio-btn'> <i class="fa-solid fa-volume-high " style="color: #2d9a6b;"></i> </button>
                                 <h2>${data[0].word}</h2>
                                 <p style="color: gray">${data[0].meanings[0].partOfSpeech} ${data[0].phonetic}</p>
                                 <h3>Meaning: </h3>
                                 <p>${data[0].meanings[0].definitions[0].definition}</p>
                                 <h3>Sentence: </h3>`;
                               
                    
            for (let i = 0; i < data[0].meanings[0].definitions.length; i++) {
                if (data[0].meanings[0].definitions[i].example) {
                    showDiv.innerHTML += `<p>${data[0].meanings[0].definitions[i].example}</p>`;
                }
            }
            for (let i = 0; i < data[0].phonetics.length; i++) {
                if (data[0].phonetics[i].audio) {
                    sound.setAttribute('src', `${data[0].phonetics[i].audio}`);
                }
            }
     
          
        } catch (error) {
            let showDiv = document.createElement('div');
            showDiv.classList.add('show-div');
            showDiv.innerHTML = `<p style = 'margin: 0rem 2rem'>Couldn't Find the Word</p>`;
            resultContainer.appendChild(showDiv);
        }
    }
}

function playSound(){
    sound.play();
}

search.addEventListener('click', (e) => {
    e.preventDefault();
    resultContainer.innerHTML = '';  // Clear previous results
    let userInput = inputBox.value.trim();
    findResult(userInput);
});

let input = document.querySelector('#input-box');
let baseApi = 'https://latest.currency-api.pages.dev/v1/currencies'

let select = document.querySelectorAll("select");
let selectBox = document.querySelector('.select-box');
let exchangeBtn =  document.querySelector('#get-button');
let fromSelect = document.querySelector('#from');
let toSelect = document.querySelector('#to');
let message = document.querySelector('#message')


for(let selects of select ){
      for(let currCode in countryList) {
           let option = document.createElement('option');
           option.innerText = currCode;
           selects.appendChild(option);
           
           if(selects.name === 'from' && currCode === 'USD') {
                  option.selected = 'selected';
             }

             else if(selects.name === 'to'  && currCode === 'INR'){
                        option.selected = 'selected';
             }
      }
   
   
}
    
const changeFlag = (change)=>{

          let selectValue = change.value;
          let countryCode = countryList[selectValue];
          let flag = `https://flagsapi.com/${countryCode}/flat/64.png`
          let FlagImg = change.parentElement.querySelector('img');
          FlagImg.src = flag;
         
}


selectBox.addEventListener('change', (e)=>{
     changeFlag(e.target)
})                                                                                                                                                                                                                                                                                                                                                        



const changeCurrency = async ()=>{
     try {
          let userValue = input.value;
          if (userValue === '' || userValue < 1){
             userValue = 1;
             input.value ='1';   
          }
          let fromVal = fromSelect.value.toLowerCase()
          const fromResponse = await fetch(`${baseApi}/${fromVal}.json`);
          const fromData = await fromResponse.json();
          const fromRate = fromData[fromVal];
          let toVal = toSelect.value.toLowerCase();
          const getResult = fromRate[toVal];
          const convertedAmount = (userValue * getResult).toFixed(2);
          message.innerText = `${userValue} ${fromVal} = ${convertedAmount} ${toVal} `


     } catch (error) {
          message.innerText = `Error while fetching the data-- ${error}`;
     }
     
}

window.addEventListener('load', ()=>{
     changeCurrency();
});

exchangeBtn.addEventListener('click', (e)=>{

     e.preventDefault();
     changeCurrency();

});


const form = document.querySelector("form");
const baseCurrency = document.getElementById("base-currency2");
const targetCurrency = document.getElementById("target-currency2");
const amount = document.getElementById("amount");
const missingBaseCurrency = document.querySelector(".missing-base-currency2");
const missingTargetCurrency = document.querySelector(".missing-target-currency2");
const missingAmount = document.querySelector(".missing-amount");
const convertButton = document.getElementById("convert-button2");
const displayResult = document.querySelector(".display-result");

var currenciesCodes = ["AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL", "BSD",
    "BTN", "BWP","BZD", "CAD", "CDF", "CHF", "CLF", "CLP", "CNH", "CNY", "COP", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP", "ERN", "ETB", "EUR", "FJD", "FKP",
    "GBP", "GEL", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "INR", "IQD", "IRR", "ISK", "JMD", "JOD", "JPY", "KES", "KGS", "KHR",
    "KMF", "KPW", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRU", "MUR", "MVR", "MWK", "MXN",
    "MYR", "MZN", "NAD", "NGN", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SCR", "SDG", "SEK",
    "SGD", "SHP", "SLL", "SOS", "SRD", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TWD", "TZS", "UAH", "UGX", "USD", "UYU", "UZS", "VND", "VUV", "WST",
    "XAF", "XCD", "XDR", "XOF", "XPF", "YER", "ZAR", "ZMW"
];


for(var i=0;i<currenciesCodes.length;i++){
    let option = currenciesCodes[i];
    let optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    baseCurrency.appendChild(optionElement);
}


for(var i=0;i<currenciesCodes.length;i++){
    let option = currenciesCodes[i];
    let optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    targetCurrency.appendChild(optionElement);
}

convertButton.addEventListener("click", function(e){
    e.preventDefault();

    const baseValue = baseCurrency.value;
    const targetValue = targetCurrency.value;
    const amountValue = amount.value

    if(baseValue == "" && targetValue == "" && amountValue == ""){
        missingBaseCurrency.style.display = "inline-block";
        missingTargetCurrency.style.display = "inline-block";
        missingAmount.style.display = "inline-block";
        displayResult.textContent = "";
    }
    else if(baseValue == "" && targetValue == ""){
        missingBaseCurrency.style.display = "inline-block";
        missingTargetCurrency.style.display = "inline-block";
        missingAmount.style.display = "none";
        displayResult.textContent = "";
    }
    else if(baseValue == "" && amountValue == ""){
        missingBaseCurrency.style.display = "inline-block";
        missingAmount.style.display = "inline-block";
        missingTargetCurrency.style.display = "none";
        displayResult.textContent = "";
    }
    else if(targetValue == "" && amountValue == ""){
        missingTargetCurrency.style.display = "inline-block";
        missingAmount.style.display = "inline-block";
        missingBaseCurrency.style.display = "none";
        displayResult.textContent = "";
    }
    else if (baseValue == ""){
        missingBaseCurrency.style.display = "inline-block";
        missingTargetCurrency.style.display = "none";
        missingAmount.style.display = "none";
        displayResult.textContent = "";
    }
    else if (targetValue == ""){;
        missingTargetCurrency.style.display = "inline-block";
        missingBaseCurrency.style.display = "none";
        missingAmount.style.display = "none";
        displayResult.textContent = "";
    }
    else if(amountValue == ""){
        missingAmount.style.display = "inline-block";
        missingBaseCurrency.style.display = "none";
        missingTargetCurrency.style.display = "none";
        displayResult.textContent = "";
    }
    else{
        missingBaseCurrency.style.display = "none";
        missingTargetCurrency.style.display = "none";
        missingAmount.style.display = "none";

        displayResult.textContent = "Loading..."

        fetch(`https://api.exconvert.com/convert?from=${baseValue}&to=${targetValue}&amount=${amountValue}&access_key=140d3467-178aaa4e-e0822cb8-2175936b`)
        .then(response => response.json())
        .then(result => {
            if(result.result){
                displayResult.textContent = "Conversion Result: " + Number(result['result'][`${targetValue}`]).toFixed(2);
            }
            else if (result.error){
                displayResult.textContent = "Error: " + result['error'];
            }
            else{
                displayResult.textContent = "Unexpected response from server.";
            }
        })
        .catch(error => displayResult.textContent = "Error: "+error.message)
    }
});


form.addEventListener("reset", function(){
    missingBaseCurrency.style.display = "none";
    missingTargetCurrency.style.display = "none";
    missingAmount.style.display = "none";

    displayResult.textContent = "";
})
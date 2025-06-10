const form = document.querySelector("form");
const baseCurrency = document.getElementById("base-currency1");
const targetCurrency = document.getElementById("target-currency1");
const missingBaseCurrency = document.querySelector(".missing-base-currency1");
const missingTargetCurrency = document.querySelector(".missing-target-currency1");
const convertButton = document.getElementById("convert-button1");
const displayRate = document.querySelector(".display-rate");

var currenciesCodes = ["AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL", 
    "BSD", "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLF", "CLP", "CNH", "CNY", "COP", "CRC", "CUC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP",
    "ERN", "ETB", "EUR", "FJD", "FKP", "GBP", "GEL", "GGP", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "IMP", "INR", 
    "IQD", "IRR", "ISK", "JEP", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KMF", "KPW", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD",
    "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRU", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK",
    "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLL", "SOS", "SRD", "SSP", "STD", "STN", "SVC",
    "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TWD", "TZS", "UAH", "UGX", "USD", "UYU", "UZS", "VEF", "VES", "VND", "VUV", "WST", "XAF", "XAG",
    "XAU", "XCD", "XDR", "XOF", "XPD", "XPF", "XPT", "YER", "ZAR", "ZMW", "ZWL"
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
    const targetValue = targetCurrency.value

    if(baseValue == "" && targetValue == ""){
        missingBaseCurrency.style.display = "inline-block";
        missingTargetCurrency.style.display = "inline-block";
        displayRate.textContent = "";
    }
    else if(baseValue == ""){
        missingBaseCurrency.style.display = "inline-block";
        missingTargetCurrency.style.display = "none";
        displayRate.textContent = "";
    }
    else if(targetValue == ""){
        missingBaseCurrency.style.display = "none";
        missingTargetCurrency.style.display = "inline-block";
        displayRate.textContent = "";
    }
    else{
        missingBaseCurrency.style.display = "none";
        missingTargetCurrency.style.display = "none";

        displayRate.textContent = "Loading...";

        fetch(`https://api.budjet.in/fiat/${baseValue.toUpperCase()}/${targetValue.toUpperCase()}`)
        .then(response => response.json())
        .then(result => { 
            if(result.conversion_result){
                displayRate.textContent = "Conversion Rate: " + result['conversion_result'];
            }
            else if(result.error){
                displayRate.textContent = "Error: " + result['error'];
            }
            else{
                displayRate.textContent = "Unexpected response from server.";
            }
        })
        .catch(error => displayRate.textContent = "Error: " + error.message)
    }
});


form.addEventListener("reset", function(){
    missingBaseCurrency.style.display = "none";
    missingTargetCurrency.style.display = "none";

    displayRate.textContent = "";
})
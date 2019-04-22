// Load the app with dummy data, rather than an initial fetch from a DB
const initialState = {
    securities: [
        {
            name: "Lorem",
            isin: "US02079K1079",
            country: "Finland",
            prices: [
                {date: new Date(2019, 1, 1), price: 900}, 
                {date: new Date(2019, 1, 2), price: 900}, 
                {date: new Date(2019, 1, 3), price: 800}, 
                {date: new Date(2019, 1, 4), price: 700}, 
                {date: new Date(2019, 1, 5), price: 600}, 
                {date: new Date(2019, 1, 6), price: 600}
            ]
        },
        {
            name: "Ipsum", 
            isin: "US02079K1079",
            country: "Sweden", 
            prices: [
                {date: new Date(2019, 1, 1), price: 400}, 
                {date: new Date(2019, 1, 2), price: 350}, 
                {date: new Date(2019, 1, 3), price: 300}, 
                {date: new Date(2019, 1, 4), price: 450}, 
                {date: new Date(2019, 1, 5), price: 500}, 
                {date: new Date(2019, 1, 6), price: 525}
            ]
        },
        {
            name: "Dolor",
            isin: "US02079K1079",
            country: "Iceland",
            prices: [
                {date: new Date(2019, 1, 1), price: 200}, 
                {date: new Date(2019, 1, 2), price: 300}, 
                {date: new Date(2019, 1, 3), price: 350}, 
                {date: new Date(2019, 1, 4), price: 325}, 
                {date: new Date(2019, 1, 5), price: 400}, 
                {date: new Date(2019, 1, 6), price: 440}
            ]
        }
    ]
}

// Map out all actions for adding/deleting/editing prices and securities 
const reducer = (state = initialState, action) => {
    let securities = state.securities,
        newList;
    switch(action.type) {
        case "ADDSECURITY": 
            securities.push(action.data.security); 
            return {securities} 
        case "DELETESECURITY": 
            newList = []; 
            for (let i = 0; i < securities.length; i++) {
                if (i !== action.data.index) newList.push(securities[i]); 
            }
            return {securities: newList}
        case "EDITSECURITY":
            for (let i = 0; i < securities.length; i++) {
                if (i === action.data.index) {
                    let prices = securities[i].prices; 
                    let {name, isin, country} = action.data.edited; 
                    securities[i] = {name, isin, country, prices}; 
                }
            }
            return {securities} 
        case "ADDPRICE": 
            for (let i = 0; i < securities.length; i++) {
                if (i === action.data.index) securities[i].prices.push(action.data.price);
            }
            return {securities} 
        case "EDITPRICE": 
            for (let i = 0; i < securities.length; i++) {
                if (i === action.data.index) {
                    for (let j = 0; j < securities[i].prices.length; j++) {
                        if (j === action.data.index2) {
                            securities[i].prices[j] = action.data.edited; 
                        }
                    }
                }
            }
            return {securities} 
        case "DELETEPRICE": 
            newList = []; 
            for (let i = 0; i < securities[action.data.index].prices.length; i++) {
                if (i !== action.data.index2) newList.push(securities[action.data.index].prices[i])
            }
            securities[action.data.index].prices = newList; 
            return {securities} 
        default: 
            return state; 
    }
}

export default reducer; 
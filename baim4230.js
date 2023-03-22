const fs = require('fs')

let feedbackLowerBoundDate = Date.parse("1/1/2023")
let feedbackUpperBoundDate = Date.parse("4/30/2023")

let npsLowerBoundDate = Date.parse('1/1/2023')
let npsUpperBoundDate = Date.parse('12/31/2023')

let feedbackCount = 30
let npsCount = 120

let studentIds = [
    
]

let feedback = [
    "The product is excellent",
    "I suggest that you offer the product in green",
    "I suggest that you offer the product in green",
    "I suggest that you offer the product in green",
    "I suggest that you offer the product in green",
    "The product is excellent",
    "Nothing to suggest",
    "I suggest that you offer the product in green",
    "The product is terrible",
    "The product is excellent",
    "I suggest that you offer the product in green",
    "The product is excellent",
    "The product is terrible",
    "I suggest that you offer the product in green",
    "The product is excellent",
    "The product is excellent",
    "I suggest that you offer the product in green",
    "Nothing to suggest",
    "The product is excellent",
    "The product is terrible",
    "The product is terrible",
    "The product is excellent",
    "Nothing to suggest",
    "Nothing to suggest",
    "Nothing to suggest",
    "The product is terrible",
    "Nothing to suggest",
    "Nothing to suggest",
    "The product is excellent",
    "The product is terrible",
]

let feedbackResult = [
    "positive",
    "negative",
    "neutral",
    "suggestion"
]

let states = [
    "CO",
    "AZ",
    "WY",
    "NM"
]

let weekEnds = []

for (let i = new Date(feedbackLowerBoundDate); i <= new Date(feedbackUpperBoundDate); i.setDate(i.getDate() + 1)) {
    if (i.getDay() === 0) {
        weekEnds.push(new Date(i))
    }
}
//set csv headers
let csv = [['Student ID','NPS Date','NPS State','NPS Answer','Feedback Text','Feedback Category','Feedback Week End']]
//loop through all students
let maxCount = Math.max(npsCount, feedbackCount)
let minCount = Math.min(npsCount, feedbackCount)
for (let i = 0; i < studentIds.length; i++) {

    //pick 120 NPS feedback records
    for (let n = 0; n < maxCount; n++) {
        let temp = [
            //student id
            studentIds[i],
            //NPS Date
            new Date(npsLowerBoundDate + Math.random() * (npsUpperBoundDate - npsLowerBoundDate)).toLocaleDateString(),
            //NPS State
            states[Math.floor(Math.random() * states.length)],
            //NPS Answer
            Math.floor(Math.random() * 11),
        ]
        if (n < minCount) {
            temp.push(
                //Feedback Text
                feedback[Math.floor(Math.random() * feedback.length)],
                //Feedback category
                feedbackResult[Math.floor(Math.random() * feedbackResult.length)],
                //Feedback Week End
                weekEnds[Math.floor(Math.random() * weekEnds.length)].toLocaleDateString()
            )
        } else {
            temp.push(
                "",
                "",
                "",
            )
        }
        csv.push(temp)
    }
}

let csvContent = csv.map(e => e.join(",")).join("\n");

// console.log(csvContent)

fs.writeFile("./studentData.csv", csvContent, err => {
    if (err) {
      console.error(err);
    }
    // file written successfully
    console.log('yay')
});
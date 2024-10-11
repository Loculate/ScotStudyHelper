// Function to read passages from a CSV file
function readPassagesFromCSV(filePath) {
    return new Promise((resolve, reject) => {
        fetch(filePath)
            .then(response => response.text())
            .then(data => {
                const passages = [];
                let currentPassage = [];
                const lines = data.split('\n');

                lines.forEach(line => {
                    if (line.includes("[END OF QUESTION PAPER]")) {
                        currentPassage.push(line.replace("[END OF QUESTION PAPER]", "").trim());
                        passages.push(currentPassage.join('\n').trim());
                        currentPassage = [];
                    } else {
                        currentPassage.push(line.trim());
                    }
                });

                resolve(passages);
            })
            .catch(error => reject(error));
    });
}

// Function to set a random passage to the HTML element with ID "readingPaper"
function setRandomPassageToHTML(passages) {
    const randomPassage = passages[Math.floor(Math.random() * passages.length)];
    document.getElementById("readingPaper").innerText = randomPassage;
}

// Example usage
const filePath = '../readingPapers.csv';
readPassagesFromCSV(filePath)
    .then(passages => {
        setRandomPassageToHTML(passages);
    })
    .catch(error => console.error('Error reading CSV file:', error));

class PractisePaper
{
    constructor(questionPaper, answerPaper)
    {
        this.questionPaper = questionPaper;
        this.answerPaper = answerPaper;
    }
}
import * as fs from 'fs';
import * as readline from 'readline';

async function solution() {

    let firstList = [];
    let secondList = [];
    let occurrenceMap = new Map();

    const readable = fs.createReadStream(
        'puzzle-1.txt'
    );

    const rl = readline.createInterface({
        input: readable,
        crlfDelay: Infinity 
    });
    
    for await (const line of rl) {
        const lineContents = line.split('   ');
        firstList.push(lineContents[0]);
        secondList.push(lineContents[1]);

        let key = parseInt(lineContents[1]);
        if (occurrenceMap.has(key)) {
            occurrenceMap.set(key, (occurrenceMap.get(key) + 1))
        } else {
            occurrenceMap.set(key, 1);
        }
    }

    firstList = firstList.sort();
    secondList = secondList.sort();

    let distanceScore = 0;
    let similarityScore = 0;
    for (let i = 0; i < firstList.length; i++) {
        distanceScore += Math.abs(parseInt(firstList[i]) - parseInt(secondList[i]));

        if (occurrenceMap.has(parseInt(firstList[i])))
            similarityScore += (parseInt(firstList[i]) * occurrenceMap.get(parseInt(firstList[i])));
    }

    console.log(`Distance Score: ${distanceScore}`);
    console.log(`Similarity Score: ${similarityScore}`);
}

solution();

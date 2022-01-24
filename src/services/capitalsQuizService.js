export function capitals(region) {
    const capitals = {
        africa: [],
        americas: [],
        asia: [],
        oceania: [],
        europe: [
            { Albania: 'Tirana' },
            { Andorra: 'Andorra la Vella' },
            { Armenia: 'Yerevan' },
            { Belarus: 'Minsk' },
            { Belgium: 'Brussels' },
            { 'Bosnia and Herzegovina': 'Sarajevo' },
            { Bulgaria: 'Sofia' },
            { Croatia: 'Zagreb' },
            { Cyprus: 'Nicosia' },
            { 'Czech Republic': 'Prague' },
            { Denmark: 'Copenhagen' },
            { Estonia: 'Tallinn' },
            { Finland: 'Helsinki' },
            { France: 'Paris' },
            { Germany: 'Berlin' },
            { Greece: 'Athens' },
            { Hungary: 'Budapest' },
            { Iceland: 'Reykjavik' },
            { Ireland: 'Dublin' },
            { Italy: 'Rome' },
            { Kosovo: 'Priština' },
            { Latvia: 'Riga' },
            { Liechtenstein: 'Vaduz' },
            { Lithuania: 'Vilnius' },
            { Luxembourg: 'Luxembourg city' },
            { Malta: 'Valletta' },
            { Moldova: 'Chisinau' },
            { Monaco: 'Monaco' },
            { Montenegro: 'Podgorica' },
            { Netherlands: 'Amsterdam' },
            { 'North Macedonia': 'Skopje' },
            { Norway: 'Oslo' },
            { Poland: 'Warsaw' },
            { Portugal: 'Lisbon' },
            { Romania: 'Bucharest' },
            { Russia: 'Moscow' },
            { 'San Marino': 'San Marino' },
            { Serbia: 'Belgrade' },
            { Slovakia: 'Bratislava' },
            { Slovenia: 'Ljubljana' },
            { Spain: 'Madrid' },
            { Sweden: 'Stockholm' },
            { Switzerland: 'Bern' },
            { Ukraine: 'Kiev' },
            { 'United Kingdom': 'London' },
            { 'Vatican City': 'Vatican City' }
        ]
    }

    if (region === 'world') {
        return Object.values(capitals);
    }
    return capitals[region];
}

export function generateQuestion(capitals) {
    console.log('length ', capitals.length)
    const random = Math.floor(Math.random() * capitals.length);
    const country = Object.keys(capitals[random])[0];
    const answers = generateAnswers(capitals, country);
    return { country, answers };
}

function generateAnswers(capitals, country) {
    let capitalsData = capitals;
    const answers = [];

    let answer = capitals.find(x => Object.keys(x)[0] === country)[country];
    let random = Math.floor(Math.random() * 4);

    capitalsData = capitalsData.filter(x => Object.keys(x)[0] !== country);

    answers[random] = answer;

    for (let i = 0; i < 4; i++) {
        if (!answers[i]) {
            random = Math.floor(Math.random() * capitalsData.length);
            answer = Object.values(capitalsData[random])[0];
            capitalsData = capitalsData.filter(x => Object.values(x)[0] !== answer);
            answers[i] = answer;
        }
    }

    return answers;
}
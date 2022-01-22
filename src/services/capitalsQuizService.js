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
            { Kosovo: 'Pristina' },
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

export function generateQuestion(region, capitals) {
    const country = '';
    const answers = generateAnswers(region, country);

    return {country, answers};
}

function generateAnswers(region, country = '') {
    return [];
}
export function countries(region) {
    const countries = {
        africa: [
            'Angola'
        ],
        americas: [
            'Argenina'
        ],
        asia: [
            'Afghanistan'
        ],
        'australia-oceania': [
            'Australia'
        ],
        europe: [
            'Albania', 'Andorra', 'Austria',
            'Belarus', 'Belgium', 'Bosnia and Herzegovina', 'Bulgaria',
            'Croatia', 'Cyprus', 'Czech Republic',
            'Denmark',
            'Estonia',
            'Finland', 'France',
            'Germany', 'Greece',
            'Hungary',
            'Iceland', 'Ireland', 'Italy',
            'Kosovo',
            'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg',
            'Malta', 'Moldova', 'Monaco', 'Montenegro',
            'Netherlands', 'North Macedonia', 'Norway',
            'Poland', 'Portugal',
            'Romania', 'Russia',
            'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland',
            'Ukraine', 'United Kingdom',
            'Vatican City'
        ]
    };

    if (region === 'world') {
        return Object.values(countries).flat();
    } else {
        return countries[region];
    }
}

export function nextCountry(countries) {
    const random = Math.floor(Math.random() * countries.length);
    return countries[random];
}
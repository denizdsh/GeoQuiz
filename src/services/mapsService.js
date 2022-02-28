export function nextCountry(countries) {
    const random = Math.floor(Math.random() * countries.length);
    return countries[random];
}

export const coordinates = {
    world: {
        center: {
            lat: 30,
            lng: 0
        },
        bounds: {
            north: 180,
            south: -180,
            west: -180,
            east: 180
        }
    },
    africa: {
        center: {
            lat: 3.56197,
            lng: 16.442287
        },
        bounds: {
            north: 38,
            south: -38,
            west: -30,
            east: 66
        }
    },
    americas: {
        center: {
            lat: 6.312251,
            lng: -69.157893
        },
        bounds: {
            north: 69,
            south: -60,
            west: -177,
            east: -6
        }
    },
    asia: {
        center: {
            lat: 40.020012,
            lng: 69.317574
        },
        bounds: {
            north: 80,
            south: -11,
            west: 18,
            east: 1
        }
    },
    'australia-oceania': {
        center: {
            lat: -27.52546,
            lng: 143.418669
        },
        bounds: {
            north: 20,
            south: -60,
            west: 110,
            east: 0
        }
    },
    europe: {
        center: {
            lat: 55,
            lng: 15
        },
        bounds: {
            north: 78,
            south: 14,
            west: -26,
            east: 56
        }
    },
    bulgaria: {
        center: {
            lat: 42.571556,
            lng: 25.110072
        },
        bounds: {
            north: 45,
            south: 39,
            west: 21,
            east: 29
        },
        zoom: window.innerWidth / 300
    }
}

export const smallCountries = {
    africa: [
        ['Seychelles', { lat: -4.568422, lng: 55.438606 }],
        ['Comoros', { lat: -11.418888, lng: 43.401550 }],
        ['Mauritius', { lat: -20.170104, lng: 57.504539 }],
        ['Sao Tome and Principe', { lat: 0.375571, lng: 6.594085 }],
        ['Cabo Verde', { lat: 15.313126, lng: -23.706850 }]
    ],
    americas: [
        ['Bahamas', { lat: 24.201960153261286, lng: -75.37644252977786 }],
        ['Grenada', { lat: 12.012592795843453, lng: -61.772440285848845 }],
        ['Barbados', { lat: 13.149979329832174, lng: -59.43485138715365 }],
        ['Saint Vincent and the Grenadines', { lat: 12.992796890247744, lng: -61.274817955839914 }],
        ['Saint Lucia', { lat: 14.042592146407484, lng: -60.88837652003721 }],
        ['Dominica', { lat: 15.433514347482657, lng: -61.42653687749172 }],
        ['Antigua and Barbuda', { lat: 17.72065040829963, lng: -61.83074374665926 }],
        ['Saint Kitts and Nevis', { lat: 17.37811838524026, lng: -62.832932652425924 }]
    ],
    asia: [
        ['Bahrain', { lat: 26.220286, lng: 50.550944 }],
        ['Brunei', { lat: 4.742270, lng: 114.573702 }],
        ['Kuwait', { lat: 29.679911, lng: 47.890260 }],
        ['Lebanon', { lat: 34.267441, lng: 35.696224 }],
        ['Maldives', { lat: 4.175137, lng: 73.510096 }],
        ['Palestine', { lat: 32.156861, lng: 35.280103 }],
        ['Singapore', { lat: 1.421580, lng: 103.771587 }],
    ],
    'australia-oceania': [
        ['Kiribati', { lat: 1.620191, lng: 172.963551 }],
        ['Marshall Islands', { lat: 7.505734, lng: 168.753138 }],
        ['Micronesia', { lat: 7.411893, lng: 151.667886 }],
        ['Nauru', { lat: -0.504356, lng: 166.935121 }],
        ['Palau', { lat: 7.567067, lng: 134.584305 }],
        ['Samoa', { lat: -13.487090, lng: -172.380071 }],
        ['Tonga', { lat: -19.74589586979888, lng: -175.06947741964746 }],
        ['Tuvalu', { lat: -8.47080730264795, lng: 179.2015912892205 }],
    ],
    europe: [
        ['Andorra', { lat: 42.504648, lng: 1.522089 }],
        ['Liechtenstein', { lat: 47.140227, lng: 9.525021 }],
        ['Malta', { lat: 35.884146, lng: 14.402945 }],
        ['Monaco', { lat: 43.736974, lng: 7.421652 }],
        ['San Marino', { lat: 43.934514, lng: 12.447499 }],
        ['Vatican City', { lat: 41.903094, lng: 12.453412 }]
    ]
}

export const formatToFeatureEvent = (x) => {
    return {
        feature: {
            j: {
                ADMIN: x[0]
            }
        },
        latLng: {
            lat: () => { return x[1].lat },
            lng: () => { return x[1].lng }
        }
    }
}

export function countries(region) {
    const countries = {
        africa: [
            'Algeria', 'Angola',
            'Benin', 'Botswana', 'Burkina Faso', 'Burundi',
            'Cabo Verde', 'Cameroon', 'Central African Republic', 'Chad', 'Comoros', 'Congo DRC', 'Republic of the Congo', 'Côte d\'Ivoire',
            'Djibouti',
            'Egypt', 'Equatorial Guinea', 'Eritrea', 'Eswatini', 'Ethiopia',
            'Gabon', 'Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau',
            'Kenya',
            'Lesotho', 'Liberia', 'Libya',
            'Madagascar', 'Malawi', 'Mali', 'Mauritania', 'Mauritius', 'Morocco', 'Mozambique',
            'Namibia', 'Niger', 'Nigeria',
            'Rwanda',
            'Sao Tome and Principe', 'Senegal', 'Seychelles', 'Sierra Leone', 'Somalia', 'South Africa', 'South Sudan', 'Sudan',
            'Tanzania', 'Togo', 'Tunisia',
            'Uganda',
            'Zambia', 'Zimbabwe'
        ],
        americas: [
            'Antigua and Barbuda', 'Argentina',
            'Bahamas', 'Barbados', 'Belize', 'Bolivia', 'Brazil',
            'Canada', 'Chile', 'Colombia', 'Costa Rica', 'Cuba',
            'Dominica', 'Dominican Republic',
            'Ecuador', 'El Salvador',
            'Grenada', 'Guatemala', 'Guyana',
            'Haiti', 'Honduras',
            'Jamaica',
            'Mexico',
            'Nicaragua',
            'Panama', 'Paraguay', 'Peru',
            'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Suriname',
            'Trinidad and Tobago',
            'USA', 'Uruguay',
            'Venezuela'
        ],
        asia: [
            'Afghanistan', 'Armenia', 'Azerbaijan',
            'Bahrain', 'Bangladesh', 'Bhutan', 'Brunei',
            'Cambodia', 'China',
            'East Timor',
            'Georgia',
            'India', 'Indonesia', 'Iran', 'Iraq', 'Israel',
            'Japan', 'Jordan',
            'Kazakhstan', 'Kuwait', 'Kyrgyzstan',
            'Laos', 'Lebanon',
            'Malaysia', 'Maldives', 'Mongolia', 'Myanmar',
            'Nepal', 'North Korea',
            'Oman',
            'Pakistan', 'Palestine', 'Philippines',
            'Qatar',
            'Russia',
            'Saudi Arabia', 'Singapore', 'South Korea', 'Sri Lanka', 'Syria',
            'Taiwan', 'Tajikistan', 'Thailand', 'Turkey', 'Turkmenistan',
            'United Arab Emirates', 'Uzbekistan',
            'Vietnam',
            'Yemen'
        ],
        'australia-oceania': [
            'Australia',
            'Fiji',
            'Kiribati',
            'Marshall Islands', 'Micronesia',
            'Nauru', 'New Zealand',
            'Palau', 'Papua New Guinea',
            'Samoa', 'Solomon Islands', 'Tonga', 'Tuvalu',
            'Vanuatu'
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
        ],
        bulgaria: [
            'Blagoevgrad',
            'Burgas',
            'Varna',
            'Veliko Tarnovo',
            'Vidin',
            'Vraca',
            'Gabrovo',
            'Dobrich',
            'Kyustendil',
            'Lovech',
            'Montana',
            'Kardzali',
            'Pazardzhik',
            'Pernik',
            'Pleven',
            'Plovdiv',
            'Razgrad',
            'Ruse',
            'Sofia',
            'Sofia Province',
            'Silistra',
            'Sliven',
            'Smolyan',
            'Stara Zagora',
            'Shumen',
            'Targovishte',
            'Haskovo',
            'Yambol',
        ]
    };

    if (region === 'world') {
        return countries.africa.concat(countries.americas).concat(countries.asia).concat(countries['australia-oceania']).concat(countries.europe);
    }
    else {
        return countries[region];
    }
}
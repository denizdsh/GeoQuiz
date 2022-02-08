export function generateQuestion(capitals, allCapitals) {
    console.log('length ', capitals.length)
    const random = Math.floor(Math.random() * capitals.length);
    const capital = capitals[random];
    const country = Object.keys(capital)[0];
    const image = capital.image;
    const answers = generateAnswers(allCapitals, country);
    return { country, answers, image };
}

function generateAnswers(capitals, country) {
    let capitalsData = capitals;
    const answers = [];

    let answer = capitals.find(x => Object.keys(x)[0] === country)[country];
    let random = Math.floor(Math.random() * 4);

    capitalsData = capitalsData.filter(x => Object.values(x)[0] !== answer);

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

export function capitals(region) {
    const capitals = {
        africa: [
            {
                Algeria: 'Algiers',
                image: '/images/africa/Algeria.jpg'
            },
            {
                Angola: 'Luanda',
                image: '/images/africa/Angola.jpg'
            },
            {
                Benin: 'Porto-Novo',
                image: '/images/africa/Benin.jpg'
            },
            {
                Botswana: 'Gaborone',
                image: '/images/africa/Botswana.jpg'
            },
            {
                'Burkina Faso': 'Ouagadougou',
                image: '/images/africa/BurkinaFaso.jpg'
            },
            {
                Burundi: 'Gitega',
                image: '/images/africa/Burundi.jpg'
            },
            {
                'Cabo Verde': 'Praia',
                image: '/images/africa/CaboVerde.jpg'
            },
            {
                Cameroon: 'Yaounde',
                image: '/images/africa/Cameroon.jpg'
            },
            {
                'Central African Republic': 'Bangui',
                image: '/images/africa/CAR.jpg'
            },
            {
                Chad: 'N\'Djamena',
                image: '/images/africa/Chad.jpg'
            },
            {
                Comoros: 'Moroni',
                image: '/images/africa/Comoros.jpg'
            },
            {
                'Congo DRC': 'Kinshasa',
                image: '/images/africa/DRC.jpg'
            },
            {
                'Republic of the Congo': 'Brazzaville',
                image: '/images/africa/ROTC.jpg'
            },
            {
                'Cote d\'Ivoire': 'Yamoussoukro',
                image: '/images/africa/CoteDIvoire.jpg'
            },
            {
                Djibouti: 'Djibouti',
                image: '/images/africa/Djibouti.jpg'
            },
            {
                Egypt: 'Cairo',
                image: '/images/africa/Egypt.jpg'
            },
            {
                'Equatorial Guinea': 'Malabo',
                image: '/images/africa/EquatorialGuinea.jpg'
            },
            {
                Eritrea: 'Asmara',
                image: '/images/africa/Eritrea.jpg'
            },
            {
                Eswatini: 'Mbabane',
                image: '/images/africa/Eswatini.jpg'
            },
            {
                Ethiopia: 'Addis Ababa',
                image: '/images/africa/Ethiopia.jpg'
            },
            {
                Gabon: 'Libreville',
                image: '/images/africa/Gabon.jpg'
            },
            {
                Gambia: 'Banjul',
                image: '/images/africa/Gambia.jpg'
            },
            {
                Ghana: 'Accra',
                image: '/images/africa/Ghana.jpg'
            },
            {
                Guinea: 'Conakry',
                image: '/images/africa/Guinea.jpg'
            },
            {
                'Guinea-Bissau': 'Bissau',
                image: '/images/africa/GuineaBissau.jpg'
            },
            {
                Kenya: 'Nairobi',
                image: '/images/africa/Kenya.jpg'
            },
            {
                Lesotho: 'Maseru',
                image: '/images/africa/Lesotho.jpg'
            },
            {
                Liberia: 'Monrovia',
                image: '/images/africa/Liberia.jpg'
            },
            {
                Libya: 'Tripoli',
                image: '/images/africa/Libya.jpg'
            },
            {
                Madagascar: 'Antananarivo',
                image: '/images/africa/Madagascar.jpg'
            },
            {
                Malawi: 'Lilongwe',
                image: '/images/africa/Malawi.jpg'
            },
            {
                Mali: 'Bamako',
                image: '/images/africa/Mali.jpg'
            },
            {
                Mauritania: 'Nouakchott',
                image: '/images/africa/Mauritania.jpg'
            },
            {
                Mauritius: 'Port Louis',
                image: '/images/africa/Mauritius.jpg'
            },
            {
                Morocco: 'Rabat',
                image: '/images/africa/Morocco.jpg'
            },
            {
                Mozambique: 'Maputo',
                image: '/images/africa/Mozambique.jpg'
            },
            {
                Namibia: 'Windhoek',
                image: '/images/africa/Namibia.jpg'
            },
            {
                Niger: 'Niamey',
                image: '/images/africa/Niger.jpg'
            },
            {
                Nigeria: 'Abuja',
                image: '/images/africa/Nigeria.jpg'
            },
            {
                Rwanda: 'Kigali',
                image: '/images/africa/Rwanda.jpg'
            },
            {
                'Sao Tome and Principe': 'São Tomé',
                image: '/images/africa/SaoTome.jpg'
            },
            {
                Senegal: 'Dakar',
                image: '/images/africa/Senegal.jpg'
            },
            {
                Seychelles: 'Victoria',
                image: '/images/africa/Seychelles.jpg'
            },
            {
                'Sierra Leone': 'Freetown',
                image: '/images/africa/SierraLeone.jpg'
            },
            {
                Somalia: 'Mogadishu',
                image: '/images/africa/Somalia.jpg'
            },
            {
                'South Africa': 'Cape Town',
                image: '/images/africa/SouthAfrica.jpg'
            },
            {
                'South Sudan': 'Juba',
                image: '/images/africa/SouthSudan.jpg'
            },
            {
                Sudan: 'Khartoum',
                image: '/images/africa/Sudan.jpg'
            },
            {
                Tanzania: 'Dodoma',
                image: '/images/africa/Tanzania.jpg'
            },
            {
                Togo: 'Lomé',
                image: '/images/africa/Togo.jpg'
            },
            {
                Tunisia: 'Tunis',
                image: '/images/africa/Tunisia.jpg'
            },
            {
                Uganda: 'Kampala',
                image: '/images/africa/Uganda.jpg'
            },
            {
                Zambia: 'Lusaka',
                image: '/images/africa/Zambia.jpg'
            },
            {
                Zimbabwe: 'Harare',
                image: '/images/africa/Zimbabwe.jpg'
            },
        ],
        americas: [
            {
                'Antigua and Barbuda': 'St. John\'s',
                image: '/images/america/AntiguaBarbuda.jpg'
            },
            {
                Argentina: 'Buenos Aires',
                image: '/images/america/Argentina.jpg'
            },
            {
                Bahamas: 'Nassau',
                image: '/images/america/Bahamas.jpg'
            },
            {
                Barbados: 'Bridgetown',
                image: '/images/america/Barbados.jpg'
            },
            {
                Belize: 'Belmopan',
                image: '/images/america/Belize.jpg'
            },
            {
                Bolivia: 'Sucre',
                image: '/images/america/Bolivia.jpg'
            },
            {
                Brazil: 'Brasilia',
                image: '/images/america/Brazil.jpg'
            },
            {
                Canada: 'Ottawa',
                image: '/images/america/Canada.jpg'
            },
            {
                Chile: 'Santiago',
                image: '/images/america/Chile.jpg'
            },
            {
                Colombia: 'Bogota',
                image: '/images/america/Colombia.jpg'
            },
            {
                'Costa Rica': 'San José',
                image: '/images/america/CostaRica.jpg'
            },
            {
                Cuba: 'Havana',
                image: '/images/america/Cuba.jpg'
            },
            {
                Dominica: 'Roseau',
                image: '/images/america/Dominica.jpg'
            },
            {
                'Dominican Republic': 'Santo Domingo',
                image: '/images/america/DominicanRepublic.jpg'
            },
            {
                Ecuador: 'Quito',
                image: '/images/america/Ecuador.jpg'
            },
            {
                'El Salvador': 'San Salvador',
                image: '/images/america/ElSalvador.jpg'
            },
            {
                Grenada: 'St. George\'s',
                image: '/images/america/Grenada.jpg'
            },
            {
                Guatemala: 'Guatemala City',
                image: '/images/america/Guatemala.jpg'
            },
            {
                Guyana: 'Georgetown',
                image: '/images/america/Guyana.jpg'
            },
            {
                Haiti: 'Port-au-Prince',
                image: '/images/america/Haiti.jpg'
            },
            {
                Honduras: 'Tegucigalpa',
                image: '/images/america/Honduras.jpg'
            },
            {
                Jamaica: 'Kingston',
                image: '/images/america/Jamaica.jpg'
            },
            {
                Mexico: 'Mexico City',
                image: '/images/america/Mexico.jpg'
            },
            {
                Nicaragua: 'Managua',
                image: '/images/america/Nicaragua.jpg'
            },
            {
                Panama: 'Panama City',
                image: '/images/america/Panama.jpg'
            },
            {
                Paraguay: 'Asunción',
                image: '/images/america/Paraguay.jpg'
            },
            {
                Peru: 'Lima',
                image: '/images/america/Peru.jpg'
            },
            {
                'Saint Kitts and Nevis': 'Basseterre',
                image: '/images/america/SaintKittsNevis.jpg'
            },
            {
                'Saint Lucia': 'Castries',
                image: '/images/america/SaintLucia.jpg'
            },
            {
                'Saint Vincent and the Grenadines': 'Kingstown',
                image: '/images/america/SaintVincentGrenadines.jpg'
            },
            {
                Suriname: 'Paramaribo',
                image: '/images/america/Suriname.jpg'
            },
            {
                'Trinidad and Tobago': 'Port of Spain',
                image: '/images/america/TrinidadTobago.jpg'
            },
            {
                'United States': 'Washington D.C.',
                image: '/images/america/US.jpg'
            },
            {
                Uruguay: 'Montevideo',
                image: '/images/america/Uruguay.jpg'
            },
            {
                Venezuela: 'Caracas',
                image: '/images/america/Venezuela.jpg'
            }
        ],
        asia: [
            {
                Afghanistan: 'Kabul',
                image: '/images/asia/Afghanistan.jpg'
            },
            {
                Armenia: 'Yerevan',
                image: '/images/asia/Armenia.jpg'
            },
            {
                Azerbaijan: 'Baku',
                image: '/images/asia/Azerbaijan.jpg'
            },
            {
                Bahrain: 'Manama',
                image: '/images/asia/Bahrain.jpg'
            },
            {
                Bangladesh: 'Dhaka',
                image: '/images/asia/Bangladesh.jpg'
            },
            {
                Bhutan: 'Thimphu',
                image: '/images/asia/Bhutan.jpg'
            },
            {
                Brunei: 'Bandar Seri Begawan',
                image: '/images/asia/Brunei.jpg'
            },
            {
                Cambodia: 'Phnom Penh',
                image: '/images/asia/Cambodia.jpg'
            },
            {
                China: 'Beijing',
                image: '/images/asia/China.jpg'
            },
            {
                'East Timor': 'Dili',
                image: '/images/asia/EastTimor.jpg'
            },
            {
                Georgia: 'Tbilisi',
                image: '/images/asia/Georgia.jpg'
            },
            {
                India: 'New Delhi',
                image: '/images/asia/India.jpg'
            },
            {
                Indonesia: 'Jakarta',
                image: '/images/asia/Indonesia.jpg'
            },
            {
                Iran: 'Tehran',
                image: '/images/asia/Iran.jpg'
            },
            {
                Iraq: 'Baghdad',
                image: '/images/asia/Iraq.jpg'
            },
            {
                Israel: 'Jerusalem',
                image: '/images/asia/Israel.jpg'
            },
            {
                Japan: 'Tokyo',
                image: '/images/asia/Japan.jpg'
            },
            {
                Jordan: 'Amman',
                image: '/images/asia/Jordan.jpg'
            },
            {
                Kazakhstan: 'Nur-Sultan',
                image: '/images/asia/Kazakhstan.jpg'
            },
            {
                Kuwait: 'Kuwait City',
                image: '/images/asia/Kuwait.jpg'
            },
            {
                Kyrgyzstan: 'Bishkek',
                image: '/images/asia/Kyrgyzstan.jpg'
            },
            {
                Laos: 'Vientiane',
                image: '/images/asia/Laos.jpg'
            },
            {
                Lebanon: 'Beirut',
                image: '/images/asia/Lebanon.jpg'
            },
            {
                Malaysia: 'Kuala Lumpur',
                image: '/images/asia/Malaysia.jpg'
            },
            {
                Maldives: 'Male',
                image: '/images/asia/Maldives.jpg'
            },
            {
                Mongolia: 'Ulaanbaatar',
                image: '/images/asia/Mongolia.jpg'
            },
            {
                Myanmar: 'Naypyidaw',
                image: '/images/asia/Myanmar.jpg'
            },
            {
                Nepal: 'Kathmandu',
                image: '/images/asia/Nepal.jpg'
            },
            {
                'North Korea': 'Pyongyang',
                image: '/images/asia/NorthKorea.jpg'
            },
            {
                Oman: 'Muscat',
                image: '/images/asia/Oman.jpg'
            },
            {
                Pakistan: 'Islamabad',
                image: '/images/asia/Pakistan.jpg'
            },
            {
                Palestine: 'Jerusalem',
                image: '/images/asia/Palestine.jpg'
            },
            {
                Philippines: 'Manila',
                image: '/images/asia/Philippines.jpg'
            },
            {
                Qatar: 'Doha',
                image: '/images/asia/Qatar.jpg'
            },
            {
                Russia: 'Moscow',
                image: '/images/asia/Russia.jpg'
            },
            {
                'Saudi Arabia': 'Riyadh',
                image: '/images/asia/SaudiArabia.jpg'
            },
            {
                Singapore: 'Singapore',
                image: '/images/asia/Singapore.jpg'
            },
            {
                'South Korea': 'Seoul',
                image: '/images/asia/SouthKorea.jpg'
            },
            {
                'Sri Lanka': 'Sri Jayawardenepura Kotte',
                image: '/images/asia/SriLanka.jpg'
            },
            {
                Syria: 'Damascus',
                image: '/images/asia/Syria.jpg'
            },
            {
                Taiwan: 'Taipei',
                image: '/images/asia/Taiwan.jpg'
            },
            {
                Tajikistan: 'Dushanbe',
                image: '/images/asia/Tajikistan.jpg'
            },
            {
                Thailand: 'Bangkok',
                image: '/images/asia/Thailand.jpg'
            },
            {
                Turkey: 'Ankara',
                image: '/images/asia/Turkey.jpg'
            },
            {
                Turkmenistan: 'Ashgabat',
                image: '/images/asia/Turkmenistan.jpg'
            },
            {
                'United Arab Emirates': 'Abu Dhabi',
                image: '/images/asia/UAE.jpg'
            },
            {
                Uzbekistan: 'Tashkent',
                image: '/images/asia/Uzbekistan.jpg'
            },
            {
                Vietnam: 'Hanoi',
                image: '/images/asia/Vietnam.jpg'
            },
            {
                Yemen: 'Sana\'a',
                image: '/images/asia/Yemen.jpg'
            }
        ],
        'australia-oceania': [
            {
                Australia: 'Canberra',
                image: '/images/australia-oceania/Australia.jpg'
            },
            {
                Fiji: 'Suva',
                image: '/images/australia-oceania/Fiji.jpg'
            },
            {
                Kiribati: 'Tarawa',
                image: '/images/australia-oceania/Kiribati.jpg'
            },
            {
                'Marshall Islands': 'Majuro',
                image: '/images/australia-oceania/MarshallIslands.jpg'
            },
            {
                Micronesia: 'Palikir',
                image: '/images/australia-oceania/Micronesia.jpg'
            },
            {
                Nauru: 'Yaren',
                image: '/images/australia-oceania/Nauru.jpg'
            },
            {
                'New Zealand': 'Wellington',
                image: '/images/australia-oceania/NewZealand.jpg'
            },
            {
                Palau: 'Melekeok',
                image: '/images/australia-oceania/Palau.jpg'
            },
            {
                'Papua New Guinea': 'Port Moresby',
                image: '/images/australia-oceania/PapuaNewGuinea.jpg'
            },
            {
                Samoa: 'Apia',
                image: '/images/australia-oceania/Samoa.jpg'
            },
            {
                'Solomon Islands': 'Honiara',
                image: '/images/australia-oceania/SolomonIslands.jpg'
            },
            {
                Tonga: 'Nukualofa',
                image: '/images/australia-oceania/Tonga.jpg'
            },
            {
                Tuvalu: 'Funafuti',
                image: '/images/australia-oceania/Tuvalu.jpg'
            },
            {
                Vanuatu: 'Port Vila',
                image: '/images/australia-oceania/Vanuatu.jpg'
            }
        ],
        europe: [
            {
                Albania: 'Tirana',
                image: '/images/europe/Albania.jpg'
            },
            {
                Andorra: 'Andorra la Vella',
                image: '/images/europe/Andorra.jpg'
            },
            {
                Austria: 'Vienna',
                image: '/images/europe/Austria.jpg'
            },
            {
                Belarus: 'Minsk',
                image: '/images/europe/Belarus.jpg'
            },
            {
                Belgium: 'Brussels',
                image: '/images/europe/Belgium.jpg'
            },
            {
                'Bosnia and Herzegovina': 'Sarajevo',
                image: '/images/europe/BosniaHerzegovina.jpg'
            },
            {
                Bulgaria: 'Sofia',
                image: '/images/europe/Bulgaria.jpg'
            },
            {
                Croatia: 'Zagreb',
                image: '/images/europe/Croatia.jpg'
            },
            {
                Cyprus: 'Nicosia',
                image: '/images/europe/Cyprus.jpg'
            },
            {
                'Czech Republic': 'Prague',
                image: '/images/europe/CzechRepublic.jpg'
            },
            {
                Denmark: 'Copenhagen',
                image: '/images/europe/Denmark.jpg'
            },
            {
                Estonia: 'Tallinn',
                image: '/images/europe/Estonia.jpg'
            },
            {
                Finland: 'Helsinki',
                image: '/images/europe/Finland.jpg'
            },
            {
                France: 'Paris',
                image: '/images/europe/France.jpg'
            },
            {
                Germany: 'Berlin',
                image: '/images/europe/Germany.jpg'
            },
            {
                Greece: 'Athens',
                image: '/images/europe/Greece.jpg'
            },
            {
                Hungary: 'Budapest',
                image: '/images/europe/Hungary.jpg'
            },
            {
                Iceland: 'Reykjavik',
                image: '/images/europe/Iceland.jpg'
            },
            {
                Ireland: 'Dublin',
                image: '/images/europe/Ireland.jpg'
            },
            {
                Italy: 'Rome',
                image: '/images/europe/Italy.jpg'
            },
            {
                Kosovo: 'Priština',
                image: '/images/europe/Kosovo.jpg'
            },
            {
                Latvia: 'Riga',
                image: '/images/europe/Latvia.jpg'
            },
            {
                Liechtenstein: 'Vaduz',
                image: '/images/europe/Liechtenstein.jpg'
            },
            {
                Lithuania: 'Vilnius',
                image: '/images/europe/Lithuania.jpg'
            },
            {
                Luxembourg: 'Luxembourg city',
                image: '/images/europe/Luxembourg.jpg'
            },
            {
                Malta: 'Valletta',
                image: '/images/europe/Malta.jpg'
            },
            {
                Moldova: 'Chisinau',
                image: '/images/europe/Moldova.jpg'
            },
            {
                Monaco: 'Monaco',
                image: '/images/europe/Monaco.jpg'
            },
            {
                Montenegro: 'Podgorica',
                image: '/images/europe/Montenegro.jpg'
            },
            {
                Netherlands: 'Amsterdam',
                image: '/images/europe/Netherlands.jpg'
            },
            {
                'North Macedonia': 'Skopje',
                image: '/images/europe/NorthMacedonia.jpg'
            },
            {
                Norway: 'Oslo',
                image: '/images/europe/Norway.jpg'
            },
            {
                Poland: 'Warsaw',
                image: '/images/europe/Poland.jpg'
            },
            {
                Portugal: 'Lisbon',
                image: '/images/europe/Portugal.jpg'
            },
            {
                Romania: 'Bucharest',
                image: '/images/europe/Romania.jpg'
            },
            {
                Russia: 'Moscow',
                image: '/images/europe/Russia.jpg'
            },
            {
                'San Marino': 'San Marino',
                image: '/images/europe/SanMarino.jpg'
            },
            {
                Serbia: 'Belgrade',
                image: '/images/europe/Serbia.jpg'
            },
            {
                Slovakia: 'Bratislava',
                image: '/images/europe/Slovakia.jpg'
            },
            {
                Slovenia: 'Ljubljana',
                image: '/images/europe/Slovenia.jpg'
            },
            {
                Spain: 'Madrid',
                image: '/images/europe/Spain.jpg'
            },
            {
                Sweden: 'Stockholm',
                image: '/images/europe/Sweden.jpg'
            },
            {
                Switzerland: 'Bern',
                image: '/images/europe/Switzerland.jpg'
            },
            {
                Ukraine: 'Kiev',
                image: '/images/europe/Ukraine.jpg'
            },
            {
                'United Kingdom': 'London',
                image: '/images/europe/UK.jpg'
            },
            {
                'Vatican City': 'Vatican City',
                image: '/images/europe/VaticanCity.jpg'
            }
        ]
    }

    if (region === 'world') {
        return Object.values(capitals).flat();
    }
    return capitals[region];
}
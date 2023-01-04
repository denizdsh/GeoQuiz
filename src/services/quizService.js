// feature can be either country or imageURL
export function generateQuestion(data, allData) {
    console.log('length ', data.length)
    const random = Math.floor(Math.random() * data.length);
    const dataObject = data[random];
    const feature = Object.keys(dataObject)[0];
    const image = dataObject.image || Object.keys(dataObject)[0];
    const answers = generateAnswers(allData, feature);
    return { feature, answers, image, country: dataObject.image ? feature : Object.values(dataObject)[0] };
}

function generateAnswers(data, feature) {
    let filteredData = data;
    const answers = [];

    let answer = data.find(x => Object.keys(x)[0] === feature)[feature];
    let random = Math.floor(Math.random() * 4);
    filteredData = filteredData.filter(x => Object.values(x)[0] !== answer);
    answers[random] = answer;

    for (let i = 0; i < 4; i++) {
        if (!answers[i]) {
            random = Math.floor(Math.random() * filteredData.length);
            answer = Object.values(filteredData[random])[0];
            filteredData = filteredData.filter(x => Object.values(x)[0] !== answer);
            answers[i] = answer;
        }
    }

    return answers;
}

const functions = {
    capitals,
    flags
};

export function getData(game, region) {
    return functions[game](region);
}

function capitals(region) {
    const capitals = {
        africa: [
            {
                Algeria: 'Algiers',
                image: '/images/africa/capitals/Algeria.jpg'
            },
            {
                Angola: 'Luanda',
                image: '/images/africa/capitals/Angola.jpg'
            },
            {
                Benin: 'Porto-Novo',
                image: '/images/africa/capitals/Benin.jpg'
            },
            {
                Botswana: 'Gaborone',
                image: '/images/africa/capitals/Botswana.jpg'
            },
            {
                'Burkina Faso': 'Ouagadougou',
                image: '/images/africa/capitals/BurkinaFaso.jpg'
            },
            {
                Burundi: 'Gitega',
                image: '/images/africa/capitals/Burundi.jpg'
            },
            {
                'Cabo Verde': 'Praia',
                image: '/images/africa/capitals/CaboVerde.jpg'
            },
            {
                Cameroon: 'Yaounde',
                image: '/images/africa/capitals/Cameroon.jpg'
            },
            {
                'Central African Republic': 'Bangui',
                image: '/images/africa/capitals/CAR.jpg'
            },
            {
                Chad: 'N\'Djamena',
                image: '/images/africa/capitals/Chad.jpg'
            },
            {
                Comoros: 'Moroni',
                image: '/images/africa/capitals/Comoros.jpg'
            },
            {
                'Congo DRC': 'Kinshasa',
                image: '/images/africa/capitals/DRC.jpg'
            },
            {
                'Republic of the Congo': 'Brazzaville',
                image: '/images/africa/capitals/ROTC.jpg'
            },
            {
                'Côte d\'Ivoire': 'Yamoussoukro',
                image: '/images/africa/capitals/CoteDIvoire.jpg'
            },
            {
                Djibouti: 'Djibouti',
                image: '/images/africa/capitals/Djibouti.jpg'
            },
            {
                Egypt: 'Cairo',
                image: '/images/africa/capitals/Egypt.jpg'
            },
            {
                'Equatorial Guinea': 'Malabo',
                image: '/images/africa/capitals/EquatorialGuinea.jpg'
            },
            {
                Eritrea: 'Asmara',
                image: '/images/africa/capitals/Eritrea.jpg'
            },
            {
                Eswatini: 'Mbabane',
                image: '/images/africa/capitals/Eswatini.jpg'
            },
            {
                Ethiopia: 'Addis Ababa',
                image: '/images/africa/capitals/Ethiopia.jpg'
            },
            {
                Gabon: 'Libreville',
                image: '/images/africa/capitals/Gabon.jpg'
            },
            {
                Gambia: 'Banjul',
                image: '/images/africa/capitals/Gambia.jpg'
            },
            {
                Ghana: 'Accra',
                image: '/images/africa/capitals/Ghana.jpg'
            },
            {
                Guinea: 'Conakry',
                image: '/images/africa/capitals/Guinea.jpg'
            },
            {
                'Guinea-Bissau': 'Bissau',
                image: '/images/africa/capitals/GuineaBissau.jpg'
            },
            {
                Kenya: 'Nairobi',
                image: '/images/africa/capitals/Kenya.jpg'
            },
            {
                Lesotho: 'Maseru',
                image: '/images/africa/capitals/Lesotho.jpg'
            },
            {
                Liberia: 'Monrovia',
                image: '/images/africa/capitals/Liberia.jpg'
            },
            {
                Libya: 'Tripoli',
                image: '/images/africa/capitals/Libya.jpg'
            },
            {
                Madagascar: 'Antananarivo',
                image: '/images/africa/capitals/Madagascar.jpg'
            },
            {
                Malawi: 'Lilongwe',
                image: '/images/africa/capitals/Malawi.jpg'
            },
            {
                Mali: 'Bamako',
                image: '/images/africa/capitals/Mali.jpg'
            },
            {
                Mauritania: 'Nouakchott',
                image: '/images/africa/capitals/Mauritania.jpg'
            },
            {
                Mauritius: 'Port Louis',
                image: '/images/africa/capitals/Mauritius.jpg'
            },
            {
                Morocco: 'Rabat',
                image: '/images/africa/capitals/Morocco.jpg'
            },
            {
                Mozambique: 'Maputo',
                image: '/images/africa/capitals/Mozambique.jpg'
            },
            {
                Namibia: 'Windhoek',
                image: '/images/africa/capitals/Namibia.jpg'
            },
            {
                Niger: 'Niamey',
                image: '/images/africa/capitals/Niger.jpg'
            },
            {
                Nigeria: 'Abuja',
                image: '/images/africa/capitals/Nigeria.jpg'
            },
            {
                Rwanda: 'Kigali',
                image: '/images/africa/capitals/Rwanda.jpg'
            },
            {
                'Sao Tome and Principe': 'São Tomé',
                image: '/images/africa/capitals/SaoTome.jpg'
            },
            {
                Senegal: 'Dakar',
                image: '/images/africa/capitals/Senegal.jpg'
            },
            {
                Seychelles: 'Victoria',
                image: '/images/africa/capitals/Seychelles.jpg'
            },
            {
                'Sierra Leone': 'Freetown',
                image: '/images/africa/capitals/SierraLeone.jpg'
            },
            {
                Somalia: 'Mogadishu',
                image: '/images/africa/capitals/Somalia.jpg'
            },
            {
                'South Africa': 'Cape Town',
                image: '/images/africa/capitals/SouthAfrica.jpg'
            },
            {
                'South Sudan': 'Juba',
                image: '/images/africa/capitals/SouthSudan.jpg'
            },
            {
                Sudan: 'Khartoum',
                image: '/images/africa/capitals/Sudan.jpg'
            },
            {
                Tanzania: 'Dodoma',
                image: '/images/africa/capitals/Tanzania.jpg'
            },
            {
                Togo: 'Lomé',
                image: '/images/africa/capitals/Togo.jpg'
            },
            {
                Tunisia: 'Tunis',
                image: '/images/africa/capitals/Tunisia.jpg'
            },
            {
                Uganda: 'Kampala',
                image: '/images/africa/capitals/Uganda.jpg'
            },
            {
                Zambia: 'Lusaka',
                image: '/images/africa/capitals/Zambia.jpg'
            },
            {
                Zimbabwe: 'Harare',
                image: '/images/africa/capitals/Zimbabwe.jpg'
            },
        ],
        americas: [
            {
                'Antigua and Barbuda': 'St. John\'s',
                image: '/images/americas/capitals/AntiguaBarbuda.jpg'
            },
            {
                Argentina: 'Buenos Aires',
                image: '/images/americas/capitals/Argentina.jpg'
            },
            {
                Bahamas: 'Nassau',
                image: '/images/americas/capitals/Bahamas.jpg'
            },
            {
                Barbados: 'Bridgetown',
                image: '/images/americas/capitals/Barbados.jpg'
            },
            {
                Belize: 'Belmopan',
                image: '/images/americas/capitals/Belize.jpg'
            },
            {
                Bolivia: 'Sucre',
                image: '/images/americas/capitals/Bolivia.jpg'
            },
            {
                Brazil: 'Brasilia',
                image: '/images/americas/capitals/Brazil.jpg'
            },
            {
                Canada: 'Ottawa',
                image: '/images/americas/capitals/Canada.jpg'
            },
            {
                Chile: 'Santiago',
                image: '/images/americas/capitals/Chile.jpg'
            },
            {
                Colombia: 'Bogota',
                image: '/images/americas/capitals/Colombia.jpg'
            },
            {
                'Costa Rica': 'San José',
                image: '/images/americas/capitals/CostaRica.jpg'
            },
            {
                Cuba: 'Havana',
                image: '/images/americas/capitals/Cuba.jpg'
            },
            {
                Dominica: 'Roseau',
                image: '/images/americas/capitals/Dominica.jpg'
            },
            {
                'Dominican Republic': 'Santo Domingo',
                image: '/images/americas/capitals/DominicanRepublic.jpg'
            },
            {
                Ecuador: 'Quito',
                image: '/images/americas/capitals/Ecuador.jpg'
            },
            {
                'El Salvador': 'San Salvador',
                image: '/images/americas/capitals/ElSalvador.jpg'
            },
            {
                Grenada: 'St. George\'s',
                image: '/images/americas/capitals/Grenada.jpg'
            },
            {
                Guatemala: 'Guatemala City',
                image: '/images/americas/capitals/Guatemala.jpg'
            },
            {
                Guyana: 'Georgetown',
                image: '/images/americas/capitals/Guyana.jpg'
            },
            {
                Haiti: 'Port-au-Prince',
                image: '/images/americas/capitals/Haiti.jpg'
            },
            {
                Honduras: 'Tegucigalpa',
                image: '/images/americas/capitals/Honduras.jpg'
            },
            {
                Jamaica: 'Kingston',
                image: '/images/americas/capitals/Jamaica.jpg'
            },
            {
                Mexico: 'Mexico City',
                image: '/images/americas/capitals/Mexico.jpg'
            },
            {
                Nicaragua: 'Managua',
                image: '/images/americas/capitals/Nicaragua.jpg'
            },
            {
                Panama: 'Panama City',
                image: '/images/americas/capitals/Panama.jpg'
            },
            {
                Paraguay: 'Asunción',
                image: '/images/americas/capitals/Paraguay.jpg'
            },
            {
                Peru: 'Lima',
                image: '/images/americas/capitals/Peru.jpg'
            },
            {
                'Saint Kitts and Nevis': 'Basseterre',
                image: '/images/americas/capitals/SaintKittsNevis.jpg'
            },
            {
                'Saint Lucia': 'Castries',
                image: '/images/americas/capitals/SaintLucia.jpg'
            },
            {
                'Saint Vincent and the Grenadines': 'Kingstown',
                image: '/images/americas/capitals/SaintVincentGrenadines.jpg'
            },
            {
                Suriname: 'Paramaribo',
                image: '/images/americas/capitals/Suriname.jpg'
            },
            {
                'Trinidad and Tobago': 'Port of Spain',
                image: '/images/americas/capitals/TrinidadTobago.jpg'
            },
            {
                'USA': 'Washington D.C.',
                image: '/images/americas/capitals/USA.jpg'
            },
            {
                Uruguay: 'Montevideo',
                image: '/images/americas/capitals/Uruguay.jpg'
            },
            {
                Venezuela: 'Caracas',
                image: '/images/americas/capitals/Venezuela.jpg'
            }
        ],
        asia: [
            {
                Afghanistan: 'Kabul',
                image: '/images/asia/capitals/Afghanistan.jpg'
            },
            {
                Armenia: 'Yerevan',
                image: '/images/asia/capitals/Armenia.jpg'
            },
            {
                Azerbaijan: 'Baku',
                image: '/images/asia/capitals/Azerbaijan.jpg'
            },
            {
                Bahrain: 'Manama',
                image: '/images/asia/capitals/Bahrain.jpg'
            },
            {
                Bangladesh: 'Dhaka',
                image: '/images/asia/capitals/Bangladesh.jpg'
            },
            {
                Bhutan: 'Thimphu',
                image: '/images/asia/capitals/Bhutan.jpg'
            },
            {
                Brunei: 'Bandar Seri Begawan',
                image: '/images/asia/capitals/Brunei.jpg'
            },
            {
                Cambodia: 'Phnom Penh',
                image: '/images/asia/capitals/Cambodia.jpg'
            },
            {
                China: 'Beijing',
                image: '/images/asia/capitals/China.jpg'
            },
            {
                'East Timor': 'Dili',
                image: '/images/asia/capitals/EastTimor.jpg'
            },
            {
                Georgia: 'Tbilisi',
                image: '/images/asia/capitals/Georgia.jpg'
            },
            {
                India: 'New Delhi',
                image: '/images/asia/capitals/India.jpg'
            },
            {
                Indonesia: 'Jakarta',
                image: '/images/asia/capitals/Indonesia.jpg'
            },
            {
                Iran: 'Tehran',
                image: '/images/asia/capitals/Iran.jpg'
            },
            {
                Iraq: 'Baghdad',
                image: '/images/asia/capitals/Iraq.jpg'
            },
            {
                Israel: 'Jerusalem',
                image: '/images/asia/capitals/Israel.jpg'
            },
            {
                Japan: 'Tokyo',
                image: '/images/asia/capitals/Japan.jpg'
            },
            {
                Jordan: 'Amman',
                image: '/images/asia/capitals/Jordan.jpg'
            },
            {
                Kazakhstan: 'Nur-Sultan',
                image: '/images/asia/capitals/Kazakhstan.jpg'
            },
            {
                Kuwait: 'Kuwait City',
                image: '/images/asia/capitals/Kuwait.jpg'
            },
            {
                Kyrgyzstan: 'Bishkek',
                image: '/images/asia/capitals/Kyrgyzstan.jpg'
            },
            {
                Laos: 'Vientiane',
                image: '/images/asia/capitals/Laos.jpg'
            },
            {
                Lebanon: 'Beirut',
                image: '/images/asia/capitals/Lebanon.jpg'
            },
            {
                Malaysia: 'Kuala Lumpur',
                image: '/images/asia/capitals/Malaysia.jpg'
            },
            {
                Maldives: 'Male',
                image: '/images/asia/capitals/Maldives.jpg'
            },
            {
                Mongolia: 'Ulaanbaatar',
                image: '/images/asia/capitals/Mongolia.jpg'
            },
            {
                Myanmar: 'Naypyidaw',
                image: '/images/asia/capitals/Myanmar.jpg'
            },
            {
                Nepal: 'Kathmandu',
                image: '/images/asia/capitals/Nepal.jpg'
            },
            {
                'North Korea': 'Pyongyang',
                image: '/images/asia/capitals/NorthKorea.jpg'
            },
            {
                Oman: 'Muscat',
                image: '/images/asia/capitals/Oman.jpg'
            },
            {
                Pakistan: 'Islamabad',
                image: '/images/asia/capitals/Pakistan.jpg'
            },
            {
                Palestine: 'Jerusalem',
                image: '/images/asia/capitals/Palestine.jpg'
            },
            {
                Philippines: 'Manila',
                image: '/images/asia/capitals/Philippines.jpg'
            },
            {
                Qatar: 'Doha',
                image: '/images/asia/capitals/Qatar.jpg'
            },
            {
                Russia: 'Moscow',
                image: '/images/asia/capitals/Russia.jpg'
            },
            {
                'Saudi Arabia': 'Riyadh',
                image: '/images/asia/capitals/SaudiArabia.jpg'
            },
            {
                Singapore: 'Singapore',
                image: '/images/asia/capitals/Singapore.jpg'
            },
            {
                'South Korea': 'Seoul',
                image: '/images/asia/capitals/SouthKorea.jpg'
            },
            {
                'Sri Lanka': 'Sri Jayawardenepura Kotte',
                image: '/images/asia/capitals/SriLanka.jpg'
            },
            {
                Syria: 'Damascus',
                image: '/images/asia/capitals/Syria.jpg'
            },
            {
                Taiwan: 'Taipei',
                image: '/images/asia/capitals/Taiwan.jpg'
            },
            {
                Tajikistan: 'Dushanbe',
                image: '/images/asia/capitals/Tajikistan.jpg'
            },
            {
                Thailand: 'Bangkok',
                image: '/images/asia/capitals/Thailand.jpg'
            },
            {
                Turkey: 'Ankara',
                image: '/images/asia/capitals/Turkey.jpg'
            },
            {
                Turkmenistan: 'Ashgabat',
                image: '/images/asia/capitals/Turkmenistan.jpg'
            },
            {
                'United Arab Emirates': 'Abu Dhabi',
                image: '/images/asia/capitals/UAE.jpg'
            },
            {
                Uzbekistan: 'Tashkent',
                image: '/images/asia/capitals/Uzbekistan.jpg'
            },
            {
                Vietnam: 'Hanoi',
                image: '/images/asia/capitals/Vietnam.jpg'
            },
            {
                Yemen: 'Sana\'a',
                image: '/images/asia/capitals/Yemen.jpg'
            }
        ],
        'australia-oceania': [
            {
                Australia: 'Canberra',
                image: '/images/australia-oceania/capitals/Australia.jpg'
            },
            {
                Fiji: 'Suva',
                image: '/images/australia-oceania/capitals/Fiji.jpg'
            },
            {
                Kiribati: 'Tarawa',
                image: '/images/australia-oceania/capitals/Kiribati.jpg'
            },
            {
                'Marshall Islands': 'Majuro',
                image: '/images/australia-oceania/capitals/MarshallIslands.jpg'
            },
            {
                Micronesia: 'Palikir',
                image: '/images/australia-oceania/capitals/Micronesia.jpg'
            },
            {
                Nauru: 'Yaren',
                image: '/images/australia-oceania/capitals/Nauru.jpg'
            },
            {
                'New Zealand': 'Wellington',
                image: '/images/australia-oceania/capitals/NewZealand.jpg'
            },
            {
                Palau: 'Melekeok',
                image: '/images/australia-oceania/capitals/Palau.jpg'
            },
            {
                'Papua New Guinea': 'Port Moresby',
                image: '/images/australia-oceania/capitals/PapuaNewGuinea.jpg'
            },
            {
                Samoa: 'Apia',
                image: '/images/australia-oceania/capitals/Samoa.jpg'
            },
            {
                'Solomon Islands': 'Honiara',
                image: '/images/australia-oceania/capitals/SolomonIslands.jpg'
            },
            {
                Tonga: 'Nukualofa',
                image: '/images/australia-oceania/capitals/Tonga.jpg'
            },
            {
                Tuvalu: 'Funafuti',
                image: '/images/australia-oceania/capitals/Tuvalu.jpg'
            },
            {
                Vanuatu: 'Port Vila',
                image: '/images/australia-oceania/capitals/Vanuatu.jpg'
            }
        ],
        europe: [
            {
                Albania: 'Tirana',
                image: '/images/europe/capitals/Albania.jpg'
            },
            {
                Andorra: 'Andorra la Vella',
                image: '/images/europe/capitals/Andorra.jpg'
            },
            {
                Austria: 'Vienna',
                image: '/images/europe/capitals/Austria.jpg'
            },
            {
                Belarus: 'Minsk',
                image: '/images/europe/capitals/Belarus.jpg'
            },
            {
                Belgium: 'Brussels',
                image: '/images/europe/capitals/Belgium.jpg'
            },
            {
                'Bosnia and Herzegovina': 'Sarajevo',
                image: '/images/europe/capitals/BosniaHerzegovina.jpg'
            },
            {
                Bulgaria: 'Sofia',
                image: '/images/europe/capitals/Bulgaria.jpg'
            },
            {
                Croatia: 'Zagreb',
                image: '/images/europe/capitals/Croatia.jpg'
            },
            {
                Cyprus: 'Nicosia',
                image: '/images/europe/capitals/Cyprus.jpg'
            },
            {
                'Czech Republic': 'Prague',
                image: '/images/europe/capitals/CzechRepublic.jpg'
            },
            {
                Denmark: 'Copenhagen',
                image: '/images/europe/capitals/Denmark.jpg'
            },
            {
                Estonia: 'Tallinn',
                image: '/images/europe/capitals/Estonia.jpg'
            },
            {
                Finland: 'Helsinki',
                image: '/images/europe/capitals/Finland.jpg'
            },
            {
                France: 'Paris',
                image: '/images/europe/capitals/France.jpg'
            },
            {
                Germany: 'Berlin',
                image: '/images/europe/capitals/Germany.jpg'
            },
            {
                Greece: 'Athens',
                image: '/images/europe/capitals/Greece.jpg'
            },
            {
                Hungary: 'Budapest',
                image: '/images/europe/capitals/Hungary.jpg'
            },
            {
                Iceland: 'Reykjavik',
                image: '/images/europe/capitals/Iceland.jpg'
            },
            {
                Ireland: 'Dublin',
                image: '/images/europe/capitals/Ireland.jpg'
            },
            {
                Italy: 'Rome',
                image: '/images/europe/capitals/Italy.jpg'
            },
            {
                Kosovo: 'Priština',
                image: '/images/europe/capitals/Kosovo.jpg'
            },
            {
                Latvia: 'Riga',
                image: '/images/europe/capitals/Latvia.jpg'
            },
            {
                Liechtenstein: 'Vaduz',
                image: '/images/europe/capitals/Liechtenstein.jpg'
            },
            {
                Lithuania: 'Vilnius',
                image: '/images/europe/capitals/Lithuania.jpg'
            },
            {
                Luxembourg: 'Luxembourg city',
                image: '/images/europe/capitals/Luxembourg.jpg'
            },
            {
                Malta: 'Valletta',
                image: '/images/europe/capitals/Malta.jpg'
            },
            {
                Moldova: 'Chisinau',
                image: '/images/europe/capitals/Moldova.jpg'
            },
            {
                Monaco: 'Monaco',
                image: '/images/europe/capitals/Monaco.jpg'
            },
            {
                Montenegro: 'Podgorica',
                image: '/images/europe/capitals/Montenegro.jpg'
            },
            {
                Netherlands: 'Amsterdam',
                image: '/images/europe/capitals/Netherlands.jpg'
            },
            {
                'North Macedonia': 'Skopje',
                image: '/images/europe/capitals/NorthMacedonia.jpg'
            },
            {
                Norway: 'Oslo',
                image: '/images/europe/capitals/Norway.jpg'
            },
            {
                Poland: 'Warsaw',
                image: '/images/europe/capitals/Poland.jpg'
            },
            {
                Portugal: 'Lisbon',
                image: '/images/europe/capitals/Portugal.jpg'
            },
            {
                Romania: 'Bucharest',
                image: '/images/europe/capitals/Romania.jpg'
            },
            {
                Russia: 'Moscow',
                image: '/images/europe/capitals/Russia.jpg'
            },
            {
                'San Marino': 'San Marino',
                image: '/images/europe/capitals/SanMarino.jpg'
            },
            {
                Serbia: 'Belgrade',
                image: '/images/europe/capitals/Serbia.jpg'
            },
            {
                Slovakia: 'Bratislava',
                image: '/images/europe/capitals/Slovakia.jpg'
            },
            {
                Slovenia: 'Ljubljana',
                image: '/images/europe/capitals/Slovenia.jpg'
            },
            {
                Spain: 'Madrid',
                image: '/images/europe/capitals/Spain.jpg'
            },
            {
                Sweden: 'Stockholm',
                image: '/images/europe/capitals/Sweden.jpg'
            },
            {
                Switzerland: 'Bern',
                image: '/images/europe/capitals/Switzerland.jpg'
            },
            {
                Ukraine: 'Kiev',
                image: '/images/europe/capitals/Ukraine.jpg'
            },
            {
                'United Kingdom': 'London',
                image: '/images/europe/capitals/UK.jpg'
            },
            {
                'Vatican City': 'Vatican City',
                image: '/images/europe/capitals/VaticanCity.jpg'
            }
        ]
    }

    if (region === 'world') {
        return Object.values(capitals).flat();
    }
    return capitals[region];
}

function flags(region) {
    const flags = {
        africa: [
            {
                '/images/africa/flags/Algeria.svg': 'Algeria'
            },
            {
                '/images/africa/flags/Angola.svg': 'Angola'
            },
            {
                '/images/africa/flags/Benin.svg': 'Benin'
            },
            {
                '/images/africa/flags/Botswana.svg': 'Botswana'
            },
            {
                '/images/africa/flags/BurkinaFaso.svg': 'Burkina Faso'
            },
            {
                '/images/africa/flags/Burundi.svg': 'Burundi'
            },
            {
                '/images/africa/flags/CaboVerde.svg': 'Cabo Verde'
            },
            {
                '/images/africa/flags/Cameroon.svg': 'Cameroon'
            },
            {
                '/images/africa/flags/CAR.svg': 'Central African Republic'
            },
            {
                '/images/africa/flags/Chad.svg': 'Chad'
            },
            {
                '/images/africa/flags/Comoros.svg': 'Comoros'
            },
            {
                '/images/africa/flags/DRC.svg': 'Congo DRC'
            },
            {
                '/images/africa/flags/ROTC.svg': 'Republic of the Congo'
            },
            {
                '/images/africa/flags/CoteDIvoire.svg': 'Côte d\'Ivoire'
            },
            {
                '/images/africa/flags/Djibouti.svg': 'Djibouti'
            },
            {
                '/images/africa/flags/Egypt.svg': 'Egypt'
            },
            {
                '/images/africa/flags/EquatorialGuinea.svg': 'Equatorial Guinea'
            },
            {
                '/images/africa/flags/Eritrea.svg': 'Eritrea'
            },
            {
                '/images/africa/flags/Eswatini.svg': 'Eswatini'
            },
            {
                '/images/africa/flags/Ethiopia.svg': 'Ethiopia'
            },
            {
                '/images/africa/flags/Gabon.svg': 'Gabon'
            },
            {
                '/images/africa/flags/Gambia.svg': 'Gambia'
            },
            {
                '/images/africa/flags/Ghana.svg': 'Ghana'
            },
            {
                '/images/africa/flags/Guinea.svg': 'Guinea'
            },
            {
                '/images/africa/flags/GuineaBissau.svg': 'Guinea-Bissau'
            },
            {
                '/images/africa/flags/Kenya.svg': 'Kenya'
            },
            {
                '/images/africa/flags/Lesotho.svg': 'Lesotho'
            },
            {
                '/images/africa/flags/Liberia.svg': 'Liberia'
            },
            {
                '/images/africa/flags/Libya.svg': 'Libya'
            },
            {
                '/images/africa/flags/Madagascar.svg': 'Madagascar'
            },
            {
                '/images/africa/flags/Malawi.svg': 'Malawi'
            },
            {
                '/images/africa/flags/Mali.svg': 'Mali'
            },
            {
                '/images/africa/flags/Mauritania.svg': 'Mauritania'
            },
            {
                '/images/africa/flags/Mauritius.svg': 'Mauritius'
            },
            {
                '/images/africa/flags/Morocco.svg': 'Morocco'
            },
            {
                '/images/africa/flags/Mozambique.svg': 'Mozambique'
            },
            {
                '/images/africa/flags/Namibia.svg': 'Namibia'
            },
            {
                '/images/africa/flags/Niger.svg': 'Niger'
            },
            {
                '/images/africa/flags/Nigeria.svg': 'Nigeria'
            },
            {
                '/images/africa/flags/Rwanda.svg': 'Rwanda'
            },
            {
                '/images/africa/flags/SaoTome.svg': 'Sao Tome and Principe'
            },
            {
                '/images/africa/flags/Senegal.svg': 'Senegal'
            },
            {
                '/images/africa/flags/Seychelles.svg': 'Seychelles'
            },
            {
                '/images/africa/flags/SierraLeone.svg': 'Sierra Leone'
            },
            {
                '/images/africa/flags/Somalia.svg': 'Somalia'
            },
            {
                '/images/africa/flags/SouthAfrica.svg': 'South Africa'
            },
            {
                '/images/africa/flags/SouthSudan.svg': 'South Sudan'
            },
            {
                '/images/africa/flags/Sudan.svg': 'Sudan'
            },
            {
                '/images/africa/flags/Tanzania.svg': 'Tanzania'
            },
            {
                '/images/africa/flags/Togo.svg': 'Togo'
            },
            {
                '/images/africa/flags/Tunisia.svg': 'Tunisia'
            },
            {
                '/images/africa/flags/Uganda.svg': 'Uganda'
            },
            {
                '/images/africa/flags/Zambia.svg': 'Zambia'
            },
            {
                '/images/africa/flags/Zimbabwe.svg': 'Zimbabwe'
            },
        ],
        americas: [
            {
                '/images/americas/flags/AntiguaBarbuda.svg': 'Antigua and Barbuda'
            },
            {
                '/images/americas/flags/Argentina.svg': 'Argentina'
            },
            {
                '/images/americas/flags/Bahamas.svg': 'Bahamas'
            },
            {
                '/images/americas/flags/Barbados.svg': 'Barbados'
            },
            {
                '/images/americas/flags/Belize.svg': 'Belize'
            },
            {
                '/images/americas/flags/Bolivia.svg': 'Bolivia'
            },
            {
                '/images/americas/flags/Brazil.svg': 'Brazil'
            },
            {
                '/images/americas/flags/Canada.svg': 'Canada'
            },
            {
                '/images/americas/flags/Chile.svg': 'Chile'
            },
            {
                '/images/americas/flags/Colombia.svg': 'Colombia'
            },
            {
                '/images/americas/flags/CostaRica.svg': 'Costa Rica'
            },
            {
                '/images/americas/flags/Cuba.svg': 'Cuba'
            },
            {
                '/images/americas/flags/Dominica.svg': 'Dominica'
            },
            {
                '/images/americas/flags/DominicanRepublic.svg': 'Dominican Republic'
            },
            {
                '/images/americas/flags/Ecuador.svg': 'Ecuador'
            },
            {
                '/images/americas/flags/ElSalvador.svg': 'El Salvador'
            },
            {
                '/images/americas/flags/Grenada.svg': 'Grenada'
            },
            {
                '/images/americas/flags/Guatemala.svg': 'Guatemala'
            },
            {
                '/images/americas/flags/Guyana.svg': 'Guyana'
            },
            {
                '/images/americas/flags/Haiti.svg': 'Haiti'
            },
            {
                '/images/americas/flags/Honduras.svg': 'Honduras'
            },
            {
                '/images/americas/flags/Jamaica.svg': 'Jamaica'
            },
            {
                '/images/americas/flags/Mexico.svg': 'Mexico'
            },
            {
                '/images/americas/flags/Nicaragua.svg': 'Nicaragua'
            },
            {
                '/images/americas/flags/Panama.svg': 'Panama'
            },
            {
                '/images/americas/flags/Paraguay.svg': 'Paraguay'
            },
            {
                '/images/americas/flags/Peru.svg': 'Peru'
            },
            {
                '/images/americas/flags/SaintKittsNevis.svg': 'Saint Kitts and Nevis'
            },
            {
                '/images/americas/flags/SaintLucia.svg': 'Saint Lucia'
            },
            {
                '/images/americas/flags/SaintVincentGrenadines.svg': 'Saint Vincent and the Grenadines'
            },
            {
                '/images/americas/flags/Suriname.svg': 'Suriname'
            },
            {
                '/images/americas/flags/TrinidadTobago.svg': 'Trinidad and Tobago'
            },
            {
                '/images/americas/flags/USA.svg': 'United States'
            },
            {
                '/images/americas/flags/Uruguay.svg': 'Uruguay'
            },
            {
                '/images/americas/flags/Venezuela.svg': 'Venezuela'
            }
        ],
        asia: [
            {
                '/images/asia/flags/Afghanistan.svg': 'Afghanistan'
            },
            {
                '/images/asia/flags/Armenia.svg': 'Armenia'
            },
            {
                '/images/asia/flags/Azerbaijan.svg': 'Azerbaijan'
            },
            {
                '/images/asia/flags/Bahrain.svg': 'Bahrain'
            },
            {
                '/images/asia/flags/Bangladesh.svg': 'Bangladesh'
            },
            {
                '/images/asia/flags/Bhutan.svg': 'Bhutan'
            },
            {
                '/images/asia/flags/Brunei.svg': 'Brunei'
            },
            {
                '/images/asia/flags/Cambodia.svg': 'Cambodia'
            },
            {
                '/images/asia/flags/China.svg': 'China'
            },
            {
                '/images/asia/flags/EastTimor.svg': 'East Timor'
            },
            {
                '/images/asia/flags/Georgia.svg': 'Georgia'
            },
            {
                '/images/asia/flags/India.svg': 'India'
            },
            {
                '/images/asia/flags/Indonesia.svg': 'Indonesia'
            },
            {
                '/images/asia/flags/Iran.svg': 'Iran'
            },
            {
                '/images/asia/flags/Iraq.svg': 'Iraq'
            },
            {
                '/images/asia/flags/Israel.svg': 'Israel'
            },
            {
                '/images/asia/flags/Japan.svg': 'Japan'
            },
            {
                '/images/asia/flags/Jordan.svg': 'Jordan'
            },
            {
                '/images/asia/flags/Kazakhstan.svg': 'Kazakhstan'
            },
            {
                '/images/asia/flags/Kuwait.svg': 'Kuwait'
            },
            {
                '/images/asia/flags/Kyrgyzstan.svg': 'Kyrgyzstan'
            },
            {
                '/images/asia/flags/Laos.svg': 'Laos'
            },
            {
                '/images/asia/flags/Lebanon.svg': 'Lebanon'
            },
            {
                '/images/asia/flags/Malaysia.svg': 'Malaysia'
            },
            {
                '/images/asia/flags/Maldives.svg': 'Maldives'
            },
            {
                '/images/asia/flags/Mongolia.svg': 'Mongolia'
            },
            {
                '/images/asia/flags/Myanmar.svg': 'Myanmar'
            },
            {
                '/images/asia/flags/Nepal.svg': 'Nepal'
            },
            {
                '/images/asia/flags/NorthKorea.svg': 'North Korea'
            },
            {
                '/images/asia/flags/Oman.svg': 'Oman'
            },
            {
                '/images/asia/flags/Pakistan.svg': 'Pakistan'
            },
            {
                '/images/asia/flags/Palestine.svg': 'Palestine'
            },
            {
                '/images/asia/flags/Philippines.svg': 'Philippines'
            },
            {
                '/images/asia/flags/Qatar.svg': 'Qatar'
            },
            {
                '/images/asia/flags/Russia.svg': 'Russia'
            },
            {
                '/images/asia/flags/SaudiArabia.svg': 'Saudi Arabia'
            },
            {
                '/images/asia/flags/Singapore.svg': 'Singapore'
            },
            {
                '/images/asia/flags/SouthKorea.svg': 'South Korea'
            },
            {
                '/images/asia/flags/SriLanka.svg': 'Sri Lanka'
            },
            {
                '/images/asia/flags/Syria.svg': 'Syria'
            },
            {
                '/images/asia/flags/Taiwan.svg': 'Taiwan'
            },
            {
                '/images/asia/flags/Tajikistan.svg': 'Tajikistan'
            },
            {
                '/images/asia/flags/Thailand.svg': 'Thailand'
            },
            {
                '/images/asia/flags/Turkey.svg': 'Turkey'
            },
            {
                '/images/asia/flags/Turkmenistan.svg': 'Turkmenistan'
            },
            {
                '/images/asia/flags/UAE.svg': 'United Arab Emirates'
            },
            {
                '/images/asia/flags/Uzbekistan.svg': 'Uzbekistan'
            },
            {
                '/images/asia/flags/Vietnam.svg': 'Vietnam'
            },
            {
                '/images/asia/flags/Yemen.svg': 'Yemen'
            }
        ],
        'australia-oceania': [
            {
                '/images/australia-oceania/flags/Australia.svg': 'Australia'
            },
            {
                '/images/australia-oceania/flags/Fiji.svg': 'Fiji'
            },
            {
                '/images/australia-oceania/flags/Kiribati.svg': 'Kiribati'
            },
            {
                '/images/australia-oceania/flags/MarshallIslands.svg': 'Marshall Islands'
            },
            {
                '/images/australia-oceania/flags/Micronesia.svg': 'Micronesia'
            },
            {
                '/images/australia-oceania/flags/Nauru.svg': 'Nauru'
            },
            {
                '/images/australia-oceania/flags/NewZealand.svg': 'New Zealand'
            },
            {
                '/images/australia-oceania/flags/Palau.svg': 'Palau'
            },
            {
                '/images/australia-oceania/flags/PapuaNewGuinea.svg': 'Papua New Guinea'
            },
            {
                '/images/australia-oceania/flags/Samoa.svg': 'Samoa'
            },
            {
                '/images/australia-oceania/flags/SolomonIslands.svg': 'Solomon Islands'
            },
            {
                '/images/australia-oceania/flags/Tonga.svg': 'Tonga'
            },
            {
                '/images/australia-oceania/flags/Tuvalu.svg': 'Tuvalu'
            },
            {
                '/images/australia-oceania/flags/Vanuatu.svg': 'Vanuatu'
            }
        ],
        europe: [
            {
                '/images/europe/flags/Albania.svg': 'Albania'
            },
            {
                '/images/europe/flags/Andorra.svg': 'Andorra'
            },
            {
                '/images/europe/flags/Austria.svg': 'Austria'
            },
            {
                '/images/europe/flags/Belarus.svg': 'Belarus'
            },
            {
                '/images/europe/flags/Belgium.svg': 'Belgium'
            },
            {
                '/images/europe/flags/BosniaHerzegovina.svg': 'Bosnia and Herzegovina'
            },
            {
                '/images/europe/flags/Bulgaria.svg': 'Bulgaria'
            },
            {
                '/images/europe/flags/Croatia.svg': 'Croatia'
            },
            {
                '/images/europe/flags/Cyprus.svg': 'Cyprus'
            },
            {
                '/images/europe/flags/CzechRepublic.svg': 'Czech Republic'
            },
            {
                '/images/europe/flags/Denmark.svg': 'Denmark'
            },
            {
                '/images/europe/flags/Estonia.svg': 'Estonia'
            },
            {
                '/images/europe/flags/Finland.svg': 'Finland'
            },
            {
                '/images/europe/flags/France.svg': 'France'
            },
            {
                '/images/europe/flags/Germany.svg': 'Germany'
            },
            {
                '/images/europe/flags/Greece.svg': 'Greece'
            },
            {
                '/images/europe/flags/Hungary.svg': 'Hungary'
            },
            {
                '/images/europe/flags/Iceland.svg': 'Iceland'
            },
            {
                '/images/europe/flags/Ireland.svg': 'Ireland'
            },
            {
                '/images/europe/flags/Italy.svg': 'Italy'
            },
            {
                '/images/europe/flags/Kosovo.svg': 'Kosovo'
            },
            {
                '/images/europe/flags/Latvia.svg': 'Latvia'
            },
            {
                '/images/europe/flags/Liechtenstein.svg': 'Liechtenstein'
            },
            {
                '/images/europe/flags/Lithuania.svg': 'Lithuania'
            },
            {
                '/images/europe/flags/Luxembourg.svg': 'Luxembourg'
            },
            {
                '/images/europe/flags/Malta.svg': 'Malta'
            },
            {
                '/images/europe/flags/Moldova.svg': 'Moldova'
            },
            {
                '/images/europe/flags/Monaco.svg': 'Monaco'
            },
            {
                '/images/europe/flags/Montenegro.svg': 'Montenegro'
            },
            {
                '/images/europe/flags/Netherlands.svg': 'Netherlands'
            },
            {
                '/images/europe/flags/NorthMacedonia.svg': 'North Macedonia'
            },
            {
                '/images/europe/flags/Norway.svg': 'Norway'
            },
            {
                '/images/europe/flags/Poland.svg': 'Poland'
            },
            {
                '/images/europe/flags/Portugal.svg': 'Portugal'
            },
            {
                '/images/europe/flags/Romania.svg': 'Romania'
            },
            {
                '/images/europe/flags/Russia.svg': 'Russia'
            },
            {
                '/images/europe/flags/SanMarino.svg': 'San Marino'
            },
            {
                '/images/europe/flags/Serbia.svg': 'Serbia'
            },
            {
                '/images/europe/flags/Slovakia.svg': 'Slovakia'
            },
            {
                '/images/europe/flags/Slovenia.svg': 'Slovenia'
            },
            {
                '/images/europe/flags/Spain.svg': 'Spain'
            },
            {
                '/images/europe/flags/Sweden.svg': 'Sweden'
            },
            {
                '/images/europe/flags/Switzerland.svg': 'Switzerland'
            },
            {
                '/images/europe/flags/Ukraine.svg': 'Ukraine'
            },
            {
                '/images/europe/flags/UK.svg': 'United Kingdom'
            },
            {
                '/images/europe/flags/VaticanCity.svg': 'Vatican City'
            }
        ]
    }

    if (region === 'world') {
        return Object.values(flags).flat();
    }
    return flags[region];
}
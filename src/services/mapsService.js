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
            'USA',
            'Uruguay',
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
            'Yemen'],

        'australia-oceania': [
            'Australia',
            'Fiji',
            'Kiribati',
            'Marshall Islands', 'Micronesia',
            'Nauru', 'New Zealand',
            'Palau', 'Papua New Guinea',
            'Samoa', 'Solomon Islands', 'Tonga', 'Tuvalu',
            'Vanuatu',],

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
    }
    else {
        return countries[region];
    }
}

export function nextCountry(countries) {
    const random = Math.floor(Math.random() * countries.length);
    return countries[random];
}
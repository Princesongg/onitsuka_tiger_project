const photo = sku => `/images/con9/colors/${sku}.jpg`;

export const accessoryColors = {
    socks: [
        { name: 'PINK', image: '/images/con9/socks.png' },
        { name: 'HEATHER GREY', image: photo('3183B030_020') },
        { name: 'WHITE / BLACK', image: photo('3183B030_100') },
        { name: 'BLACK', image: photo('3183B030_001') },
        { name: 'NAVY', image: photo('3183B030_400') },
        { name: 'PURPLE', image: photo('3183B030_401') },
    ],
    beanie: [
        { name: 'BLACK', image: '/images/con9/beanie.png' },
        { name: 'PURPLE', image: photo('3183B247_500') },
    ],
    'tote-bag': [
        { name: 'NAVY / OFF WHITE', image: '/images/con9/tote-bag.png' },
        { name: 'BEIGE / ORANGE', image: photo('3183B233_250') },
        { name: 'PINK / BLACK', image: photo('3183B233_700') },
    ],
    'small-shoulder-bag': [
        { name: 'BEIGE', image: '/images/con9/small-shoulder-bag.png' },
        { name: 'PURPLE', image: photo('3182A046_500') },
        { name: 'BLACK', image: photo('3182A046_001') },
        { name: 'YELLOW', image: photo('3182A046_750') },
    ],
    'shoulder-bag': [{ name: 'BLACK / BLACK', image: '/images/con9/shoulder-bag.png' }],
    cap: [
        { name: 'BLACK', image: '/images/con9/cap.png' },
        { name: 'BEIGE / BROWN', image: photo('3183B120_250') },
        { name: 'OFF WHITE', image: photo('3183B120_701') },
    ],
};

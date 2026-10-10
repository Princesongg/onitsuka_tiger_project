// Color names and style numbers from Onitsuka Tiger's official product pages.
// Local photos use the matching style's SR_RT_GLB image from images.asics.com.
const makeColors = (slug, colors) => colors.map(([sku, name]) => ({
    sku,
    name,
    image: `/images/con2/colors/${sku.toLowerCase()}.jpg`,
    url: `https://www.onitsukatiger.com/kr/ko-kr/product/${slug}/${sku.toLowerCase()}`,
}));

export const models = [
    { id: 'mexico-66', name: 'MEXICO 66', price: '₩196,000', colors: makeColors('mexico-66', [
        ['1183C102.001', 'BLACK / WHITE'],
        ['1183A201.127', 'CREAM / LIGHT SAGE'],
        ['1183A201.126', 'WHITE / BLACK'],
        ['1183A201.124', 'CREAM / ROVER'],
        ['1183A201.003', 'BLACK / YELLOW'],
        ['1183A201.409', 'PEACOAT / GUAVA'],
        ['1183A201.115', 'CREAM / MAKO BLUE'],
        ['1183A201.304', 'AIRY GREEN / VERDIGRIS GREEN'],
    ]) },
    { id: 'mexico-66-sd', name: 'MEXICO 66 SD', price: '₩220,000', colors: makeColors('mexico-66-sd', [
        ['1183A872.200', 'BIRCH / PEACOAT'],
        ['1183A872.004', 'BLACK / BLACK'],
        ['1183A872.117', 'WHITE / WHITE'],
        ['1183A872.205', 'BIRCH / BEET JUICE'],
        ['1183A872.203', 'BIRCH / RUST ORANGE'],
        ['1183A872.119', 'CREAM / WHITE'],
        ['1183A872.402', 'OCEAN HAZE / PALE MINT'],
        ['1183A872.107', 'CREAM / CILANTRO'],
    ]) },
    { id: 'sclaw', name: 'SCLAW', price: '₩250,000', colors: makeColors('sclaw', [
        ['1183B969.001', 'BLACK / WHITE'],
        ['1183B969.100', 'WHITE / BLACK'],
        ['1183B969.101', 'CREAM / WHITE'],
        ['1183B969.750', 'YELLOW / BLACK'],
        ['1183B969.400', 'PEACOAT / COTTON CANDY'],
    ]) },
    { id: 'tiger-corsair', name: 'TIGER CORSAIR', price: '₩230,000', colors: makeColors('tiger-corsair', [
        ['1183C555.300', 'BRONZE GREEN / CREAM'],
        ['1183C555.250', 'CAMEL BEIGE / BLACK'],
    ]) },
    { id: 'edr78', name: 'EDR78', price: '₩200,000', colors: makeColors('edr-78', [
        ['1183B411.200', 'BIRCH / PEACOAT'],
        ['1183B411.101', 'WHITE / DIRECTOIRE BLUE'],
        ['1183B411.103', 'CREAM / GINGER PEACH'],
        ['1183B411.001', 'BLACK / WHITE'],
        ['1183B411.750', 'IVORY / MUSTARD'],
        ['1183B411.104', 'CREAM / PURE SILVER'],
        ['1183B411.751', 'FADED YELLOW / INDIGO NAVY'],
    ]) },
    { id: 'tokuten', name: 'TOKUTEN', price: '₩190,000', colors: makeColors('tokuten', [
        ['1183C430.020', 'CHARCOAL / BIRCH'],
        ['1183C431.702', 'BLOSSOM PINK / BLACK'],
        ['1183C431.300', 'PEPPERMINT / BLACK'],
        ['1183C431.001', 'BLACK / COTTON CANDY'],
        ['1183C431.020', 'PIEDMONT GREY / METROPOLIS'],
        ['1183C431.701', 'BLOSSOM PINK / OFF-WHITE'],
        ['1183C431.600', 'FIERY RED / CREAM'],
        ['1183C431.700', 'SUN PEACH / PALE BLUE'],
    ]) },
];

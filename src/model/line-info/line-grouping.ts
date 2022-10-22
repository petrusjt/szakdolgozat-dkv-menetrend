import i18next from 'src/i18n'


const LineGrouping = new Map([
    [i18next.t('lineGrouping.tram'), new Map([
        ["1", ["1"]],
        ["2", ["2"]],
    ])],
    [i18next.t('lineGrouping.bus'), new Map([
        ["10", ["10", "10A", "10Y"]],
        ["15", ["15", "15Y"]],
        ["30", ["30", "30A", "30I", "30N"]],
    ])],
]);

export default LineGrouping;
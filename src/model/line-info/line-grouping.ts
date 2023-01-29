import i18next from 'src/i18n'


const LineGrouping = new Map([
    ["tram", new Map([
        ["1", ["1"]],
        ["2", ["2"]],
    ])],
    ["trolley", new Map([
        ["3", ["3", "3A"]],
        ["4", ["4"]],
        ["5", ["5", "5A"]],
    ])],
    ["bus", new Map([
        ["10", ["10", "10A", "10Y"]],
        ["15", ["15", "15Y"]],
        ["30", ["30", "30A", "30I", "30N"]],
    ])],
]);

export default LineGrouping;
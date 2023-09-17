

const LINES_WITHOUT_REVERSE_DIRECTION: Array<string> = [
    '1',
    '2',
    '4',
    '10A',
    '22',
    '22Y',
    '23',
    '24',
    '24Y',
    '125',
    '44',
    '46Y',
    '146',
    '90Y',
    '91A',
    '91Y',
    '92',
    '93',
    '94'
]

export default function hasReverseDirection(lineId: string) : boolean {
    return !LINES_WITHOUT_REVERSE_DIRECTION.includes(lineId)
}
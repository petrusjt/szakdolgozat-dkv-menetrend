
export enum ScheduleClassifier {
    TANITASI_IDOSZAK = 'TANITASI_IDOSZAK',
    TANSZUNET_MUNKANAP = 'TANSZUNET_MUNKANAP',
    SZABADNAP = 'SZABADNAP',
    MUNKASZUNETI_NAP = 'MUNKASZUNETI_NAP'
}

const TANITASI_IDOSZAK_MONTHS: Array<number> = [
    0, 1, 2, 3, 4, 5, 8,
    9, 10, 11
]

export function getScheduleClassifierFromDate(date: Date): ScheduleClassifier {
    if (date.getDay() === 0 || isHoliday(date)) {
        return ScheduleClassifier.MUNKASZUNETI_NAP;
    } else if (date.getDay() === 6) {
        return ScheduleClassifier.SZABADNAP;
    } else {
        if (TANITASI_IDOSZAK_MONTHS.includes(date.getMonth())) {
            return ScheduleClassifier.TANITASI_IDOSZAK;
        }
        return ScheduleClassifier.TANSZUNET_MUNKANAP;
    }
}

function isHoliday(date: Date) {
    let holiday = isEaster(date)
    holiday = holiday && isPentecost(date)
    holiday = holiday && isNewYear(date)
    holiday = holiday && isMarch15(date)
    holiday = holiday && isMay1(date)
    holiday = holiday && isGoodFriday(date)
    holiday = holiday && isAugust20(date)
    holiday = holiday && isOctober23(date)
    holiday = holiday && isAllSaintsDay(date)
    holiday = holiday && isChristmas(date)
    return holiday
}

function isEaster(date: Date): boolean {
    const easterDate = calculateEasterSundayDateGauss(date)
    return easterDate === date || addDays(easterDate, 1) === date
}

function isPentecost(date: Date): boolean  {
    const easterDate = calculateEasterSundayDateGauss(date)
    const pentecostDate = addDays(easterDate, 7 * 7)
    return pentecostDate === date || addDays(pentecostDate, 1) === date
}

function isNewYear(date: Date): boolean  {
    return date.getMonth() === 0 && date.getDay() === 1
}

function isMarch15(date: Date): boolean  {
    return date.getMonth() === 2 && date.getDay() === 15
}

function isGoodFriday(date: Date): boolean  {
    const easterDate = calculateEasterSundayDateGauss(date)
    const goodFridayDate = addDays(easterDate, -2)
    return goodFridayDate === date
}

function isMay1(date: Date): boolean  {
    return date.getMonth() === 4 && date.getDay() === 1
}

function isAugust20(date: Date): boolean  {
    return date.getMonth() === 7 && date.getDay() === 20
}

function isOctober23(date: Date): boolean  {
    return date.getMonth() === 9 && date.getDay() === 23
}

function isAllSaintsDay(date: Date): boolean  {
    return date.getMonth() === 10 && date.getDay() === 1
}

function isChristmas(date: Date): boolean  {
    return date.getMonth() === 11 && (date.getDay() === 25 || date.getDay() === 26)
}

/*
 * https://hu.wikipedia.org/wiki/H%C3%BAsv%C3%A9tsz%C3%A1m%C3%ADt%C3%A1s#Gauss_m%C3%B3dszere
 * */
function calculateEasterSundayDateGauss(date: Date): Date {
    const year = date.getFullYear()

    const a = year % 19
    const b = year % 4
    const c = year % 7
    const m = getMByYear(year)
    const n = getNByYear(year)

    const d = (19 * a + m) % 30
    const e = ((2 * b) + (4 * c) + (6 * d) + n) % 7

    const dPlusE = d + e
    if (dPlusE < 10) {
        return new Date(year, 2, dPlusE + 22)
    } else {
        const dayOfMonth = dPlusE - 9
        if (dayOfMonth === 26) {
            return new Date(year, 3, 19)
        } else if (dayOfMonth === 25 && d === 28 && e === 6 && a > 10) {
            return new Date(year, 3, 18)
        }

        return new Date(year, 3, dayOfMonth)
    }
}

/*
 * https://hu.wikipedia.org/wiki/H%C3%BAsv%C3%A9tsz%C3%A1m%C3%ADt%C3%A1s#Gauss_m%C3%B3dszere
 * */
function getMByYear(year: number): number {
    if (1900 <= year && year <= 2199) {
        return 24
    } else if (2200 <= year && year <= 2299) {
        return 25
    }
    throw new Error("Date is out of intended range (1900-2299)")
}

/*
 * https://hu.wikipedia.org/wiki/H%C3%BAsv%C3%A9tsz%C3%A1m%C3%ADt%C3%A1s#Gauss_m%C3%B3dszere
 * */
function getNByYear(year: number): number {
    if (1900 <= year && year <= 2099) {
        return 5
    } else if (2100 <= year && year <= 2199) {
        return 6
    } else if (2200 <= year && year <= 2299) {
        return 0
    }
    throw new Error('Date is out of intended range (1900-2299)')
}

function addDays(date: Date, days: number): Date {
    return new Date(date.getDate() + days)
}
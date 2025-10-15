// /workspaces/first-repo/string concept/time and date/date.js

// create a Date instance
let myDate = new Date(); // current date/time

// simple token-based formatter: YYYY, MM, DD, HH, mm, ss
function formatDate(date = new Date(), format = 'YYYY-MM-DD HH:mm:ss') {
    const pad = (n, z = 2) => String(n).padStart(z, '0');
    const tokens = {
        YYYY: date.getFullYear(),
        MM: pad(date.getMonth() + 1),
        DD: pad(date.getDate()),
        HH: pad(date.getHours()),
        mm: pad(date.getMinutes()),
        ss: pad(date.getSeconds()),
        ms: String(date.getMilliseconds()).padStart(3, '0'),
    };
    return format.replace(/YYYY|MM|DD|HH|mm|ss|ms/g, t => tokens[t]);
}

// parse common date string formats into a Date
// supports: "YYYY-MM-DD", "YYYY/MM/DD", "DD/MM/YYYY", "MM-DD-YYYY", ISO strings
function parseDateFromString(str) {
    if (!str || typeof str !== 'string') return null;
    // try native Date parser first (handles ISO and many formats)
    let d = new Date(str);
    if (!Number.isNaN(d.getTime())) return d;

    // try to parse manually for DD/MM/YYYY or YYYY-MM-DD etc.
    const isoMatch = str.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/);
    if (isoMatch) {
        const [, y, m, day] = isoMatch;
        return new Date(Number(y), Number(m) - 1, Number(day));
    }
    const dmyMatch = str.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
    if (dmyMatch) {
        const [, day, m, y] = dmyMatch;
        return new Date(Number(y), Number(m) - 1, Number(day));
    }
    return null;
}

// example usage
console.log('myDate (raw):', myDate);
console.log('Formatted (default):', formatDate(myDate));
console.log('Custom format:', formatDate(myDate, 'DD/MM/YYYY'));
console.log('ISO string:', myDate.toISOString());
console.log('Locale string:', myDate.toLocaleString());

// parsing examples
const d1 = parseDateFromString('2025-12-31');
const d2 = parseDateFromString('31/12/2025');
console.log('Parsed YYYY-MM-DD ->', d1 && formatDate(d1, 'YYYY-MM-DD'));
console.log('Parsed DD/MM/YYYY ->', d2 && formatDate(d2, 'YYYY-MM-DD'));

// export for use in other modules (CommonJS)
module.exports = {
    myDate,
    formatDate,
    parseDateFromString,
};
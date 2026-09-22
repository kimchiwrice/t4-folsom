// Current published schedule. Keep location hours in index.html in sync when changing it.
(function (root) {
    const timeZone = 'America/Los_Angeles';
    function getStatus(now) {
        const parts = Object.fromEntries(new Intl.DateTimeFormat('en-US', {
            timeZone, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
        }).formatToParts(now).map(part => [part.type, part.value]));
        const late = parts.weekday === 'Fri' || parts.weekday === 'Sat';
        const minutes = Number(parts.hour) * 60 + Number(parts.minute);
        return { isOpen: minutes >= 660 && minutes < (late ? 1320 : 1260),
            label: late ? '11AM – 10PM' : '11AM – 9PM' };
    }
    const api = { timeZone, getStatus };
    if (typeof module !== 'undefined') module.exports = api;
    else root.T4Hours = api;
})(globalThis);

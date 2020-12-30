export function formatDateToString(date: Date) {
    const yyyy = date.getFullYear();
    const mm = ("0" + (date.getMonth() + 1)).substr(-2);
    const dd = ("0" + date.getDate()).substr(-2);
    const h = ("0" + date.getHours()).substr(-2);
    const m = ("0" + date.getMinutes()).substr(-2);
    const s = ("0" + date.getSeconds()).substr(-2);
    
    return `${yyyy}/${mm}/${dd} ${h}:${m}:${s}`;
}
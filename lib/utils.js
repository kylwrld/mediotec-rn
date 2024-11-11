export function formatDate(date) {
    var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
}

/**
 * Merge elements from the second list into the first list
 */
export function mergeLists(first_list, second_list, condition) {
    if (first_list.length == 0) return second_list
    if (second_list.length == 0) return first_list

    return first_list.map(first_list_item => {
        const found = second_list.find(item => {
            return condition(item, first_list_item)
        });
        return found ? found : first_list_item
    });
}

export function mergeObjs(first_obj, second_obj) {
    const newObj = {}
    Object.keys(first_obj).map(key => newObj[key] = first_obj[key])
    Object.keys(second_obj).map(key => newObj[key] = second_obj[key])
    return newObj
}

/**
 * Calculates the difference between two dates
 * @param date1 {Date}
 * @param date2 {Date}
 */
export const dateDiff = (date1, date2) => {
    const diff = date1 - date2;
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7))
    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44))
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25))

    if (seconds < 60) {
        return seconds == 1 ? "1 segundo": seconds + " segundos"
    } else if (minutes < 60) {
        return minutes == 1 ? "1 minuto": minutes + " minutos"
    } else if (hours < 25) {
        return hours == 1 ? "1 hora": hours + " horas"
    } else if (days < 8) {
        return days == 1 ? "1 dia": days + " dias"
    } else if (weeks < 31) {
        return weeks == 1 ? "1 semana": weeks + " semanas"
    } else if (months < 13) {
        return months == 1 ? "1 mês": months + " meses"
    }

    return years == 1 ?  "1 ano" : years + " anos"
}

const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
};
const formatterDateTime = new Intl.DateTimeFormat('en-US', options);

const formatDateFromIso = (isoDate) => {
    return new Date(isoDate).toISOString().substring(0, 10);
}

const formatDateTimeFromIso = (isoDate) => {
    const date = new Date(isoDate).toISOString().substring(0, 10);
    return formatterDateTime.format(new Date(isoDate));
}

export const DATE_UTILS = {
    formatDateFromIso,
    formatDateTimeFromIso,
};
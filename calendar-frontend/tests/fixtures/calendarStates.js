export const events = [
    {
        id: '1',
        start: new Date('2022-10-13 13:00:00'),
        end: new Date('2022 - 10 - 13 13:00:00'),
        title: 'Cumpleaños de Darwin',
        notes: 'Alguna nota',
    },
    {
        id: '2',
        start: new Date('2022-10-13 13:00:00'),
        end: new Date('2022 - 10 - 13 13:00:00'),
        title: 'Cumpleaños de Melisa',
        notes: 'Alguna nota de melissa',
    }
];


export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null
}
export const calendarWithEventsState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: null
}
export const calendarWithActiveEventsState = {
    isLoadingEvents: true,
    events: [...events],
    activeEvent: { ...events[0] },
}


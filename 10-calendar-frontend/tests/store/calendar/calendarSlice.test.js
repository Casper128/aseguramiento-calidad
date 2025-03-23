import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice";
import { calendarWithActiveEventsState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarStates";

describe('Pruebas en CalendarSlice', () => {
    test('debe de regresar el estado por defecto', () => {

        const state = calendarSlice.getInitialState();
        expect(state).toEqual(initialState);
    });

    test('onSetActiveEvent debe de activar el evento', () => {
        const state = calendarSlice.reducer(calendarWithActiveEventsState, onSetActiveEvent(events[0]));
        expect(state.activeEvent).toEqual(events[0]);
    });

    test('onAddNewEvent debe de agregar el evento', () => {
        const newEvent = {
            id: '3',
            start: new Date('2022-10-13 13:00:00'),
            end: new Date('2022 - 10 - 13 13:00:00'),
            title: 'Cumpleaños de Manuela!!',
            notes: 'Alguna nota de Manuela',
        };

        const state = calendarSlice.reducer(calendarWithEventsState, onAddNewEvent(newEvent));
        expect(state.events).toEqual([...events, newEvent]);
    });

    test('onUpdateEvent debe de actualizar el evento', () => {
        const updateEvent = {
            id: '1',
            start: new Date('2022-10-13 13:00:00'),
            end: new Date('2022 - 10 - 13 13:00:00'),
            title: 'Cumpleaños de Darwin Actualizado!!',
            notes: 'Alguna nota de Darwin Actualizado',
        };

        const state = calendarSlice.reducer(calendarWithEventsState, onUpdateEvent(updateEvent));
        expect(state.events).toContain(updateEvent);
    });

    test('onDeleteEvent debe de borrar el evento activo', () => {
        const newEvent = {
            id: '3',
            start: new Date('2022-10-13 13:00:00'),
            end: new Date('2022 - 10 - 13 13:00:00'),
            title: 'Cumpleaños de Manuela!!',
            notes: 'Alguna nota de Manuela',
        };

        const state = calendarSlice.reducer(calendarWithEventsState, onAddNewEvent(newEvent));
        expect(state.events).toEqual([...events, newEvent]);
        const newState = calendarSlice.reducer(calendarWithEventsState, onDeleteEvent());
        expect(newState.events).toEqual([...events]);
        expect(state.activeEvent).toBe(null);
    });

    test('onLoadEvents debe de establecer los eventos', () => {
        const state = calendarSlice.reducer(initialState, onLoadEvents(events));
        expect(state.events).toEqual(events);
        expect(state.isLoadingEvents).toBeFalsy();
    });

    test('onLogoutCalendar debe de limipar el estado', () => {
        const state = calendarSlice.reducer(calendarWithEventsState, onLogoutCalendar());
        expect(state).toEqual(initialState);
    });
});
import { authSlice, clearErrorMessage, onLogin, onLogout } from "../../../src/store/auth/authSlice";
import { authenticatedState, initialState } from "../../fixtures/authStates";
import { testUserCredentials } from "../../fixtures/testUsers";

describe('Prueba en AuthSlice', () => {
    test('debe de regreasr el estado inicial', () => {
        expect(authSlice.getInitialState()).toEqual(initialState);
    });

    test('debe de realizar un login', () => {
        const state = authSlice.reducer(initialState, onLogin(testUserCredentials));
        expect(state).toEqual({
            status: 'authenticated',
            user: testUserCredentials,
            errorMessage: undefined,
        });
    });

    test('debe realizar el logout', () => {
        const state = authSlice.reducer(authenticatedState, onLogout());
        expect(state).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: undefined,
        });
    });

    test('debe realizar el logout con payload', () => {
        const errorMessage = 'Credentials no válidas';
        const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
        expect(state).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage,
        });
    });

    test('debe de limpiar el mensaje de error', () => {
        const errorMessage = 'Credentials no válidas';
        const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
        const newState = authSlice.reducer(authenticatedState, clearErrorMessage());
        expect(newState.errorMessage).toBe(undefined);
    });

    test('debe de limpiar el mensaje de error', () => {
        const errorMessage = 'Credentials no válidas';
        const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
        const newState = authSlice.reducer(authenticatedState, clearErrorMessage());
        expect(newState.errorMessage).toBe(undefined);
    });
});


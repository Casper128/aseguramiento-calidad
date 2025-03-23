export const initialState = {
    status: 'checking', // 'authenticated','not-authenticated',
    user: {},
    errorMessage: undefined,
}

export const authenticatedState={
    status: 'authenticated', // 'checking','not-authenticated',
    user: {
        uid: 'abc',
        name:'Darwin',
    },
    errorMessage: undefined,
}

export const notAuthenticatedState={
    status: 'not-authenticated', // 'checking','not-authenticated',
    user: {},
    errorMessage: undefined,
}
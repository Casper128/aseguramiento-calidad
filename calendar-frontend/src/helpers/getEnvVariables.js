
export const getEnvVariables = () => {
    return {
        VITE_API_URL: import.meta.env.VITE_API_URL,
        VITE_OTHER_VAR: import.meta.env.VITE_OTHER_VAR
    };
};

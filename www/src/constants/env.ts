const getEnv = (key: string, defaultValue?: string): string => {
    const value = process.env[key] || defaultValue;

    if (value === undefined) {
        throw Error(`Missing environment variable for ${key}.`);
    }

    return value;
}

export const UPDATE_LATEST_URL = getEnv("UPDATE_LATEST_URL", "/update-latest");
export const UPDATE_LATEST_USER_AGENT = getEnv("UPDATE_LATEST_USER_AGENT");
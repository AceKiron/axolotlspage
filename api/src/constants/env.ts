const getEnv = (key: string, defaultValue?: string): string => {
    const value = process.env[key] || defaultValue;

    if (value === undefined) {
        throw Error(`Missing environment variable for ${key}.`);
    }

    return value;
}

export const MONGO_URI = getEnv("MONGO_URI", "mongodb://localhost:27017/axolotlspage");
export const PASSWORD_SECRET = getEnv("PASSWORD_SECRET", "axolotlsarecute");
export const ACCESS_TOKEN_SECRET = getEnv("ACCESS_TOKEN_SECRET", "access");
export const REFRESH_TOKEN_SECRET = getEnv("REFRESH_TOKEN_SECRET", "refresh");
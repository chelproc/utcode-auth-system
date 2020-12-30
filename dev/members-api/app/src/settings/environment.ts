export const Environment = {
    isProduction: process.env.NODE_ENV === "production",
    baseUrl: process.env.BASE_URL as string,
    clientBaseUrl: process.env.CLIENT_BASE_URL as string,
    cookieDomain: process.env.COOKIE_DOMAIN as string
}
import { Environment } from "../settings/environment";

export function isValidRedirectUrl(url: string) {
    if (Environment.isProduction) {
        return (
            url.startsWith("https://utcode.net/") ||
            url.startsWith("/") ||
            /^https:\/\/[^/]*.utcode.net\//.test(url)
        );
    } else {
        return (
            /^http:\/\/localhost:\d{4}$/.test(url) ||
            url.startsWith("/")
        );
    }
}
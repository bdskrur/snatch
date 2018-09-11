import { History } from "history";

export function formatSize(num: number) {
    return num.toString().replace(/\d(?=(\d{3})+$)/g, "$& ");
}

export function getCorrectPath(history: History, path: string) {
    const locationLastChar = history.location.pathname.charAt(history.location.pathname.length - 1);
    const pathFirstChar = path.charAt(0);

    if (locationLastChar === "/") {
        if (pathFirstChar === "/") {
            return history.location.pathname + path.slice(1);
        }

        return history.location.pathname + path;
    }

    if (pathFirstChar === "/") {
        return history.location.pathname + path;
    }
    return history.location.pathname + "/" + path;
}

export function getCorrectParentPath(history: History, depth: number = 1) {
    const tokens = history.location.pathname.split("/");
    const lastToken = tokens[tokens.length - 1];
    let actualTokens: string[] = [];

    if (lastToken === "") {
        actualTokens = tokens.slice(0, tokens.length - depth - 1);
    } else {
        actualTokens = tokens.slice(0, tokens.length - depth);
    }

    return actualTokens.join("/");
}

export function getCorrectCloseDepth(path: string): number {
    const tokensLength = path.split("/").length;

    return tokensLength - 2;
}

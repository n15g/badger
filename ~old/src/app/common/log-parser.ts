import { h32 } from 'xxhashjs';

const CHUNK_SIZE = 64 * 1024;

const LOG_LINE_REGEXP = /^([\d]{4}-[\d]{2}-[\d]{2} [\d]{2}:[\d]{2}:[\d]{2}) (.*)/;
const LOG_IN_REGEXP = /^(Now entering the Rogue Isles|Welcome to City of Heroes), (.*)!/;
const SET_BADGE_REGEXP = /(.*) has been selected as new title/;
const EARN_BADGE_REGEXP = /Congratulations! You earned the (.*) badge/;

export const enum LogLineType {
    LOGIN,
    BADGE
}

interface LogLine {
    type: LogLineType;
    time: number;
}

interface LogLineLogin extends LogLine {
    type: LogLineType.LOGIN;
    characterName: string;
}

interface LogLineBadge extends LogLine {
    type: LogLineType.BADGE;
    badgeName: string;
}

export async function getFileHash(file: File): Promise<string> {
    const h = h32(0xABCD);
    await readFileSequential(file, CHUNK_SIZE, (chunk) => {
        h.update(chunk);
    });

    return h.digest().toString(16);
}

export function* getFileChunks(file, chunkSize: number = CHUNK_SIZE) {
    for (let offset = 0; offset < file.size + CHUNK_SIZE; offset += chunkSize) {
        yield Math.min(offset, file.size);
    }
}

export function readFileSequential(file: File, chunkSize: number = CHUNK_SIZE, onChunk: (chunk: string) => void) {
    return new Promise<void>(async resolve => {
        for await (const offset of getFileChunks(file)) {
            const chunk = await readFileChunk(file, offset, chunkSize);
            onChunk(chunk);
        }

        resolve();
    });
}

export function readFileChunk(file: File, offset: number, chunkSize: number = CHUNK_SIZE) {
    return new Promise<string>(resolve => {
        const r = new FileReader();
        r.addEventListener('load', () => {
            resolve(r.result.toString());
        });
        const chunk = file.slice(offset, chunkSize + offset);
        r.readAsText(chunk);
    });
}

export function parseLog(file: File, onProgress: (offset: number) => void): Promise<Array<LogLineLogin | LogLineBadge>> {
    const lines = [];
    const parsedLines: Array<LogLineLogin | LogLineBadge> = [];

    return new Promise(async resolve => {
        for await (const offset of getFileChunks(file)) {
            const chunk = await readFileChunk(file, offset);

            const chunkLines = chunk.split('\n');

            const parseLinesStart = lines.length;

            lines[lines.length - 1] += chunkLines.shift();

            lines.push(...chunkLines);

            // parse lines
            const linesToParse = [
                ...lines.slice(parseLinesStart, lines.length - 1)
            ];

            for (const line of linesToParse) {
                const res = parseLine(line);

                if (res !== null) {
                    parsedLines.push(res);
                }
            }

            onProgress(offset);
        }

        resolve(parsedLines);
    });
}

function parseLine(line: string): LogLineBadge | LogLineLogin | null {
    const logTestResult = logLineTest(line);

    if (logTestResult === null) {
        return null;
    }

    const [time, lineRest] = logTestResult;

    const characterName = logInTest(lineRest);

    if (characterName !== null) {
        return {
            type: LogLineType.LOGIN,
            time,
            characterName,
        };
    }

    const badgeName = badgeSetTest(lineRest);

    if (badgeName !== null && badgeName !== '.') {
        return {
            type: LogLineType.BADGE,
            time,
            badgeName,
        };
    }

    return null;
}


function logLineTest(line): [number, string] {
    const lineParts = LOG_LINE_REGEXP.exec(line);
    if (lineParts === null) {
        return null;
    }

    const [, date, lineRest] = lineParts;

    const time = new Date(date).getTime();

    if (isNaN(time)) {
        return null;
    }

    return [time, lineRest];
}

function logInTest(line) {
    const res = LOG_IN_REGEXP.exec(line);

    if (res !== null) {
        const [, , characterName] = res;
        return characterName;
    }

    return null;
}

function badgeSetTest(line) {
    const res = SET_BADGE_REGEXP.exec(line);

    if (res !== null) {
        const [, badgeName] = res;

        return badgeName;
    }

    const res2 = EARN_BADGE_REGEXP.exec(line);
    if (res2 !== null) {
        const [, badgeName] = res2;

        return badgeName;
    }

    return null;
}

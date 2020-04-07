import { h32 } from 'xxhashjs';

const CHUNK_SIZE = 64 * 1024;

export async function getFileHash(file: File): Promise<string> {
    const h = h32(0xABCD);
    await readFileSequential(file, (chunk) => {
        h.update(chunk);
    });

    return h.digest().toString(16);
}

export function* getFileChunks(file) {
    for (let offset = 0; offset < file.size + CHUNK_SIZE; offset += CHUNK_SIZE) {
        yield Math.min(offset, file.size);
    }
}

export function readFileSequential(file: File, onChunk: (chunk: string) => void) {
    return new Promise<void>(async resolve => {
        for await (const offset of this.getFileChunks(file)) {
            const chunk = await this.readFileChunk(file, offset, CHUNK_SIZE);
            onChunk(chunk);
        }

        resolve();
    });
}

export function readFileChunk(file: File, offset: number, chunkSize: number) {
    return new Promise<string>(resolve => {
        const r = new FileReader();
        r.addEventListener('load', () => {
            resolve(r.result.toString());
        });
        const chunk = file.slice(offset, chunkSize + offset);
        r.readAsText(chunk);
    });
}

interface ISong {
    title: string
    artist: string
}

interface ICipher {
    [key: string]: { cipher: string; current: string | null; letter: boolean }
}

interface IDecipher {
    [key: string]: string[]
}

interface ISelectedLetter {
    letter: string
    index: number
}

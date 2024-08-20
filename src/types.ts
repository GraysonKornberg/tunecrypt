interface ISong {
    title: string
    artist: string
}

interface ICipher {
    [key: string]: { cipher: string; current: string | null }
}

interface ISelectedLetter {
    letter: string
    index: number
}

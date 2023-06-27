


export namespace NumberFormatter {
    export const PadStart = (num: number | Number, size = 2): string => {
        return String(num).padStart(size , '0')
    }
}

declare global {
    interface Number {
        padStart : (size?: number) => string
    }
}


Number.prototype.padStart = function (size = 2){
    return NumberFormatter.PadStart(this, size)
}
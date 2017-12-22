export class Util {
    public static getClosingIndex(text: string, start: number): number {
        if (text == null || start == null || start < 0 || start >= text.length) {
            return null;
        }

        let chars = '(){}[]';
        let openChar = text.charAt(start);
        let openIdx = chars.indexOf(openChar);

        if (openIdx == -1) {
            return null;
        }

        let closeChar = chars.charAt(openIdx + 1);
        let level = 1;
        let cur = start + 1;
        while (cur < text.length && level > 0) {
            let char = text.charAt(cur);
            if (char == openChar) {
                level++;
            } else if (char == closeChar) {
                level--;
            }
            if (level > 0) {
                cur++;
            }
        }

        if (level == 0) {
            return cur;
        } else {
            return null;
        }
    }

    public static splitStringNumber(text: string): [string, number] {
        if (text == null) {
            return null;
        }

        let idx;

        for (idx = 0; isNaN(parseInt(text.charAt(idx))) && idx < text.length; idx++) {}

        return [text.substring(0, idx), parseInt(text.substring(idx))]
    }

    public static clone(obj: any): any {
        return JSON.parse(JSON.stringify(obj));
    }
}
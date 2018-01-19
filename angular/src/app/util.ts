export class Util {
    public static randomString(len: number): string {
        let alpha = 'abcdefghijklmnopqrstuvwxyz';
        let str = '';
        for (let i = 0; i < len; i++) {
            str += alpha.charAt(Math.floor(Math.random() * alpha.length));
        }
        return str;
    }
}

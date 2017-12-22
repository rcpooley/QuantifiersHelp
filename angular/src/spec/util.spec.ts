import {Util} from "../app/util";

describe('Util.getClosingIndex', () => {
    it('should handle null text', () => {
        expect(Util.getClosingIndex(null, 0)).toBeNull();
    });

    it('should handle null index', () => {
        expect(Util.getClosingIndex('', null)).toBeNull();
    });

    it('should handle negative or too great start index', () => {
        expect(Util.getClosingIndex('abc', -1)).toBeNull();
        expect(Util.getClosingIndex('abc', 3)).toBeNull();
        expect(Util.getClosingIndex('', 0)).toBeNull();
    });

    it('should handle no match cases', () => {
        expect(Util.getClosingIndex('(', 0)).toBeNull();
        expect(Util.getClosingIndex('(()', 0)).toBeNull();
        expect(Util.getClosingIndex('( )', 1)).toBeNull();
    });

    it('should handle basic cases', () => {
        expect(Util.getClosingIndex('(abc)', 0)).toBe(4);

        let str = '( ( () () (()) ) )';
        expect(Util.getClosingIndex(str, 0)).toBe(17);
        expect(Util.getClosingIndex(str, 2)).toBe(15);
        expect(Util.getClosingIndex(str, 4)).toBe(5);
    });
});

describe('Util.splitStringNumber', () => {
    it('should handle null text', () => {
        expect(Util.splitStringNumber(null)).toBeNull();
    });

    it('should handle basic cases', () => {
        expect(Util.splitStringNumber('abc')).toEqual(['abc', NaN]);
        expect(Util.splitStringNumber('abc123')).toEqual(['abc', 123]);
        expect(Util.splitStringNumber('123')).toEqual(['', 123]);
        expect(Util.splitStringNumber('')).toEqual(['', NaN]);
    });
});
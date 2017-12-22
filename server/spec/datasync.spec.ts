import {DataSync} from "../src/datasync";

describe('datasync.getTopPath', () => {
    it('should handle null case', () => {
        expect(DataSync.getTopPath(null)).toBeNull();
    });

    it('should handle basic cases', () => {
        expect(DataSync.getTopPath('')).toBe('');
        expect(DataSync.getTopPath('/a')).toBe('/a');
        expect(DataSync.getTopPath('/a/b')).toBe('/a');
        expect(DataSync.getTopPath('/a/b/c')).toBe('/a');
        expect(DataSync.getTopPath('/aaa')).toBe('/aaa');
        expect(DataSync.getTopPath('/aaa/bbb')).toBe('/aaa');
        expect(DataSync.getTopPath('/aaa/bbb/ccc')).toBe('/aaa');
    });
});
import {add,subtract} from '../controllers/file_controller.js'


test('add function should add two numbers', () => {
    expect(add(1, 2)).toBe(3);
    expect(add(-1, -2)).toBe(-3);
});

test('subtract function should subtract two numbers', () => {
    expect(subtract(3, 2)).toBe(1);
    expect(subtract(-1, -2)).toBe(1);
});
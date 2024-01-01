import Settings from '../settings.js'
import { data } from '../utils/data.js'
import { sendMessage } from '../utils/party.js'
import { showAlert } from '../utils/utils.js'
import { createGuiCommand, renderGuiPosition } from '../utils/functions.js'
import { constrainX, constrainY, getNumLines } from '../utils/functions.js'

const test_string = 'Test String: &b0:00:00';
const base_stringH = 10;
var movebox = new Gui();



register('dragged', (dx, dy, x, y) => {
    // if (!data.inSkyblock) return;
    if (movebox.isOpen()) {
        let testStringW = Renderer.getStringWidth(test_string);
        let testStringH = (getNumLines(test_string)) * base_stringH;
        data.testBox.x = constrainX(x, 3, testStringW);
        data.testBox.y = constrainY(y, 3, testStringH);
        console.log(`data.testBox.x: ${data.testBox.x}, data.testBox.y: ${data.testBox.y}`)
    };
});

createGuiCommand(movebox, 'movebox', 'mbx');

register('renderOverlay', () => {
    // if (!data.inSkyblock) return;
    Renderer.drawString(test_string, data.testBox.x, data.testBox.y);

    renderGuiPosition(movebox, data.testBox, 'TestString: 0:00:00');
});
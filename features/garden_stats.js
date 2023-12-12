import { data } from '../utils/data.js'

// let pestsSpawned = 0;
// let averagePestTimes = [];
// let avgTimePerPest = 0;
// let timeElapsed = 0;
// register('chat', (numPests, userPlotName, event) => {
//     pestsSpawned += Number(numPests);
//     averagePestTimes.push(avgTimePerPest);
//     avgTimePerPest = 0;
// }).setCriteria('${numPests} Pests have spawned in Plot - ${userPlotName}!').setContains();

// register('step', () => {
//     timeElapsed += 1;
//     avgTimePerPest += 1;
// }).setFps(1);

let timeRemaining = 30;

// Function to update the timer display
function updateTimer() {
    document.getElementById('timer').textContent = timeRemaining;
    timeRemaining--;

    // Check if the timer has reached 0
    if (timeRemaining < 0) {
    clearInterval(timerInterval);
    alert('Time is up!');
    }
}

// Update the timer every second (1000 milliseconds)
const timerInterval = setInterval(updateTimer, 1000);

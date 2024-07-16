document.getElementById('inputForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
    const pitch = parseFloat(document.getElementById('pitch').value);
    const roll = parseFloat(document.getElementById('roll').value);
    const heave = parseFloat(document.getElementById('heave').value);

    console.log('Inputs:');
    console.log('Pitch:', pitch);
    console.log('Roll:', roll);
    console.log('Heave:', heave);

    // Calculate actuator elongations
    const actuator1 = calculateElongation(pitch, roll, heave, 1);
    const actuator2 = calculateElongation(pitch, roll, heave, 2);
    const actuator3 = calculateElongation(pitch, roll, heave, 3);

    // Log calculations to the console
    console.log('Calculations:');
    console.log('Actuator 1 Elongation:', actuator1.toFixed(2), 'mm');
    console.log('Actuator 2 Elongation:', actuator2.toFixed(2), 'mm');
    console.log('Actuator 3 Elongation:', actuator3.toFixed(2), 'mm');
});

function calculateElongation(pitch, roll, heave, actuatorNumber) {
    // Define constants for your actuator positions and orientations
    const pitchFactorPositive = 0.69; // Adjusted factor for positive pitch (20 / 29)
    const pitchFactorNegative = 0.34; // Adjusted factor for negative pitch (10 / 29)
    const rollFactorPositive = 0.69;  // Adjusted factor for positive roll (20 / 29)
    const rollFactorNegative = 0.34;  // Adjusted factor for negative roll (10 / 29)
    const heaveFactor = 1.0;
    const adjustmentFactor = 0.1;    // Small measure for adjustment
    const maxPositiveElongation = 20;
    const maxNegativeElongation = -10; // Maximum negative elongation
    const minElongation = 2;           // Minimum elongation

    // Home position of the actuator
    const homePosition = 10;

    // Calculate initial elongation based on pitch, roll, and heave
    let elongation = heave * heaveFactor;

    if (actuatorNumber === 1) {
        if (pitch >= 0) {
            elongation += pitch * pitchFactorPositive;
        } else {
            elongation += pitch * pitchFactorNegative;
        }
    } else if (actuatorNumber === 2) {
        if (roll >= 0) {
            elongation += roll * rollFactorPositive;
        } else {
            elongation += roll * rollFactorNegative;
        }
    } else if (actuatorNumber === 3) {
        elongation += (pitch + roll) * 0.5 * (pitchFactorPositive + rollFactorPositive);
    }

    // Adjust for the interaction between pitch and roll
    if (pitch > 0 && roll < 0) {
        if (actuatorNumber === 1 || actuatorNumber === 2) {
            elongation -= adjustmentFactor;
        }
    } else if (pitch < 0 && roll > 0) {
        if (actuatorNumber === 1 || actuatorNumber === 2) {
            elongation -= adjustmentFactor;
        }
    }

    // Apply home position offset
    elongation += homePosition;

    // Ensure elongation does not exceed max and min limits
    if (elongation > homePosition + maxPositiveElongation) {
        elongation = homePosition + maxPositiveElongation;
    } else if (elongation < homePosition + maxNegativeElongation) {
        elongation = homePosition + maxNegativeElongation;
    }

    // Ensure elongation does not go below the minimum elongation
    if (elongation < minElongation) {
        elongation = minElongation;
    }

    return elongation;
}

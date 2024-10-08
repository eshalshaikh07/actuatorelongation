﻿# 3dofactuatorelongation
# Actuator Elongation Calculation Project

This project calculates the elongation of three actuators based on input values for pitch, roll, and heave. The calculations are performed using JavaScript and can be tested through a simple web form.

## Project Overview

The provided JavaScript code listens for form submissions, extracts input values for pitch, roll, and heave, and calculates the elongation for three actuators. The calculations consider factors for positive and negative pitch and roll, as well as adjustments for interactions between pitch and roll.

## Features

- **Input Form**: Users can manually enter pitch, roll, and heave values.
- **Automatic Input Generation**: Random input values are generated every second.
- **Actuator Elongation Calculation**: Calculates elongation for three actuators based on input values.

## Files

- `index.html`: HTML file containing the input form and script tags.
- `script.js`: JavaScript file with the form submission handler, calculation logic, and automatic input generation.

## Usage

1. **Open the HTML file**: Open `index.html` in your web browser.
2. **Enter Inputs Manually**:
    - Fill in the pitch, roll, and heave values in the input form.
    - Click the submit button to see the calculated elongations in the console.
3. **Automatic Input Generation**:
    - The script automatically generates random input values every second and logs the calculations to the console.

## Code Explanation

### Form Submission Handler

The form submission handler listens for the submit event on the form, prevents the default submission behavior, and extracts the input values for pitch, roll, and heave.

```javascript
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

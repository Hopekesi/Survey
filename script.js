document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.getElementById('addBtn');
  const removeBtn = document.getElementById('removeBtn');
  const solveBtn = document.getElementById('solveBtn');
  const inputsContainer = document.getElementById('inputsContainer');
  
  // Add new input field
  addBtn.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'number';
    input.className = 'input-field';
    input.placeholder = 'Area';
    inputsContainer.appendChild(input);
  });
  
  // Remove last input field
  removeBtn.addEventListener('click', () => {
    const inputs = document.querySelectorAll('.input-field');
    if (inputs.length > 0) {
      inputsContainer.removeChild(inputs[inputs.length - 1]);
    }
  });
  
  // Check all inputs have values
  solveBtn.addEventListener('click', () => {
    const inputs = document.querySelectorAll('.input-field');
    let allFilled = true;
    
    inputs.forEach(input => {
      if (input.value.trim() === '') {
        input.classList.add('empty-field');
        allFilled = false;
      } else {
        input.classList.remove('empty-field');
      }
    });
    
    if (allFilled) {
      solveVolume();
    } else {
      alert('Please fill all input fields!');
    }
  });
});



function solveVolume() {
  let Inputs = document.querySelectorAll('input');
  
  let areas = [];
  let ourLength = document.getElementById('length').value;
  
  
  
  Inputs.forEach(
    (input) => {
      areas.push(Number(input.value));
    }
    
  );
  
  
  const sum = arr => arr.reduce((a, b) => a + b, 0);
  
  function Volumes(Areas, Length) {
    // Get first and last elements
    const first = Areas[0];
    const last = Areas[Areas.length - 1];
    
    // Get even positions (assuming position starts at 1)
    // Exclude the last element from even positions
    const evenPositions = Areas.filter((_, index) =>
      (index + 1) % 2 === 0 && index !== Areas.length - 1
    );
    
    // Get remaining elements (not first, not last, not in evenPositions)
    const remaining = Areas.filter((_, index) =>
      index !== 0 &&
      index !== Areas.length - 1 &&
      (index + 1) % 2 !== 0
    );
    let Volume = {};
    Volume.endArea = Length * ((1 / 2) * (first + last) + sum(evenPositions) + sum(remaining));
    Volume.pris = Length * (1 / 3) * ((first + last) + (4 * sum(evenPositions)) + (2 * sum(remaining)));
    Volume.meanarea = Length * (sum(Areas) / Areas.length);
    
    
    Volume.endArea = Volume.endArea.toFixed(3);
    Volume.pris = Volume.pris.toFixed(3);
    Volume.meanarea = Volume.meanarea.toFixed(3);
    
    
    return Volume;
    
  }
  
  let volumeObj = Volumes(areas, ourLength);
  
  let output = document.getElementById('output');
  console.log(areas, ourLength);
  output.innerHTML = `Mean Area Volume = ${volumeObj.meanarea}<br> <br> End Area Volume= ${volumeObj.endArea} <br><br > Prismoidal Volume = ${volumeObj.pris} `;
  
  
}
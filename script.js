const startBtn = document.getElementById('startBtn');
const landing = document.querySelector('.landing');
const formSection = document.querySelector('.form-section');
const steps = document.querySelectorAll('.form-step');
const circles = document.querySelectorAll('.sidebar .circle');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const generateSection = document.getElementById('generateSection');
const progress = document.querySelector('.progress');
const progressText = document.querySelector('.progress-text');

let currentStep = 0;

startBtn.addEventListener('click', () => {
  landing.classList.add('hidden');
  formSection.classList.remove('hidden');
  updateForm();
});

nextBtn.addEventListener('click', () => {
  const currentInputs = steps[currentStep].querySelectorAll('input, textarea');
  let allFilled = true;
  currentInputs.forEach(input => {
    if (!input.value.trim()) {
      allFilled = false;
      input.style.border = '2px solid red';
    } else {
      input.style.border = '1px solid #ccc';
    }
  });

  if (allFilled && currentStep < steps.length - 1) {
    currentStep++;
    updateForm();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentStep > 0) {
    currentStep--;
    updateForm();
  }
});

function updateForm() {
  steps.forEach((step, index) => {
    step.classList.toggle('active', index === currentStep);
  });

  circles.forEach((circle, index) => {
    if (index <= currentStep) {
      circle.classList.add('active');
    } else {
      circle.classList.remove('active');
    }
  });

  const percent = ((currentStep) / (steps.length - 1)) * 100;
  progress.style.width = `${percent}%`;
  progressText.innerText = `${Math.round(percent)}%`;

  if (currentStep === steps.length - 1) {
    nextBtn.style.display = 'none';
    generateSection.classList.remove('hidden');
  } else {
    nextBtn.style.display = 'inline-block';
    generateSection.classList.add('hidden');
  }

  if (currentStep === 0) {
    prevBtn.style.display = 'none';
  } else {
    prevBtn.style.display = 'inline-block';
  }
}

document.getElementById('resumeForm').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Resume Generated Successfully! (Connect AI backend next 🚀)');
});

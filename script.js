document.addEventListener('DOMContentLoaded', function() {
  const landingPage = document.getElementById('landingPage');
  const formSection = document.getElementById('formSection');
  const startBtn = document.getElementById('startBtn');

  const steps = document.querySelectorAll('.form-step');
  const indicators = document.querySelectorAll('.step-indicator');
  const titles = document.querySelectorAll('.step-title');
  const progressFill = document.querySelector('.progress-fill');
  const progressText = document.getElementById('progress-percentage');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  const generateBtn = document.getElementById('generateBtn');
  const form = document.getElementById('resumeForm');

  let currentStep = 0;

  startBtn.addEventListener('click', () => {
    landingPage.classList.add('hidden');
    formSection.classList.remove('hidden');
    window.scrollTo(0, 0);
  });

  updateForm();

  nextBtn.addEventListener('click', () => {
    if (validateStep()) {
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

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (validateStep()) {
      // Collect all the form data
      const resumeData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        experience: document.getElementById('experience').value,
        education: document.getElementById('education').value,
        skills: document.getElementById('skills').value,
        certifications: document.getElementById('certifications').value
      };
  
      try {
        const response = await fetch('http://localhost:5000/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(resumeData)
        });
  
        const result = await response.json();
        console.log(result); // Optional: see the response from backend
        alert('Resume Generator is not live rn, Response Saved');
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error saving your resume.');
      }
    }
  });
  
  function validateStep() {
    const currentInputs = steps[currentStep].querySelectorAll('input[required], textarea[required]');
    let valid = true;

    currentInputs.forEach(input => {
      if (!input.value.trim()) {
        input.style.borderColor = 'var(--danger)';
        if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
          const error = document.createElement('div');
          error.classList.add('error-message');
          error.innerText = 'This field is required';
          input.insertAdjacentElement('afterend', error);
        }
        valid = false;
      } else {
        input.style.borderColor = 'var(--gray)';
        if (input.nextElementSibling && input.nextElementSibling.classList.contains('error-message')) {
          input.nextElementSibling.remove();
        }
      }
    });

    return valid;
  }

  function updateForm() {
    steps.forEach((step, index) => {
      step.classList.toggle('active', index === currentStep);
      indicators[index].classList.toggle('active', index <= currentStep);
      titles[index].classList.toggle('active', index <= currentStep);
    });

    let percent = Math.round((currentStep) / (steps.length - 1) * 100);
    progressFill.style.width = percent + '%';
    progressText.textContent = percent + '%';

    prevBtn.classList.toggle('hidden', currentStep === 0);
    nextBtn.classList.toggle('hidden', currentStep === steps.length - 1);
    generateBtn.classList.toggle('hidden', currentStep !== steps.length - 1);
  }
});

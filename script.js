document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('startBtn');
    const formSection = document.getElementById('form-section');
    const steps = document.querySelectorAll('.form-step');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const generateBtn = document.getElementById('generateBtn');
    const progressFill = document.querySelector('.progress-fill');
    const currentStepDisplay = document.getElementById('current-step-display');
    const currentStepText = document.getElementById('current-step');
    
    let currentStep = 0;
    const totalSteps = steps.length;
    
    // Initialize form
    updateForm();
    
    // Event Listeners
    startBtn.addEventListener('click', showForm);
    nextBtn.addEventListener('click', nextStep);
    prevBtn.addEventListener('click', prevStep);
    generateBtn.addEventListener('click', generateResume);
    
    // Functions
    function showForm() {
      formSection.classList.remove('hidden');
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
    
    function nextStep() {
      if (validateCurrentStep()) {
        if (currentStep < totalSteps - 1) {
          currentStep++;
          updateForm();
        }
      }
    }
    
    function prevStep() {
      if (currentStep > 0) {
        currentStep--;
        updateForm();
      }
    }
    
    function validateCurrentStep() {
      const currentStepEl = steps[currentStep];
      const inputs = currentStepEl.querySelectorAll('input[required], textarea[required]');
      let isValid = true;
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.style.borderColor = 'var(--danger)';
          isValid = false;
          
          // Add error message if not already present
          if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
            const errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            errorMsg.textContent = 'This field is required';
            errorMsg.style.color = 'var(--danger)';
            errorMsg.style.fontSize = '13px';
            errorMsg.style.marginTop = '5px';
            input.insertAdjacentElement('afterend', errorMsg);
          }
        } else {
          input.style.borderColor = 'var(--gray)';
          
          // Remove error message if exists
          if (input.nextElementSibling && input.nextElementSibling.classList.contains('error-message')) {
            input.nextElementSibling.remove();
          }
        }
      });
      
      return isValid;
    }
    
    function updateForm() {
      // Update active step
      steps.forEach((step, index) => {
        step.classList.toggle('active', index === currentStep);
      });
      
      // Update progress bar
      const progressPercent = (currentStep / (totalSteps - 1)) * 100;
      progressFill.style.width = `${progressPercent}%`;
      
      // Update step indicators
      currentStepDisplay.textContent = currentStep + 1;
      currentStepText.textContent = currentStep + 1;
      
      // Update navigation buttons
      if (currentStep === 0) {
        prevBtn.style.display = 'none';
      } else {
        prevBtn.style.display = 'flex';
      }
      
      if (currentStep === totalSteps - 1) {
        nextBtn.classList.add('hidden');
        generateBtn.classList.remove('hidden');
      } else {
        nextBtn.classList.remove('hidden');
        generateBtn.classList.add('hidden');
      }
    }
    
    function generateResume(e) {
      e.preventDefault();
      
      if (validateCurrentStep()) {
        // Collect form data
        const formData = {
          fullName: document.getElementById('fullName').value,
          email: document.getElementById('email').value,
          phone: document.getElementById('phone').value,
          summary: document.getElementById('summary').value,
          experience: document.getElementById('experience').value,
          education: document.getElementById('education').value,
          skills: document.getElementById('skills').value,
          certifications: document.getElementById('certifications').value
        };
        
        console.log('Form data collected:', formData);
        
        // In a real implementation we have to add backend rn
        // 1. Send data to backend
        // 2. Show loading state
        // 3. Redirect to preview page or show download options
        
        alert('This feature is not implemented yet. Form data collected in console.');
      }
    }
  });
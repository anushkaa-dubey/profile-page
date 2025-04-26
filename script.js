document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
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
    const totalSteps = steps.length;
    
    // Initialize form
    updateForm();
    
    // Event Listeners
    startBtn.addEventListener('click', showForm);
    nextBtn.addEventListener('click', nextStep);
    prevBtn.addEventListener('click', prevStep);
    generateBtn.addEventListener('click', generateResume);
    closeModal.addEventListener('click', hideModal);
    downloadPdf.addEventListener('click', downloadAsPdf);
    downloadDoc.addEventListener('click', downloadAsDoc);
    
    window.addEventListener('click', function(event) {
      if (event.target === previewModal) {
        hideModal();
      }
    });
    
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
          
          if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
            const errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            errorMsg.textContent = 'This field is required';
            input.insertAdjacentElement('afterend', errorMsg);
          }
        } else {
          input.style.borderColor = 'var(--gray)';
          
          if (input.nextElementSibling && input.nextElementSibling.classList.contains('error-message')) {
            input.nextElementSibling.remove();
          }
        }
      });
      
      return isValid;
    }
    
    function updateForm() {
      // Update active form step
      steps.forEach((step, index) => {
        step.classList.toggle('active', index === currentStep);
      });

      // Update sidebar indicators
      const stepIndicators = document.querySelectorAll('.step-indicator');
      stepIndicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentStep);
      });

      const stepTitles = document.querySelectorAll('.step-title');
      stepTitles.forEach((title, index) => {
        title.classList.toggle('active', index === currentStep);
      });

      // Update horizontal progress bar
      const progressPercent = (currentStep / (totalSteps - 1)) * 100;
      progressFill.style.width = `${progressPercent}%`;

      if (progressText) {
        progressText.textContent = `${Math.round(progressPercent)}%`;
      }

      // Update step count
      currentStepDisplay.textContent = currentStep + 1;
      currentStepText.textContent = currentStep + 1;

      // Update navigation buttons
      prevBtn.style.display = currentStep === 0 ? 'none' : 'flex';
      nextBtn.classList.toggle('hidden', currentStep === totalSteps - 1);
      generateBtn.classList.toggle('hidden', currentStep !== totalSteps - 1);
    }
    
    function generateResume(e) {
      e.preventDefault();
      
      if (validateCurrentStep()) {
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
        
        generatePreview(formData);
        showModal();
      }
    }
    
    function generatePreview(data) {
      const previewHTML = `
        <div class="resume-template">
          <header class="resume-header">
            <h1>${data.fullName}</h1>
            <div class="contact-info">
              <p>${data.email} | ${data.phone}</p>
            </div>
          </header>
          
          <section class="resume-section">
            <h2>Professional Summary</h2>
            <p>${data.summary}</p>
          </section>
          
          <section class="resume-section">
            <h2>Work Experience</h2>
            <div class="experience-content">${formatExperience(data.experience)}</div>
          </section>
          
          <section class="resume-section">
            <h2>Education</h2>
            <div class="education-content">${formatEducation(data.education)}</div>
          </section>
          
          <section class="resume-section">
            <h2>Skills</h2>
            <ul class="skills-list">${formatSkills(data.skills)}</ul>
          </section>
          
          <section class="resume-section">
            <h2>Certifications</h2>
            <div class="certifications-content">${formatCertifications(data.certifications)}</div>
          </section>
        </div>
      `;
      
      resumePreview.innerHTML = previewHTML;
    }
    
    function formatExperience(experience) {
      return experience.split('\n')
        .filter(entry => entry.trim() !== '')
        .map(entry => `<p>${entry}</p>`)
        .join('');
    }
    
    function formatEducation(education) {
      return education.split('\n')
        .filter(entry => entry.trim() !== '')
        .map(entry => `<p>${entry}</p>`)
        .join('');
    }
    
    function formatSkills(skills) {
      return skills.split(',')
        .map(skill => skill.trim())
        .filter(skill => skill !== '')
        .map(skill => `<li>${skill}</li>`)
        .join('');
    }
    
    function formatCertifications(certifications) {
      return certifications.split('\n')
        .filter(entry => entry.trim() !== '')
        .map(entry => `<p>${entry}</p>`)
        .join('');
    }
    
    function showModal() {
      previewModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
    
    function hideModal() {
      previewModal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
    
    function downloadAsPdf() {
      alert('PDF download functionality will be implemented here.');
    }
    
    function downloadAsDoc() {
      alert('Word document download functionality will be implemented here.');
    }
});

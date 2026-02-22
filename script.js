/* Menu Show Y Hidden */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.toggle('show-menu')
    })
}

/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/* Remove Menu Mobile */
const navLink = document.querySelectorAll('.nav-link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/* Change Background Header */
function scrollHeader(){
    const nav = document.querySelector('.navbar')
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/* Scroll Active Link */
// Note: This requires sections to have IDs matching the nav links
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 100; // Adjusted for fixed header
        const sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/* Glitch Text Rotator */
const glitchText = document.querySelector('.glitch-text');
if (glitchText) {
    const words = ["AI AGENTS", "MARKETING", "DEVELOPMENT", "SECURITY", "DESIGN"];
    let wordIndex = 0;
    
    setInterval(() => {
        wordIndex = (wordIndex + 1) % words.length;
        // Update both the content and the data attribute for the glitch effect
        glitchText.setAttribute('data-text', words[wordIndex]);
        glitchText.textContent = words[wordIndex];
    }, 3000);
}

/* Play Background Video on First Interaction */
const heroVideo = document.getElementById('hero-video');
if (heroVideo) {
    const playVideo = () => {
        heroVideo.play().then(() => {
            // Video started playing
        }).catch(error => {
            console.log("Video play failed:", error);
        });
        // Remove listeners after first interaction
        document.removeEventListener('click', playVideo);
        document.removeEventListener('touchstart', playVideo);
    };

    document.addEventListener('click', playVideo);
    document.addEventListener('touchstart', playVideo);
}

/* Services Scroll Effect */
const servicesTrack = document.querySelector('.services-scroll-track');
const serviceCards = document.querySelectorAll('.scroll-card');

if (servicesTrack && serviceCards.length > 0) {
    const totalCards = serviceCards.length;

    // Inject Scroll Indicator to each card
    serviceCards.forEach((card, index) => {
        // Skip adding to the last card
        if (index < totalCards - 1) {
            const indicator = document.createElement('div');
            indicator.className = 'scroll-indicator';
            indicator.innerHTML = '<i class="fas fa-chevron-down"></i>';
            card.appendChild(indicator);
        }
    });
    
    // Function to update active card
    const updateActiveCard = () => {
        const trackRect = servicesTrack.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const trackHeight = servicesTrack.offsetHeight;
        
        // The scrollable distance where the sticky effect happens is trackHeight - viewportHeight.
        // We want to map the scroll position within this range to the card index.
        
        // Calculate scroll progress relative to the start of the sticky section
        // When trackRect.top is 0, we are at the start.
        // When trackRect.bottom is viewportHeight, we are at the end.
        
        const scrollDistance = -trackRect.top;
        const totalScrollableDistance = trackHeight - viewportHeight;
        
        if (totalScrollableDistance <= 0) return; // Prevent division by zero if track is small
        
        let progress = scrollDistance / totalScrollableDistance;
        
        // Clamp progress
        progress = Math.max(0, Math.min(0.99, progress)); // 0.99 to ensure last card gets selected at end
        
        const activeIndex = Math.floor(progress * totalCards);
        
        serviceCards.forEach((card, index) => {
            if (index === activeIndex) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveCard);
    window.addEventListener('resize', updateActiveCard);
    
    // Initial call
    updateActiveCard();
}

/* Modal Logic */
const modalOverlay = document.getElementById('modal-overlay');
const btnFounder = document.getElementById('btn-founder');
const btnWorker = document.getElementById('btn-worker');
const modalFounder = document.getElementById('modal-founder');
const modalWorker = document.getElementById('modal-worker');
const closeButtons = document.querySelectorAll('.modal-close');
const formFounder = document.getElementById('form-founder');
const formWorker = document.getElementById('form-worker');

// Wizard Variables
let currentStep = 1;
const totalSteps = 5;

// Founder Wizard Variables
let currentStepFounder = 1;
const totalStepsFounder = 5;

function openModal(modal) {
    if (modalOverlay && modal) {
        modalOverlay.classList.add('active');
        // Hide all modal contents first
        document.querySelectorAll('.modal-content').forEach(c => c.classList.remove('active'));
        // Show specific modal content
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling

        // Reset Wizard if opening worker modal
        if (modal.id === 'modal-worker') {
            resetWizard();
        }
        
        // Reset Founder Wizard if opening founder modal
        if (modal.id === 'modal-founder') {
            resetWizardFounder();
        }
    }
}

function closeModal() {
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
        document.querySelectorAll('.modal-content').forEach(c => c.classList.remove('active'));
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Wizard Functions (Worker)
function resetWizard() {
    currentStep = 1;
    showStep(currentStep);
}

function showStep(step) {
    // Update Steps Visibility
    const steps = document.querySelectorAll('.wizard-step');
    steps.forEach(s => {
        s.classList.remove('active');
        if (parseInt(s.dataset.step) === step) {
            s.classList.add('active');
        }
    });

    // Update Progress Bar
    const progressBar = document.getElementById('progress-bar');
    const stepNum = document.getElementById('current-step-num');
    if (progressBar && stepNum) {
        const progress = (step / totalSteps) * 100;
        progressBar.style.width = `${progress}%`;
        stepNum.textContent = step;
    }

    // Update Buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');

    if (prevBtn && nextBtn && submitBtn) {
        // Prev Button
        if (step === 1) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'block';
        }

        // Next/Submit Buttons
    if (step === totalSteps) {
        if (nextBtn) nextBtn.style.display = 'none';
        if (submitBtn) submitBtn.style.display = 'block';
    } else {
        if (nextBtn) nextBtn.style.display = 'block';
        if (submitBtn) submitBtn.style.display = 'none';
    }
}
}

// Wizard Functions (Founder)
function resetWizardFounder() {
    currentStepFounder = 1;
    showStepFounder(currentStepFounder);
}

function showStepFounder(step) {
    // Update Steps Visibility
    const steps = document.querySelectorAll('.wizard-step-founder');
    steps.forEach(s => {
        s.classList.remove('active');
        if (parseInt(s.dataset.step) === step) {
            s.classList.add('active');
        }
    });

    // Update Progress Bar
    const progressBar = document.getElementById('progress-bar-founder');
    const stepNum = document.getElementById('current-step-num-founder');
    if (progressBar && stepNum) {
        const progress = (step / totalStepsFounder) * 100;
        progressBar.style.width = `${progress}%`;
        stepNum.textContent = step;
    }

    // Update Buttons
    const prevBtn = document.getElementById('prevBtnFounder');
    const nextBtn = document.getElementById('nextBtnFounder');
    const submitBtn = document.getElementById('submitBtnFounder');

    if (prevBtn && nextBtn && submitBtn) {
        // Prev Button
        if (step === 1) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'block';
        }

        // Next/Submit Buttons
    if (step === totalStepsFounder) {
        if (nextBtn) nextBtn.style.display = 'none';
        if (submitBtn) submitBtn.style.display = 'block';
    } else {
        if (nextBtn) nextBtn.style.display = 'block';
        if (submitBtn) submitBtn.style.display = 'none';
    }
}
}

function validateStep(step) {
    const activeStep = document.querySelector(`.wizard-step[data-step="${step}"]`);
    if (!activeStep) return true;

    const inputs = activeStep.querySelectorAll('input, select, textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (input.hasAttribute('required')) {
            if (input.type === 'checkbox') {
                if (!input.checked) {
                    isValid = false;
                    // Optional: Add visual feedback for checkbox
                }
            } else {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff4d4d'; // Red border
                    // Reset border on input
                    input.addEventListener('input', () => {
                        input.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                    }, { once: true });
                }
            }
        }
    });

    // Specific validation for Step 2 (Niches) - at least one checkbox
    if (step === 2) {
        const checkedNiches = activeStep.querySelectorAll('input[name="niche"]:checked');
        if (checkedNiches.length === 0) {
            isValid = false;
            alert("Please select at least one niche.");
        }
    }
    
    // Specific validation for Step 5 (Actions) - all required checkboxes
    if (step === 5) {
        const requiredCheckboxes = activeStep.querySelectorAll('input[type="checkbox"][required]');
        let allChecked = true;
        requiredCheckboxes.forEach(cb => {
            if (!cb.checked) {
                allChecked = false;
                // Add visual feedback
                cb.parentElement.style.color = '#ff4d4d';
                cb.addEventListener('change', () => {
                    cb.parentElement.style.color = ''; // Reset color on change
                }, { once: true });
            }
        });
        if (!allChecked) {
            isValid = false;
            alert("Please complete all required actions to submit your application.");
        }
    }

    return isValid;
}

function validateStepFounder(step) {
    const activeStep = document.querySelector(`.wizard-step-founder[data-step="${step}"]`);
    if (!activeStep) return true;

    const inputs = activeStep.querySelectorAll('input, select, textarea');
    let isValid = true;
    let missingField = false;

    inputs.forEach(input => {
        if (input.hasAttribute('required')) {
            if (input.type === 'radio') {
                // Radio buttons need special check (group check)
                const name = input.name;
                const isChecked = activeStep.querySelector(`input[name="${name}"]:checked`);
                if (!isChecked) {
                    isValid = false;
                    missingField = true;
                    // Visual feedback for radio group
                    const container = input.closest('.radio-list') || input.parentElement;
                    if (container) {
                        container.style.border = '1px solid #ff4d4d';
                        container.style.padding = '5px';
                        container.style.borderRadius = '4px';
                        // Remove style on change
                        const radios = activeStep.querySelectorAll(`input[name="${name}"]`);
                        radios.forEach(r => {
                            r.addEventListener('change', () => {
                                container.style.border = '';
                                container.style.padding = '';
                                container.style.borderRadius = '';
                            }, { once: true });
                        });
                    }
                }
            } else if (input.type === 'checkbox') {
                 if (!input.checked) {
                    isValid = false;
                    missingField = true;
                 }
            } else {
                if (!input.value.trim()) {
                    isValid = false;
                    missingField = true;
                    input.style.borderColor = '#ff4d4d'; // Red border
                    // Reset border on input
                    input.addEventListener('input', () => {
                        input.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                    }, { once: true });
                }
            }
        }
    });

    // Specific validation for Step 3 (Services) - at least one checkbox
    if (step === 3) {
        const checkedServices = activeStep.querySelectorAll('input[name="service"]:checked');
        if (checkedServices.length === 0) {
            isValid = false;
            alert("Please select at least one service needed.");
            return false;
        }
    }

    if (!isValid && missingField) {
        alert("Please fill in all required fields.");
    }

    return isValid;
}

// Wizard Event Listeners (Worker)
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        if (validateStep(currentStep)) {
            if (currentStep < totalSteps) {
                currentStep++;
                showStep(currentStep);
            }
        }
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
        }
    });
}

// Wizard Event Listeners (Founder)
const nextBtnFounder = document.getElementById('nextBtnFounder');
const prevBtnFounder = document.getElementById('prevBtnFounder');

if (nextBtnFounder) {
    nextBtnFounder.addEventListener('click', () => {
        if (validateStepFounder(currentStepFounder)) {
            if (currentStepFounder < totalStepsFounder) {
                currentStepFounder++;
                showStepFounder(currentStepFounder);
            }
        }
    });
}

if (prevBtnFounder) {
    prevBtnFounder.addEventListener('click', () => {
        if (currentStepFounder > 1) {
            currentStepFounder--;
            showStepFounder(currentStepFounder);
        }
    });
}

// Event Listeners for Open
if (btnFounder) {
    btnFounder.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(modalFounder);
    });
}

if (btnWorker) {
    btnWorker.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(modalWorker);
    });
}

// Event Listeners for Close
closeButtons.forEach(btn => {
    btn.addEventListener('click', closeModal);
});

// Close on overlay click
if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
}

// Escape key to close
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});



// Success Modal Logic
const modalSuccess = document.getElementById('modal-success');
const btnSuccessClose = document.getElementById('btn-success-close');

function showSuccessModal() {
    if (modalSuccess) {
        modalSuccess.classList.add('active');
        // Auto close after 3 seconds if user doesn't click
        // setTimeout(() => {
        //     modalSuccess.classList.remove('active');
        // }, 3000);
    }
}

if (btnSuccessClose) {
    btnSuccessClose.addEventListener('click', () => {
        if (modalSuccess) modalSuccess.classList.remove('active');
    });
}

// Close success modal on overlay click
if (modalSuccess) {
    modalSuccess.addEventListener('click', (e) => {
        if (e.target === modalSuccess) {
            modalSuccess.classList.remove('active');
        }
    });
}

// Form Submission - Founder
const submitBtnFounderGlobal = document.getElementById('submitBtnFounder');
if (submitBtnFounderGlobal) {
    submitBtnFounderGlobal.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent form submission if inside form
        
        // Final Validation
        if (!validateStepFounder(currentStepFounder)) return;

        // Step 1: Contact
        const telegram = document.getElementById('founder-telegram').value;
        const twitter = document.getElementById('founder-twitter').value;
        const email = document.getElementById('founder-email').value || 'N/A';
        
        // Step 2: Project
        const projectName = document.getElementById('founder-project-name').value;
        const website = document.getElementById('founder-website').value || 'N/A';
        const category = document.getElementById('founder-category').value;
        const description = document.getElementById('founder-description').value;

        // Step 3: Services
        const services = Array.from(document.querySelectorAll('input[name="service"]:checked'))
            .map(cb => cb.value)
            .join(', ');

        // Step 4: Budget & Outcome
        const budget = document.getElementById('founder-budget').value;
        const outcome = document.getElementById('founder-outcome').value;

        // Step 5: Timeline & Urgency
        const timeline = document.getElementById('founder-timeline').value;
        const urgency = document.querySelector('input[name="urgency"]:checked')?.value || 'N/A';
        
        const text = `🚀 *New Project Inquiry*\n\n` +
            `👤 *Contact Info*\n` +
            `• Telegram: ${telegram}\n` +
            `• X (Twitter): ${twitter}\n` +
            `• Email: ${email}\n\n` +
            `🏢 *Project Details*\n` +
            `• Name: ${projectName}\n` +
            `• Website: ${website}\n` +
            `• Category: ${category}\n` +
            `• About: ${description}\n\n` +
            `🛠 *Services Needed*\n${services || 'Not specified'}\n\n` +
            `💰 *Budget & Goals*\n` +
            `• Budget: ${budget}\n` +
            `• Goal: ${outcome}\n\n` +
            `⏳ *Timeline & Urgency*\n` +
            `• Timeline: ${timeline}\n` +
            `• Urgency: ${urgency}`;
            
        const encodedText = encodeURIComponent(text);
        // Founders go to xswapderadar
        const url = `https://t.me/xswapderadar?text=${encodedText}`;
        
        const win = window.open(url, '_blank');
        if (win) {
            win.focus();
            closeModal();
            showSuccessModal(); // Show success message
        } else {
            // Fallback if popup blocked: direct location change (though _blank is better for UX)
             window.location.href = url;
        }
    });
}

// Form Submission - Worker
const submitBtnWorkerGlobal = document.getElementById('submitBtn');
if (submitBtnWorkerGlobal) {
    submitBtnWorkerGlobal.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent form submission
        console.log("Worker submit button clicked");
        
        try {
            // Final Validation just in case
            if (!validateStep(currentStep)) {
                console.log("Validation failed on submit");
                return;
            }

            // Profile Details
            const twitter = document.getElementById('worker-twitter').value;
            const telegram = document.getElementById('worker-telegram').value;
            const email = document.getElementById('worker-email').value || 'N/A';
            const region = document.getElementById('worker-region').value;
            
            // Primary Niches
            const niches = Array.from(document.querySelectorAll('input[name="niche"]:checked'))
                .map(cb => cb.value)
                .join(', ');
                
            // Performance Snapshot
            const bestPost = document.getElementById('worker-best-post').value;
            const impressions = document.getElementById('worker-impressions').value;
            const engagement = document.getElementById('worker-engagement').value || 'N/A';
            const screenshot = document.getElementById('worker-screenshot').value || 'N/A';
            
            // Collaboration & Contribution
            const collab = document.getElementById('worker-collab').value;
            const contribution = document.getElementById('worker-contribution').value || 'N/A';

            // Construct Message
            const text = `🚀 *New Talent Application*\n\n` +
                `👤 *Profile Details*\n` +
                `• X (Twitter): ${twitter}\n` +
                `• Telegram: ${telegram}\n` +
                `• Email: ${email}\n` +
                `• Region: ${region}\n\n` +
                `🎯 *Primary Niches*\n${niches || 'None selected'}\n\n` +
                `📊 *Performance Snapshot*\n` +
                `• Best Post: ${bestPost}\n` +
                `• Avg Impressions: ${impressions}\n` +
                `• Engagement Rate: ${engagement}\n` +
                `• Screenshot: ${screenshot}\n\n` +
                `🤝 *Collaboration*: ${collab}\n\n` +
                `💡 *Contribution*: ${contribution}\n\n` +
                `✅ *Actions Completed*: Liked, Replied, Followed`;
                
            const encodedText = encodeURIComponent(text);
            // Workers go to Kseniaderadar
            const url = `https://t.me/Kseniaderadar?text=${encodedText}`;
            
            console.log("Opening Telegram and Success Modal");
            const win = window.open(url, '_blank');
            
            if (win) {
                win.focus();
                closeModal();
                showSuccessModal(); // Show success message
            } else {
                 // Fallback
                 window.location.href = url;
            }
        } catch (error) {
            console.error("Error in form submission:", error);
            alert("An error occurred while submitting the form. Please check the console.");
        }
    });
}

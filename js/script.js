// script.js - Main JavaScript File with Certificate Modal

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');

            // Toggle hamburger icon
            if (icon.classList.contains('fa-bars')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                if (icon.classList.contains('fa-times')) {
                    icon.classList.replace('fa-times', 'fa-bars');
                }
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate header height for offset
                const headerHeight = document.querySelector('header').offsetHeight;

                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header shadow on scroll
    window.addEventListener('scroll', function () {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        }
    });

    // Certificate Modal Functionality - UPDATED WITH CORRECT IMAGE PATHS
    const certificates = {
        'Apply AI: Update Your Resume': {
            title: 'Apply AI: Update Your Resume Certificate',
            description: 'Completed the DICT-ITU DTC Initiative course on applying AI techniques to enhance your resume and customize it for job applications',
            date: '2026',
            issuer: 'DICT-ITU DTC Initiative & Cisco Networking Academy',
            image: 'cert1.png.png', // Fixed path - use your exact file name
            verification: 'Certificate ID: DICT-ITU-AI-2026',
            holder: 'Aldrin Alcaide'
        },
        'Apply AI: Analyze Customer Reviews': {
            title: 'Apply AI: Analyze Customer Reviews Certificate',
            description: 'Completed the DICT-ITU DTC Initiative course on using AI to analyze and understand customer reviews and feedback',
            date: '2026',
            issuer: 'DICT-ITU DTC Initiative & Cisco Networking Academy',
            image: 'cert2.png', // Fixed path
            verification: 'Certificate ID: DICT-ITU-AI-CR-2026',
            holder: 'Aldrin Alcaide'
        },
        'AI Fundamentals with IBM SkillsBuild': {
            title: 'AI Fundamentals with IBM SkillsBuild Certificate',
            description: 'Completed AI fundamentals course through IBM SkillsBuild, covering basic AI concepts and applications',
            date: '2026',
            issuer: 'DICT-ITU DTC Initiative & IBM SkillsBuild',
            image: 'cert3.png', // Fixed path
            verification: 'Certificate ID: DICT-ITU-IBM-AI-2026',
            holder: 'Aldrin Alcaide'
        },
        'Data Privacy': {
            title: 'Data Privacy Certificate',
            description: 'Completed Data Privacy course focusing on protection of personal data.',
            date: '2026',
            issuer: 'DICT-ITU DTC Initiative',
            image: 'cert5.png',
            verification: 'Certificate ID: DATA-PRIVACY-2026',
            holder: 'Aldrin Alcaide'
        },

        'Digital Safety': {
            title: 'Digital Safety Certificate',
            description: 'Completed Digital Safety training covering cybersecurity awareness.',
            date: '2026',
            issuer: 'DICT-ITU DTC Initiative',
            image: 'cert6.png',
            verification: 'Certificate ID: DIGITAL-SAFETY-2026',
            holder: 'Aldrin Alcaide'
        },

        'Data Analytics': {
            title: 'Data Analytics Certificate',
            description: 'Completed Data Analytics training on data interpretation and visualization.',
            date: '2026',
            issuer: 'DICT-ITU DTC Initiative',
            image: 'cert4.png',
            verification: 'Certificate ID: DATA-ANALYTICS-2026',
            holder: 'Aldrin Alcaide'
        }
    };

    // Create certificate modal HTML
    const modalHTML = `
        <div class="certificate-modal" id="certificateModal">
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3 id="modalTitle">Certificate</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="certificate-image">
                        <img id="certificateImg" src="" alt="Certificate">
                        <div class="image-loading" id="imageLoading" style="display: none;">Loading certificate...</div>
                        <div class="image-error" id="imageError" style="display: none;">
                            <i class="fas fa-exclamation-triangle"></i>
                            <p>Certificate image could not be loaded</p>
                        </div>
                    </div>
                    <div class="certificate-details">
                        <div class="detail-item">
                            <h4>Certificate Holder</h4>
                            <p id="certificateHolder">Aldrin Alcaide</p>
                        </div>
                        <div class="detail-item">
                            <h4>Course</h4>
                            <p id="certificateCourse"></p>
                        </div>
                        <div class="detail-item">
                            <h4>Description</h4>
                            <p id="certificateDesc"></p>
                        </div>
                        <div class="detail-row">
                            <div class="detail-item">
                                <h4>Date Issued</h4>
                                <p id="certificateDate"></p>
                            </div>
                            <div class="detail-item">
                                <h4>Issued By</h4>
                                <p id="certificateIssuer"></p>
                            </div>
                        </div>
                        <div class="detail-item">
                            <h4>Verification</h4>
                            <p id="certificateVerification"></p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn" id="downloadBtn">
                        <i class="fas fa-download"></i> View Full Certificate
                    </button>
                    <button class="btn btn-outline" id="closeBtn">Close</button>
                </div>
            </div>
        </div>
    `;

    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Get modal elements
    const modal = document.getElementById('certificateModal');
    const modalTitle = document.getElementById('modalTitle');
    const certificateImg = document.getElementById('certificateImg');
    const imageLoading = document.getElementById('imageLoading');
    const imageError = document.getElementById('imageError');
    const certificateHolder = document.getElementById('certificateHolder');
    const certificateCourse = document.getElementById('certificateCourse');
    const certificateDesc = document.getElementById('certificateDesc');
    const certificateDate = document.getElementById('certificateDate');
    const certificateIssuer = document.getElementById('certificateIssuer');
    const certificateVerification = document.getElementById('certificateVerification');
    const downloadBtn = document.getElementById('downloadBtn');
    const closeModalBtn = document.querySelector('.close-modal');
    const closeBtn = document.getElementById('closeBtn');

    // Function to open certificate modal
    function openCertificateModal(certificateName) {
        console.log('Looking for certificate:', certificateName);

        const cert = certificates[certificateName];
        if (!cert) {
            console.error('Certificate not found:', certificateName);
            alert(`Certificate for "${certificateName}" is not available.`);
            return;
        }

        console.log('Found certificate:', cert);

        // Update modal content
        modalTitle.textContent = cert.title;
        certificateCourse.textContent = certificateName;
        certificateDesc.textContent = cert.description;
        certificateDate.textContent = cert.date;
        certificateIssuer.textContent = cert.issuer;
        certificateVerification.textContent = cert.verification;
        certificateHolder.textContent = cert.holder;

        // Show loading state
        certificateImg.style.display = 'none';
        imageLoading.style.display = 'block';
        imageError.style.display = 'none';

        // Load image with error handling
        const img = new Image();
        img.src = cert.image;
        img.alt = cert.title;

        img.onload = function () {
            certificateImg.src = cert.image;
            certificateImg.alt = cert.title;
            certificateImg.style.display = 'block';
            imageLoading.style.display = 'none';

            // Auto-resize large images
            if (img.naturalWidth > 800) {
                certificateImg.style.maxWidth = '100%';
                certificateImg.style.height = 'auto';
            }
        };

        img.onerror = function () {
            // If image fails to load, show error
            imageLoading.style.display = 'none';
            imageError.style.display = 'block';
            console.error(`Failed to load certificate image: ${cert.image}`);

            // Try alternative path
            const altImg = new Image();
            altImg.src = 'certificate/' + cert.image; // Try in certificate folder
            altImg.onload = function () {
                certificateImg.src = altImg.src;
                certificateImg.style.display = 'block';
                imageError.style.display = 'none';
            };
        };

        // Set download button to open image in new tab
        downloadBtn.onclick = function () {
            window.open(cert.image, '_blank');
        };

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Function to close modal
    function closeCertificateModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Add event listeners to certificate buttons
    document.querySelectorAll('.view-certificate').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const courseCard = this.closest('.course-card');
            const courseTitle = courseCard.querySelector('h3').textContent.trim();

            console.log('Opening certificate for:', courseTitle);
            openCertificateModal(courseTitle);
        });
    });

    // Close modal events
    closeModalBtn.addEventListener('click', closeCertificateModal);
    closeBtn.addEventListener('click', closeCertificateModal);

    // Close modal when clicking overlay
    modal.querySelector('.modal-overlay').addEventListener('click', closeCertificateModal);

    // Close modal with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeCertificateModal();
        }
    });

    // Portfolio item click handlers
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('click', function () {
            const title = this.querySelector('h3').textContent;
            console.log(`Portfolio item clicked: ${title}`);
        });
    });

    // Add active class to current navigation link
    function highlightCurrentSection() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');

        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop - 150) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Run on scroll
    window.addEventListener('scroll', highlightCurrentSection);

    // Run on page load
    highlightCurrentSection();
});
// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    initCurtain();
    initIntroOverlay();
    initBackgroundCanvas();
    initSidebarToggles();
    initCreationTool();
    initDatabase();
});

// ===================================
// CURTAIN INTERACTION
// ===================================
function initCurtain() {
    const curtainLeft = document.getElementById('curtainLeft');
    const curtainRight = document.getElementById('curtainRight');

    if (!curtainLeft || !curtainRight) return;

    let opened = false;
    let startX = null;
    let startY = null;
    const MOVE_THRESHOLD = 30; // px of movement required before opening

    // Wait 600ms after load before listening, so any phantom mousemove on load is ignored
    setTimeout(function() {
        document.addEventListener('mousemove', function onMove(e) {
            if (opened) return;

            if (startX === null) {
                startX = e.clientX;
                startY = e.clientY;
                return;
            }

            const dx = Math.abs(e.clientX - startX);
            const dy = Math.abs(e.clientY - startY);

            if (dx > MOVE_THRESHOLD || dy > MOVE_THRESHOLD) {
                opened = true;
                curtainLeft.classList.add('curtain-open');
                curtainRight.classList.add('curtain-open');
                document.removeEventListener('mousemove', onMove);
            }
        });
    }, 600);
}

// ===================================
// INTRO OVERLAY INTERACTION
// ===================================
function initIntroOverlay() {
    const overlay = document.getElementById('introOverlay');
    const motifs = document.querySelectorAll('.intro-motif');
    
    if (!overlay || motifs.length === 0) {
        console.log('No intro overlay found');
        return;
    }
    
    motifs.forEach(motif => {
        motif.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Motif clicked');
            
            // Add selected class
            this.classList.add('selected');
            
            // Disable all motifs
            motifs.forEach(m => {
                m.style.pointerEvents = 'none';
            });
            
            // Start fade out after animation
            setTimeout(() => {
                overlay.classList.add('fade-out');
                
                // Remove overlay completely
                setTimeout(() => {
                    if (overlay && overlay.parentNode) {
                        overlay.parentNode.removeChild(overlay);
                        console.log('Overlay removed');
                    }
                }, 1000);
            }, 800);
        });
    });
    
    // Logo refresh
    const logoLink = document.getElementById('logoLink');
    if (logoLink) {
        logoLink.addEventListener('click', function(e) {
            e.preventDefault();
            location.reload();
        });
    }
}

// ===================================
// BACKGROUND CANVAS ANIMATION
// ===================================
function initBackgroundCanvas() {
    const canvas = document.getElementById('backgroundCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.3 - 0.15;
            this.speedY = Math.random() * 0.3 - 0.15;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(27, 40, 56, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    function createParticles() {
        const particleCount = Math.floor((canvas.width * canvas.height) / 20000);
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        particles.forEach((particleA, indexA) => {
            particles.slice(indexA + 1).forEach(particleB => {
                const dx = particleA.x - particleB.x;
                const dy = particleA.y - particleB.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.strokeStyle = `rgba(27, 40, 56, ${0.1 * (1 - distance / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particleA.x, particleA.y);
                    ctx.lineTo(particleB.x, particleB.y);
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    createParticles();
    animate();
}

// ===================================
// SIDEBAR TOGGLES
// ===================================
function initSidebarToggles() {
    const appContainer = document.querySelector('.app-container');
    const iconButtons = document.querySelectorAll('.icon-btn[data-sidebar]');
    const closeBtns = document.querySelectorAll('.sidebar-close');
    const sidebarLeft = document.getElementById('sidebarLeft');
    const sidebarRight = document.getElementById('sidebarRight');
    const sidebarLeftContent = document.getElementById('sidebarLeftContent');
    const sidebarRightContent = document.getElementById('sidebarRightContent');
    
    let leftOpen = false;
    let rightOpen = false;
    
    // Sidebar content data
    const sidebarContent = {
        welcome: {
            side: 'left',
            content: `
                <h2>Welcome</h2>
                <p>This is an interactive archive exploring Syrian visual language through design systems and traditional motifs.</p>
                <h3>How It Works</h3>
                <p>1. Select motifs from below the canvas</p>
                <p>2. Click on the canvas to place them</p>
                <p>3. Drag to reposition motifs</p>
                <p>4. Right-click to delete</p>
                <p>5. Save your creation to the archive</p>
                <h3>Explore</h3>
                <p>Click the icons in the top-right to learn about Syrian design history, patterns, and cultural significance.</p>
            `
        },
        introduction: {
            side: 'right',
            content: `
                <h2>Introduction</h2>
                <p>Syrian visual motifs carry centuries of cultural memory, encoded in geometric patterns, architectural forms, and textile traditions.</p>
                <p>This interactive archive breaks down these visual motifs—their history, meaning, and design systems—to reimagine them within digital interfaces.</p>
                <h3>Our Goal</h3>
                <p>To preserve this art form in the digital age while fostering appreciation and education of Syrian culture.</p>
                <p>By synthesizing the breaking down of Syrian visual motifs, their history, meaning, and design systems, we develop a new visual logic rooted in cultural and contextual translation.</p>
            `
        },
        history: {
            side: 'left',
            content: `
                <h2>Historical Context</h2>
                <h3>Ancient Traditions</h3>
                <p>Syrian textile and architectural traditions span millennia, influenced by diverse cultures and trade routes.</p>
                <h3>Islamic Geometry</h3>
                <p>The integration of Islamic geometric principles created distinctive visual languages in architecture and design.</p>
                <h3>Regional Variations</h3>
                <p>Different regions developed unique pattern systems and motif vocabularies.</p>
                <h3>Contemporary Preservation</h3>
                <p>Today, these traditions face challenges of preservation and transmission to new generations. Digital tools offer new pathways.</p>
            `
        },
        patterns: {
            side: 'right',
            content: `
                <h2>Design Systems</h2>
                <h3>Geometric Principles</h3>
                <p>Syrian patterns follow mathematical principles of symmetry, repetition, and proportion.</p>
                <h3>Cultural Meaning</h3>
                <p>Each motif carries specific cultural significance and historical context.</p>
                <h3>Aghabani Textiles</h3>
                <p>Traditional embroidery patterns that encode regional identity and family heritage.</p>
                <h3>Architectural Motifs</h3>
                <p>Geometric designs found in mosques, palaces, and traditional homes throughout Syria.</p>
            `
        }
    };
    
    // Toggle sidebar
    iconButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const sidebarType = this.getAttribute('data-sidebar');
            const data = sidebarContent[sidebarType];
            
            if (!data) return;
            
            // Determine which sidebar to use
            const isLeft = data.side === 'left';
            const sidebar = isLeft ? sidebarLeft : sidebarRight;
            const content = isLeft ? sidebarLeftContent : sidebarRightContent;
            
            // Check if this sidebar is already showing this content
            const alreadyOpen = isLeft ? leftOpen : rightOpen;
            const sameContent = content.innerHTML.includes(data.content.substring(0, 20));
            
            if (alreadyOpen && sameContent) {
                // Close it
                if (isLeft) {
                    leftOpen = false;
                } else {
                    rightOpen = false;
                }
                updateSidebarClasses();
                btn.classList.remove('active');
            } else {
                // Open it with new content
                content.innerHTML = data.content;
                if (isLeft) {
                    leftOpen = true;
                } else {
                    rightOpen = true;
                }
                
                // Mobile: add active class
                if (window.innerWidth <= 768) {
                    sidebar.classList.add('active');
                }
                
                updateSidebarClasses();
                
                // Update button states
                iconButtons.forEach(b => {
                    if (b.getAttribute('data-sidebar')) {
                        b.classList.remove('active');
                    }
                });
                btn.classList.add('active');
            }
        });
    });
    
    // Close buttons
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const side = this.getAttribute('data-close');
            if (side === 'left') {
                leftOpen = false;
                sidebarLeft.classList.remove('active');
            } else {
                rightOpen = false;
                sidebarRight.classList.remove('active');
            }
            updateSidebarClasses();
            
            // Remove active from buttons
            iconButtons.forEach(b => b.classList.remove('active'));
        });
    });
    
    function updateSidebarClasses() {
        appContainer.classList.remove('sidebar-left-open', 'sidebar-right-open', 'both-open');
        
        if (leftOpen && rightOpen) {
            appContainer.classList.add('both-open');
        } else if (leftOpen) {
            appContainer.classList.add('sidebar-left-open');
        } else if (rightOpen) {
            appContainer.classList.add('sidebar-right-open');
        }
    }
}

// ===================================
// CREATION TOOL
// ===================================
let selectedMotif = null;

function initCreationTool() {
    const motifOptions = document.querySelectorAll('.motif-option');
    const canvasArea = document.getElementById('canvasArea');
    const clearButton = document.getElementById('clearCanvas');
    const saveButton = document.getElementById('saveCreation');
    const canvasInstructions = document.getElementById('canvasInstructions');
    
    // Motif selection
    motifOptions.forEach(option => {
        option.addEventListener('click', function() {
            motifOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            selectedMotif = this.getAttribute('data-motif');
        });
    });
    
    // Canvas click to add motif
    canvasArea.addEventListener('click', function(e) {
        if (selectedMotif && e.target === canvasArea) {
            if (canvasInstructions) {
                canvasInstructions.style.display = 'none';
            }
            
            const motifElement = createMotifElement(selectedMotif);
            const rect = canvasArea.getBoundingClientRect();
            const x = e.clientX - rect.left - 40;
            const y = e.clientY - rect.top - 40;
            
            motifElement.style.left = `${x}px`;
            motifElement.style.top = `${y}px`;
            
            canvasArea.appendChild(motifElement);
        }
    });
    
    // Clear canvas
    clearButton.addEventListener('click', () => {
        const motifs = canvasArea.querySelectorAll('.placed-motif');
        motifs.forEach(motif => motif.remove());
        if (canvasInstructions) {
            canvasInstructions.style.display = 'block';
        }
    });
    
    // Save creation
    saveButton.addEventListener('click', () => {
        saveCreation();
    });
}

function createMotifElement(motifType) {
    const motifElement = document.createElement('div');
    motifElement.className = 'placed-motif';
    motifElement.style.position = 'absolute';
    motifElement.style.width = '80px';
    motifElement.style.height = '80px';
    motifElement.style.cursor = 'move';
    
    const img = document.createElement('img');
    img.src = `icons/${motifType}.svg`;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'contain';
    img.style.pointerEvents = 'none';
    
    motifElement.appendChild(img);
    makeDraggable(motifElement);
    
    motifElement.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        motifElement.remove();
    });
    
    return motifElement;
}

function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    element.onmousedown = dragMouseDown;
    
    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    
    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        const parent = element.parentElement;
        let newTop = element.offsetTop - pos2;
        let newLeft = element.offsetLeft - pos1;
        
        newTop = Math.max(0, Math.min(newTop, parent.clientHeight - element.clientHeight));
        newLeft = Math.max(0, Math.min(newLeft, parent.clientWidth - element.clientWidth));
        
        element.style.top = newTop + "px";
        element.style.left = newLeft + "px";
    }
    
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// ===================================
// DATABASE (IndexedDB)
// ===================================
let db;

function initDatabase() {
    const request = indexedDB.open('SyrianDesignArchive', 1);
    
    request.onerror = function(event) {
        console.error('Database error:', event.target.error);
    };
    
    request.onsuccess = function(event) {
        db = event.target.result;
    };
    
    request.onupgradeneeded = function(event) {
        db = event.target.result;
        
        if (!db.objectStoreNames.contains('creations')) {
            const objectStore = db.createObjectStore('creations', { 
                keyPath: 'id', 
                autoIncrement: true 
            });
            objectStore.createIndex('timestamp', 'timestamp', { unique: false });
        }
    };
}

function saveToDatabase(imageData) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['creations'], 'readwrite');
        const objectStore = transaction.objectStore('creations');
        
        const creation = {
            image: imageData,
            timestamp: new Date().toISOString()
        };
        
        const request = objectStore.add(creation);
        
        request.onsuccess = function() {
            resolve();
        };
        
        request.onerror = function() {
            reject(request.error);
        };
    });
}

// ===================================
// SAVE CREATION
// ===================================
function saveCreation() {
    const canvasArea = document.getElementById('canvasArea');
    
    if (!canvasArea.querySelector('.placed-motif')) {
        alert('Please create a composition before saving');
        return;
    }
    
    html2canvas(canvasArea, {
        backgroundColor: '#ffffff',
        scale: 2
    }).then(canvas => {
        canvas.toBlob(blob => {
            const reader = new FileReader();
            reader.onloadend = function() {
                const imageData = reader.result;
                
                saveToDatabase(imageData)
                    .then(() => {
                        alert('Saved to archive! Redirecting...');
                        setTimeout(() => {
                            window.location.href = 'Archive/archive.html';
                        }, 1000);
                    })
                    .catch(error => {
                        console.error('Save failed:', error);
                        alert('Failed to save. Please try again.');
                    });
            };
            reader.readAsDataURL(blob);
        }, 'image/png');
    }).catch(error => {
        console.error('Canvas capture failed:', error);
        alert('Failed to capture creation. Please try again.');
    });
}
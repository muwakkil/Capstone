// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initDatabase();
});

// ===================================
// MOBILE MENU
// ===================================
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (!mobileMenuToggle || !mobileMenu) return;
    
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });
    
    mobileMenuClose.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });
    
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            mobileMenu.classList.remove('active');
        }
    });
}

// ===================================
// DATABASE
// ===================================
let db;

function initDatabase() {
    const request = indexedDB.open('SyrianDesignArchive', 1);
    
    request.onerror = function(event) {
        console.error('Database error:', event.target.error);
        showEmptyState();
    };
    
    request.onsuccess = function(event) {
        db = event.target.result;
        loadGallery();
        initClearArchive();
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

// ===================================
// LOAD GALLERY
// ===================================
function loadGallery() {
    const transaction = db.transaction(['creations'], 'readonly');
    const objectStore = transaction.objectStore('creations');
    const request = objectStore.getAll();
    
    request.onsuccess = function() {
        const creations = request.result;
        displayGallery(creations);
    };
    
    request.onerror = function() {
        console.error('Failed to load gallery');
        showEmptyState();
    };
}

function displayGallery(creations) {
    const galleryGrid = document.getElementById('galleryGrid');
    const emptyState = document.getElementById('emptyState');
    const creationCount = document.getElementById('creationCount');
    
    // Clear existing items
    galleryGrid.innerHTML = '';
    
    if (creations.length === 0) {
        showEmptyState();
        return;
    }
    
    // Hide empty state
    emptyState.classList.remove('visible');
    
    // Update count
    creationCount.textContent = creations.length;
    
    // Sort by timestamp (newest first)
    creations.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    // Create gallery items
    creations.forEach((creation, index) => {
        const item = createGalleryItem(creation, index);
        galleryGrid.appendChild(item);
    });
}

function createGalleryItem(creation, index) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.style.animationDelay = `${index * 0.1}s`;
    
    // Image
    const img = document.createElement('img');
    img.className = 'gallery-item-image';
    img.src = creation.image;
    img.alt = 'Archived creation';
    
    // Click to view in lightbox
    img.addEventListener('click', () => {
        showLightbox(creation.image);
    });
    
    // Info section
    const info = document.createElement('div');
    info.className = 'gallery-item-info';
    
    // Date
    const date = document.createElement('div');
    date.className = 'gallery-item-date';
    date.textContent = formatDate(creation.timestamp);
    
    // Actions
    const actions = document.createElement('div');
    actions.className = 'gallery-item-actions';
    
    // Download button
    const downloadBtn = document.createElement('button');
    downloadBtn.className = 'action-btn download';
    downloadBtn.innerHTML = '⬇';
    downloadBtn.title = 'Download';
    downloadBtn.addEventListener('click', () => {
        downloadImage(creation.image, `syrian-design-${creation.id}.png`);
    });
    
    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'action-btn delete';
    deleteBtn.innerHTML = '✕';
    deleteBtn.title = 'Delete';
    deleteBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this creation?')) {
            deleteCreation(creation.id);
        }
    });
    
    actions.appendChild(downloadBtn);
    actions.appendChild(deleteBtn);
    
    info.appendChild(date);
    info.appendChild(actions);
    
    item.appendChild(img);
    item.appendChild(info);
    
    return item;
}

// ===================================
// LIGHTBOX
// ===================================
function showLightbox(imageSrc) {
    // Create lightbox if it doesn't exist
    let lightbox = document.querySelector('.lightbox');
    
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        
        const content = document.createElement('div');
        content.className = 'lightbox-content';
        
        const img = document.createElement('img');
        img.className = 'lightbox-image';
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'lightbox-close';
        closeBtn.innerHTML = '×';
        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
        
        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'lightbox-download';
        downloadBtn.textContent = 'Download';
        downloadBtn.addEventListener('click', () => {
            downloadImage(img.src, 'syrian-design.png');
        });
        
        content.appendChild(closeBtn);
        content.appendChild(img);
        content.appendChild(downloadBtn);
        lightbox.appendChild(content);
        document.body.appendChild(lightbox);
        
        // Close on background click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                lightbox.classList.remove('active');
            }
        });
    }
    
    const img = lightbox.querySelector('.lightbox-image');
    img.src = imageSrc;
    lightbox.classList.add('active');
}

// ===================================
// UTILITY FUNCTIONS
// ===================================
function formatDate(timestamp) {
    const date = new Date(timestamp);
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
}

function downloadImage(dataUrl, filename) {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function showEmptyState() {
    const emptyState = document.getElementById('emptyState');
    const creationCount = document.getElementById('creationCount');
    
    if (emptyState) emptyState.classList.add('visible');
    if (creationCount) creationCount.textContent = '0';
}

// ===================================
// DELETE CREATION
// ===================================
function deleteCreation(id) {
    const transaction = db.transaction(['creations'], 'readwrite');
    const objectStore = transaction.objectStore('creations');
    const request = objectStore.delete(id);
    
    request.onsuccess = function() {
        loadGallery(); // Reload gallery
    };
    
    request.onerror = function() {
        console.error('Failed to delete creation');
        alert('Failed to delete creation. Please try again.');
    };
}

// ===================================
// CLEAR ARCHIVE
// ===================================
function initClearArchive() {
    const clearBtn = document.getElementById('clearArchive');
    
    if (!clearBtn) return;
    
    clearBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear the entire archive? This cannot be undone.')) {
            clearAllCreations();
        }
    });
}

function clearAllCreations() {
    const transaction = db.transaction(['creations'], 'readwrite');
    const objectStore = transaction.objectStore('creations');
    const request = objectStore.clear();
    
    request.onsuccess = function() {
        loadGallery(); // Reload gallery
    };
    
    request.onerror = function() {
        console.error('Failed to clear archive');
        alert('Failed to clear archive. Please try again.');
    };
}
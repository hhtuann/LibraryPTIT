// ===== UI Utilities =====

// Show alert message
function showAlert(message, type = 'info', container = null) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;

    if (container) {
        container.insertBefore(alertDiv, container.firstChild);
    } else {
        const mainContent = document.querySelector('.main-content') || document.querySelector('.auth-card');
        if (mainContent) {
            mainContent.insertBefore(alertDiv, mainContent.firstChild);
        }
    }

    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Show/hide loading
function showLoading(container) {
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="spinner"></div>';
    container.innerHTML = '';
    container.appendChild(loading);
}

function hideLoading(container) {
    const loading = container.querySelector('.loading');
    if (loading) {
        loading.remove();
    }
}

// Show empty state
function showEmptyState(container, message = 'Không có dữ liệu', icon = '📭') {
    container.innerHTML = `
        <div class="empty-state">
            <div style="font-size: 64px; margin-bottom: 20px;">${icon}</div>
            <h3>${message}</h3>
        </div>
    `;
}

// Format date
function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

function formatDateTime(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Get status badge
function getStatusBadge(status) {
    const statusMap = {
        'pending': { text: 'Chờ duyệt', class: 'badge-warning' },
        'approved': { text: 'Đã duyệt', class: 'badge-success' },
        'rejected': { text: 'Từ chối', class: 'badge-danger' },
        'returned': { text: 'Đã trả', class: 'badge-info' },
        'need_edit': { text: 'Cần chỉnh sửa', class: 'badge-warning' }
    };
    const info = statusMap[status] || { text: status, class: 'badge-secondary' };
    return `<span class="badge ${info.class}">${info.text}</span>`;
}

// Modal utilities
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
    }
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('show');
    }
});

// Pagination
function renderPagination(container, currentPage, totalPages, onPageChange) {
    if (totalPages <= 1) {
        container.innerHTML = '';
        return;
    }

    let html = '';

    // Previous button
    html += `<button ${currentPage === 1 ? 'disabled' : ''} data-page="${currentPage - 1}">«</button>`;

    // Page numbers
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
        html += `<button data-page="1">1</button>`;
        if (startPage > 2) {
            html += `<button disabled>...</button>`;
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        html += `<button data-page="${i}" class="${i === currentPage ? 'active' : ''}">${i}</button>`;
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            html += `<button disabled>...</button>`;
        }
        html += `<button data-page="${totalPages}">${totalPages}</button>`;
    }

    // Next button
    html += `<button ${currentPage === totalPages ? 'disabled' : ''} data-page="${currentPage + 1}">»</button>`;

    container.innerHTML = html;

    // Add event listeners
    container.querySelectorAll('button[data-page]').forEach(btn => {
        btn.addEventListener('click', () => {
            const page = parseInt(btn.dataset.page);
            if (!btn.disabled && page !== currentPage) {
                onPageChange(page);
            }
        });
    });
}

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Confirm dialog
function confirmAction(message) {
    return confirm(message);
}

// Export
window.showAlert = showAlert;
window.showLoading = showLoading;
window.hideLoading = hideLoading;
window.showEmptyState = showEmptyState;
window.formatDate = formatDate;
window.formatDateTime = formatDateTime;
window.getStatusBadge = getStatusBadge;
window.openModal = openModal;
window.closeModal = closeModal;
window.renderPagination = renderPagination;
window.debounce = debounce;
window.confirmAction = confirmAction;


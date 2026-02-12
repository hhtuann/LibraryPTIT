// API Base URL
const API_URL = '/api';

// Helper function để xử lý response
async function handleResponse(response) {
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.detail || 'Có lỗi xảy ra');
    }
    return data;
}

// Helper function để tạo headers với token
function getHeaders(includeAuth = true) {
    const headers = {
        'Content-Type': 'application/json'
    };
    if (includeAuth) {
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }
    return headers;
}

// ===== AUTH API =====
const authAPI = {
    async login(username, password) {
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);

        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });
        return handleResponse(response);
    },

    async register(userData) {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: getHeaders(false),
            body: JSON.stringify(userData)
        });
        return handleResponse(response);
    },

    async getMe() {
        const response = await fetch(`${API_URL}/auth/me`, {
            headers: getHeaders()
        });
        return handleResponse(response);
    }
};

// ===== BOOKS API =====
const booksAPI = {
    async getBooks(page = 1, pageSize = 10, search = '', category = '') {
        let url = `${API_URL}/books?page=${page}&page_size=${pageSize}`;
        if (search) url += `&search=${encodeURIComponent(search)}`;
        if (category) url += `&category=${encodeURIComponent(category)}`;

        const response = await fetch(url, {
            headers: getHeaders(false)
        });
        return handleResponse(response);
    },

    async getBook(bookId) {
        const response = await fetch(`${API_URL}/books/${bookId}`, {
            headers: getHeaders(false)
        });
        return handleResponse(response);
    },

    async getCategories() {
        const response = await fetch(`${API_URL}/books/categories`, {
            headers: getHeaders(false)
        });
        return handleResponse(response);
    },

    async createBook(bookData) {
        const response = await fetch(`${API_URL}/books`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(bookData)
        });
        return handleResponse(response);
    },

    async updateBook(bookId, bookData) {
        const response = await fetch(`${API_URL}/books/${bookId}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(bookData)
        });
        return handleResponse(response);
    },

    async deleteBook(bookId) {
        const response = await fetch(`${API_URL}/books/${bookId}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.detail || 'Có lỗi xảy ra');
        }
        return true;
    }
};

// ===== USERS API =====
const usersAPI = {
    async getUsers(page = 1, pageSize = 10, search = '', role = '') {
        let url = `${API_URL}/users?page=${page}&page_size=${pageSize}`;
        if (search) url += `&search=${encodeURIComponent(search)}`;
        if (role) url += `&role=${encodeURIComponent(role)}`;

        const response = await fetch(url, {
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    async getUser(userId) {
        const response = await fetch(`${API_URL}/users/${userId}`, {
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    async updateUser(userId, userData) {
        const response = await fetch(`${API_URL}/users/${userId}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(userData)
        });
        return handleResponse(response);
    },

    async resetPassword(userId, newPassword) {
        const response = await fetch(`${API_URL}/users/${userId}/reset-password`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({ new_password: newPassword })
        });
        return handleResponse(response);
    },

    async deleteUser(userId) {
        const response = await fetch(`${API_URL}/users/${userId}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.detail || 'Có lỗi xảy ra');
        }
        return true;
    }
};

// ===== WISHLIST API =====
const wishlistAPI = {
    async getWishlist() {
        const response = await fetch(`${API_URL}/wishlist`, {
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    async addToWishlist(bookId, quantity = 1) {
        const response = await fetch(`${API_URL}/wishlist`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ book_id: bookId, quantity })
        });
        return handleResponse(response);
    },

    async updateWishlistItem(bookId, quantity) {
        const response = await fetch(`${API_URL}/wishlist/${bookId}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({ quantity })
        });
        return handleResponse(response);
    },

    async removeFromWishlist(bookId) {
        const response = await fetch(`${API_URL}/wishlist/${bookId}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.detail || 'Có lỗi xảy ra');
        }
        return true;
    },

    async clearWishlist() {
        const response = await fetch(`${API_URL}/wishlist`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.detail || 'Có lỗi xảy ra');
        }
        return true;
    }
};

// ===== BORROWS API =====
const borrowsAPI = {
    async getBorrows(page = 1, pageSize = 10, status = '') {
        let url = `${API_URL}/borrows?page=${page}&page_size=${pageSize}`;
        if (status) url += `&status_filter=${encodeURIComponent(status)}`;

        const response = await fetch(url, {
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    async getBorrow(requestId) {
        const response = await fetch(`${API_URL}/borrows/${requestId}`, {
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    async createBorrow(note = '', items = null, dueDate = null) {
        const body = { note };
        if (items) body.items = items;
        if (dueDate) body.due_date = dueDate;

        const response = await fetch(`${API_URL}/borrows`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(body)
        });
        return handleResponse(response);
    },

    async updateBorrow(requestId, note, items, dueDate = null) {
        const body = { note, items };
        if (dueDate) body.due_date = dueDate;

        const response = await fetch(`${API_URL}/borrows/${requestId}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(body)
        });
        return handleResponse(response);
    },

    async approveBorrow(requestId, adminNote = '') {
        const response = await fetch(`${API_URL}/borrows/${requestId}/approve`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({ admin_note: adminNote })
        });
        return handleResponse(response);
    },

    async rejectBorrow(requestId, adminNote, requireEdit = false) {
        const response = await fetch(`${API_URL}/borrows/${requestId}/reject`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({ admin_note: adminNote, require_edit: requireEdit })
        });
        return handleResponse(response);
    },

    async returnBooks(requestId) {
        const response = await fetch(`${API_URL}/borrows/${requestId}/return`, {
            method: 'PUT',
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    async deleteBorrow(requestId) {
        const response = await fetch(`${API_URL}/borrows/${requestId}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.detail || 'Có lỗi xảy ra');
        }
        return true;
    }
};

// Export tất cả
window.authAPI = authAPI;
window.booksAPI = booksAPI;
window.usersAPI = usersAPI;
window.wishlistAPI = wishlistAPI;
window.borrowsAPI = borrowsAPI;


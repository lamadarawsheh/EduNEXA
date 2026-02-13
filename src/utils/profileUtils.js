/**
 * Profile Image Utilities
 */

export const resolveImageUrl = (value) => {
    if (!value || typeof value !== 'string') return null;
    const trimmed = value.trim();
    if (!trimmed || trimmed === 'null' || trimmed === 'undefined') return null;

    // Handling blob URLs (typically for local previews)
    if (trimmed.startsWith('blob:')) return trimmed;

    // Already proxied
    if (trimmed.startsWith('/proxy/') || trimmed.startsWith('proxy/')) {
        return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
    }

    // Handling absolute backend URLs
    if (trimmed.includes('edunexa.runasp.net')) {
        const rewritten = trimmed.replace(/https?:\/\/edunexa\.runasp\.net/, '/proxy');
        return rewritten;
    }

    // Handling other absolute URLs
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
        return trimmed;
    }

    // Handling relative paths from the backend (proxying them)
    return `/proxy/${trimmed.replace(/^\//, '')}`;
};

export const extractProfileData = (raw) => {
    if (!raw || typeof raw !== 'object') return null;
    if (Array.isArray(raw)) return raw[0];
    if (raw.$values && Array.isArray(raw.$values)) return raw.$values[0];
    if (raw.data) {
        if (Array.isArray(raw.data)) return raw.data[0];
        if (raw.data.$values && Array.isArray(raw.data.$values)) return raw.data.$values[0];
        return raw.data;
    }
    return raw;
};

export const getStoredProfileImage = () => {
    const stored = localStorage.getItem('profileImageUrl');
    if (stored && stored !== 'null' && stored !== 'undefined') return stored;

    try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const data = user.user || user;
        const raw = (
            data.imageUrl ||
            data.imageURL ||
            data.avatarUrl ||
            data.profileImage ||
            data.profileImageUrl ||
            data.avatar ||
            data.image ||
            ''
        );
        return resolveImageUrl(raw);
    } catch (e) {
        return null;
    }
};

export const getStoredDisplayName = (userData = null) => {
    try {
        const user = userData || JSON.parse(localStorage.getItem('user') || '{}');
        const data = user.user || user;
        return (
            data.fullName ||
            data.fullNameEn ||
            data.name ||
            data.userName ||
            data.username ||
            'Student Name'
        );
    } catch (e) {
        return 'Student Name';
    }
};

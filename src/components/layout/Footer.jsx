import React from 'react';

const Footer = () => {
    return (
        <footer style={{ padding: '2rem', borderTop: '1px solid #eee', marginTop: 'auto', textAlign: 'center' }}>
            <p>&copy; {new Date().getFullYear()} EduNEXA. All rights reserved.</p>
        </footer>
    );
};

export default Footer;

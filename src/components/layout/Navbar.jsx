import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={{ padding: '1rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/" style={{ fontWeight: 'bold', fontSize: '1.5rem', textDecoration: 'none', color: '#000' }}>EduNEXA</Link>
            <div>
                <Link to="/login" style={{ margin: '0 10px' }}>Login</Link>
            </div>
        </nav>
    );
};

export default Navbar;

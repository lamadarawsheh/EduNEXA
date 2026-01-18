import React from 'react';

const Login = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
            <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <h1 className="text-2xl font-semibold mb-6 text-center">Login to EduNEXA</h1>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-white/60 mb-1">Email</label>
                        <input type="email" className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent" placeholder="Enter your email" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white/60 mb-1">Password</label>
                        <input type="password" className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent" placeholder="Enter your password" />
                    </div>
                    <button className="w-full py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent/90 transition-colors">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;

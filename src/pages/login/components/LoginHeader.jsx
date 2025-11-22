import React from 'react';

const LoginHeader = () => {
    return (
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-green-400 mb-3 glitch-text">
                SmartMove
            </h1>
            <p className="text-green-300 text-sm leading-relaxed">
                A digital defense project designed to detect, prevent, and respond to phishing attacks
            </p>
            <style jsx>{`
                .glitch-text {
                    text-shadow: 0 0 10px #00ff00;
                    animation: glitch 5s infinite;
                }
                @keyframes glitch {
                    0%, 100% { 
                        transform: translate(0);
                        text-shadow: 0 0 10px #00ff00;
                    }
                    25% { 
                        transform: translate(-1px, 1px);
                        text-shadow: 2px 0 10px #00ff00, -2px 0 10px #00cc00;
                    }
                    50% { 
                        transform: translate(1px, -1px);
                        text-shadow: -2px 0 10px #00ff00, 2px 0 10px #00cc00;
                    }
                    75% { 
                        transform: translate(-1px, -1px);
                        text-shadow: 2px 0 10px #00cc00, -2px 0 10px #00ff00;
                    }
                }
            `}</style>
        </div>
    );
};

export default LoginHeader;
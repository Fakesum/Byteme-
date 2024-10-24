// VoiceButton.js
import React, { useEffect } from 'react';

const VoiceButton = ({ setter }) => {
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setter(transcript); // Set the recognized text using the setter
            };
            recognition.onerror = (event) => {
                console.error("Speech recognition error", event.error);
            };

            const startListening = () => {
                recognition.start();
            };

            // Add click event to the button
            const button = document.getElementById('voice-button');
            if (button) {
                button.addEventListener('click', startListening);
            }

            // Clean up event listener on unmount
            return () => {
                if (button) {
                    button.removeEventListener('click', startListening);
                }
            };
        }
    }, [setter]);

    return (
        <button id="voice-button" className="ml-2 p-2 bg-blue-500 text-white rounded-lg">
            🎤
        </button>
    );
};

export default VoiceButton;
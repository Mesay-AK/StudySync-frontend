import React, { useEffect, useState } from 'react';

function TypingParagraph({ text }) {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let index = 0;
        const typingInterval = setInterval(() => {
            setDisplayedText((prev) => prev + text[index]);
            index++;

            if (index === text.length) {
                clearInterval(typingInterval);
            }
        }, 100);

        return () => clearInterval(typingInterval);
    }, [text]); // Make sure to depend on `text`

    return (
        <div className="text-white text-2xl">
            <p>{displayedText}</p>
        </div>
    );
}

export default TypingParagraph;

import React, { useState, useCallback } from "react";

export function ReadMore({ maxLines = 10, children }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [lines, setLines] = useState(50);

    const buttonStyle = {
        padding: "10px 20px",
        border: "none",
        borderRadius: "20px",
        marginTop: "20px",
        fontSize: "15px",
        fontFamily: "Montserrat, sans-serif",
    };

    const handleRect = useCallback((node) => {
        const rects = node?.getClientRects();
        if (node !== null) {
            let count = 0;
            for (let i = 0; i < rects.length; i++) {
                if (rects[i - 1]) {
                    if (rects[i - 1].y !== rects[i].y) {
                        count++;
                    }
                } else {
                    count++;
                }
            }
            setLines(count);
        }
    }, []);

    function handleClick() {
        setIsExpanded((prev) => !prev);
    }
    return (
        <>
            <div
                style={{
                    display: "-webkit-box",
                    WebkitLineClamp: isExpanded ? "unset" : maxLines,
                    WebkitBoxOrient: "vertical",
                    lineClamp: isExpanded ? "unset" : maxLines,
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "pre-line",
                }}
            >
                <span ref={handleRect}>{children}</span>
            </div>
            {lines > maxLines ? (
                <button onClick={handleClick} style={buttonStyle}>
                    <p style={{ padding: 0, margin: 0 }}>
                        {isExpanded ? "Read Less" : "Read More"}
                    </p>
                </button>
            ) : null}
        </>
    );
}

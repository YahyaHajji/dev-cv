import React, { useEffect, useRef } from "react";

const AnimatedBackground = () => {
    const blobRefs = useRef([]);
    const initialPositions = [
        { x: -4, y: 0 },
        { x: -4, y: 0 },
        { x: 20, y: -8 },
        { x: 20, y: -8 },
    ];

    useEffect(() => {
        let currentScroll = 0;

        const updateBlobPositions = () => {
            const newScroll = window.pageYOffset;

            blobRefs.current.forEach((blob, index) => {
                if (!blob) return;

                const initialPos = initialPositions[index];
                const xOffset = Math.sin(newScroll / 100 + index * 0.5) * 340; // Horizontal movement
                const yOffset = Math.cos(newScroll / 100 + index * 0.5) * 40; // Vertical movement

                const x = initialPos.x + xOffset;
                const y = initialPos.y + yOffset;

                // Apply the calculated transform
                blob.style.transform = `translate(${x}px, ${y}px)`;
            });
        };

        const handleScroll = () => {
            // Throttle updates to animation frame for efficiency
            requestAnimationFrame(updateBlobPositions);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="fixed inset-0">
            <div className="absolute inset-0">
                {/* Blob 1 */}
                <div
                    ref={(ref) => (blobRefs.current[0] = ref)}
                    className="absolute top-0 -left-4 md:w-96 md:h-96 w-72 h-72 bg-[#009E66] rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20"
                ></div>
                {/* Blob 2 */}
                <div
                    ref={(ref) => (blobRefs.current[1] = ref)}
                    className="absolute top-0 -right-4 w-96 h-96 bg-[#00C77B] rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20 hidden sm:block"
                ></div>
                {/* Blob 3 */}		
                <div
                    ref={(ref) => (blobRefs.current[2] = ref)}
                    className="absolute -bottom-8 left-[-40%] md:left-20 w-96 h-96 bg-[#009E66] rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20"
                ></div>
                {/* Blob 4 */}
                <div
                    ref={(ref) => (blobRefs.current[3] = ref)}
                    className="absolute -bottom-10 right-20 w-96 h-96 bg-[#009E66] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 md:opacity-10 hidden sm:block"
                ></div>
            </div>
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00C77B10_1px,transparent_1px),linear-gradient(to_bottom,#00C77B10_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
    );
};

export default AnimatedBackground;

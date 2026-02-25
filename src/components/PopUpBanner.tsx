import { useState } from "react";

export const PopUpBanner = () => {
    const [show, setShow] = useState(true);

    if (!show) return null;
    // can close by click outside
    return (
        <>
            <div className="fixed bg-white p-3 inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 rounded-2xl overflow-hidden">
                <img loading="lazy" src="/maklumat.webp" alt="banner-popup" className="w-full h-full object-center rounded-md" />
                {/* <button onClick={() => setShow(false)} className="absolute top-2 right-2 bg-white rounded-full p-1 text-gray-500 hover:text-gray-700">X</button> */}
            </div>
            <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShow(false)}></div>
        </>
    );
}
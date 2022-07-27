import { useEffect, useRef } from "react";

export default function useScrollTop() {
    const ref = useRef(null)

    function scrollTop() {
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'
          });
    }

    useEffect(() => {
        ref.current.addEventListener("click", scrollTop)

        // return () => {
        //     ref.current.removeEventListener("click", scrollTop)
        // }
    }, [])

    return [ref]
}
import { useEffect } from "react";

const useOutsideClick = (ref, handleClose) => {
	useEffect(() => {
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				handleClose();
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ref]);
};

export default useOutsideClick;

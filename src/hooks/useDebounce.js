import { useEffect, useState } from "react";

const useDebounce = (value, delay) => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);
		return () => clearTimeout(timeout);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value, delay]);

	return debouncedValue;
};

export default useDebounce;

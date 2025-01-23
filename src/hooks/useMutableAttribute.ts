import { useState, useEffect } from 'react'

export const useMutableAttribute = (targetElement: HTMLElement, attr: string) => {
	const [attrValue, setAttrValue] = useState(targetElement.getAttribute(attr));

	useEffect(() => {
		const observer = new MutationObserver((mutationsList) => {
			for (const mutation of mutationsList) {
				if (mutation.type === 'attributes') {
					setAttrValue(targetElement.getAttribute(attr));
				}
			}
		});

		observer.observe(targetElement, {
			attributes: true,
			attributeFilter: [attr],
		});

		return () => {
			observer.disconnect();
		}
	}, [targetElement, attr]);

	return attrValue
}
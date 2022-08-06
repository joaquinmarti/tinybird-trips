const createSVGElement = (tagName: string): SVGElement => document.createElementNS("http://www.w3.org/2000/svg", tagName);

export default createSVGElement;
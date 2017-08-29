function buildPath(e) {
    let element = e.target;
    const path = [element];

    if (element === null || element.parentElement === null) {
        return [];
    }

    while (element.parentElement !== null) {
        element = element.parentElement;
        path.unshift(element);
    }

    return path;
}

export default function eventPath(e) {
    return e.path || (e.composedPath && e.composedPath()) || buildPath(e);
}

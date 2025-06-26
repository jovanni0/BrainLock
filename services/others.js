function renderKatexInElement(element)
{
    const textNodes = Array.from(element.querySelectorAll('*')).flatMap(node =>
        Array.from(node.childNodes).filter(n => n.nodeType === Node.TEXT_NODE)
    );

    for (const node of textNodes) {
        const text = node.textContent ?? '';
        const matches = [...text.matchAll(/\${1,2}([^$]+?)\${1,2}/g)];

        if (matches.length === 0) continue;

        const parent = node.parentElement;
        if (!parent) continue;

        // Split and replace math inline expressions
        let lastIndex = 0;
        const fragments = [];

        for (const match of matches) {
        const [fullMatch, content] = match;
        const start = match.index;
        const end = start + fullMatch.length;

        // Add preceding text
        if (start > lastIndex) {
            fragments.push(text.slice(lastIndex, start));
        }

        try {
            const span = document.createElement('span');
            span.innerHTML = katex.renderToString(content.trim(), {
            throwOnError: false,
            displayMode: fullMatch.startsWith('$$'),
            });
            fragments.push(span);
        } catch (e) {
            fragments.push(fullMatch); // fallback to raw text if parsing fails
        }

        lastIndex = end;
        }

        // Add remaining text
        if (lastIndex < text.length) {
        fragments.push(text.slice(lastIndex));
        }

        // Replace node with rendered elements
        for (const frag of fragments) {
        if (typeof frag === 'string') {
            parent.insertBefore(document.createTextNode(frag), node);
        } else {
            parent.insertBefore(frag, node);
        }
        }

        parent.removeChild(node);
    }
}


function applySyntaxHighlighting(container) 
{
}
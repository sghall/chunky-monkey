export function createNodesAndLinks(data) {
  const nodes = [];
  const links = [];
  const sizes = [Infinity, -Infinity];
  const names = [];

  function add(children, parent, chunkName) {
    for (let i = 0; i < children.length; i++) {
      const target = children[i];

      nodes.push(target);

      links.push({
        source: parent,
        target,
        chunkName
      });

      if (target.groups) {
        add(target.groups, target, chunkName);
      } else {
        if (target.statSize < sizes[0]) {
          sizes[0] = target.statSize;
        }

        if (target.statSize > sizes[1]) {
          sizes[1] = target.statSize;
        }
      }
    }
  }

  for (let i = 0; i < data.length; i++) {
    const chunk = data[i];
    nodes.push(chunk);
    names.push({ label: chunk.label, value: true });
    add(chunk.groups, chunk, chunk.label);
  }

  return {
    names,
    nodes,
    links,
    sizes
  };
}

// eslint-disable-next-line max-classes-per-file
class MenuItem {
  constructor(href, title, children) {
    this.href = href;
    this.title = title;
    this.id = (href + title).toLowerCase().replace("", "-");
    this.children = children;
  }
}

class Node {
  constructor(type, title, parent) {
    this.type = type;
    this.title = title;
    this.parent = parent;
  }
}

const pages = [
  // About us
  new Node("basic", "index", null),
  new Node("basic", "About", "index"),
  new Node("basic", "FAQs", "About"),
  new Node("basic", "Testimonials", "About"),
  new Node("basic", "COVID-19", "About"),
  // House Cleaning Services
  new Node("basic", "House Cleaning Services", "index"),
  new Node("basic", "Vacation Home Services", "House Cleaning Services"),
  new Node("basic", "Carpet Cleaning Services", "House Cleaning Services"),
  new Node("basic", "Snow Removal Services", "House Cleaning Services"),
  new Node("basic", "Handyman Services", "House Cleaning Services"),
  new Node("basic", "Laundry Services", "House Cleaning Services"),
  new Node("basic", "Move Out Cleaning", "House Cleaning Services"),
  new Node("basic", "Post Construction Cleaning", "House Cleaning Services"),
  // Commercial Cleaning Services
  new Node("basic", "Commercial Cleaning Services", "index"),
  new Node("basic", "Janitorial Services", "Commercial Cleaning Services"),
  new Node("basic", "Carpet Cleaning", "Commercial Cleaning Services"),
  new Node("basic", "Office Cleaning", "Commercial Cleaning Services"),
  new Node("basic", "Vinyl Composition Tile", "Commercial Cleaning Services"),
  new Node("basic", "Building Maintenance", "Commercial Cleaning Services"),
  // Service Areas
  new Node("basic", "Service Areas", "index"),
  new Node("basic", "Summit County", "Service Areas"),
  new Node("basic", "Eagle County", "Service Areas"),
];

const buildMenu = (pages) => {
  const indexPage = pages[0];
  const root = new MenuItem(indexPage.type, indexPage.title, []);
  const findParent = (root, node) => {
    if (root.title === node.parent) {
      return root;
    }
    for (const child of root.children) {
      const parent = findParent(child, node);
      if (parent !== null) {
        return parent;
      }
    }

    return null;
  };
  pages.slice(1).forEach((page) => {
    const parent = findParent(root, page);
    parent.children.push(new MenuItem(page.type, page.title, []));
  });
  return root;
};

export default buildMenu(pages);

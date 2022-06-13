class MenuItem {
  constructor(title, children) {
    this.title = title
    this.href = encodeURI(title).toLowerCase()
    this.id = this.href
    this.children = children
  }
}

class Node {
  constructor(type, title, parent) {
    this.type = type
    this.title = title
    this.parent = parent
  }
}

const pages = [
  new Node("basic", "index", null),
  new Node("basic", "About Us", "index"),
  new Node("basic", "FAQs", "About Us"),
  new Node("basic", "Testimonials", "About Us"),
  new Node("basic", "COVID-19", "About Us")
]

const buildMenu = pages => {
  const indexPage = pages[0]
  const root = new MenuItem(indexPage.title, [])
  const findParent = (root, node) => {
    if (root.title === node.parent) {
      return root
    } else {
      for (let child of root.children) {
        const parent = findParent(child, node)
        if (parent !== null) {
          return parent
        }
      }
    }
    return null
  }
  pages.slice(1).forEach(page => {
    const parent = findParent(root, page)
    parent.children.push(new MenuItem(page.title, []))
  })
  return root;
}

const myMenu = buildMenu(pages)

console.log(myMenu)



const menu = [
  {
    name: "About",
    id: 1,
    dropdownList: ["FAQs", "Testimonials", "COVID-19"],
    href: "/contact",
  },
  {
    name: "House Cleaning Services",
    id: 2,
    dropdownList: [
      "Vacation Home Services",
      "Carpet Cleaning Services",
      "Snow Removal Services",
      "Handyman Services",
      "Laundry Services",
      "Move Out Cleaning",
      "Post Construction Cleaning",
    ],
    href: "/contact",
  },
  {
    name: "Commercial Cleaning Services",
    id: 3,
    dropdownList: [
      "Janitorial Services",
      "Carpet Cleaning",
      "Office Cleaning",
      "Vinyl Composition Tile",
      "Building Maintenance",
    ],
    href: "/contact",
  },
  {
    name: "Service Areas",
    id: 4,
    dropdownList: ["Summit County", "Eagle County"],
    href: "/contact",
  },
];

export default menu;

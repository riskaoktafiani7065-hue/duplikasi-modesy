
import Image from "next/image";
import Link from "next/link";

type MenuGroup = {
  title: string;
  items: string[];
};

type FeaturedCategory = {
  title: string;
  image: string;
  category: string;
};

type MenuCategory =
  | "Clothing"
  | "Shoes"
  | "Home & Living"
  | "Jewelry & Accessories"
  | "Toys & Entertainment"
  | "Graphics & Photos"
  | "Video & Audio"
  | "Web Templates & Code";

type MegaMenuProps = {
  category: MenuCategory;
};

const menuData: Record<
  MenuCategory,
  { groups: MenuGroup[]; featured: FeaturedCategory[] }
> = {
  Clothing: {
    groups: [
      {
        title: "Women",
        items: [
          "Tops & T-Shirts",
          "Dresses",
          "Skirts",
          "Jeans",
          "Jackets & Coats",
          "Activewear",
        ],
      },
      {
        title: "Men",
        items: [
          "T-Shirts",
          "Shirts",
          "Jeans",
          "Pants",
          "Jackets",
          "Suits",
        ],
      },
      {
        title: "Kids",
        items: [
          "Girls Clothing",
          "Boys Clothing",
          "Baby Clothing",
          "Kids Shoes",
          "Accessories",
        ],
      },
    ],
    featured: [
      {
        title: "Women's Fashion",
        image:
          "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=500&q=80",
        category: "Women's Fashion",
      },
      {
        title: "Men's Fashion",
        image:
          "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=500&q=80",
        category: "Men's Fashion",
      },
      {
        title: "Kids Fashion",
        image:
          "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=500&q=80",
        category: "Kids Fashion",
      },
    ],
  },

  Shoes: {
    groups: [
      {
        title: "Women",
        items: [
          "Sneakers",
          "Heels",
          "Flats",
          "Sandals",
          "Boots",
          "Slippers",
        ],
      },
      {
        title: "Men",
        items: [
          "Sneakers",
          "Formal Shoes",
          "Loafers",
          "Boots",
          "Sandals",
          "Sports Shoes",
        ],
      },
      {
        title: "Kids",
        items: [
          "Girls Shoes",
          "Boys Shoes",
          "School Shoes",
          "Kids Sneakers",
          "Sandals",
          "Baby Shoes",
        ],
      },
    ],
    featured: [
      {
        title: "Women's Shoes",
        image:
          "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=500&q=80",
        category: "Women's Shoes",
      },
      {
        title: "Men's Shoes",
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80",
        category: "Men's Shoes",
      },
      {
        title: "Sneakers",
        image:
          "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=500&q=80",
        category: "Sneakers",
      },
    ],
  },

  "Home & Living": {
    groups: [
      {
        title: "Home Decor",
        items: ["Decorative Pillow", "Clocks", "Vases"],
      },
      {
        title: "Furniture",
        items: [
          "Living Room Furniture",
          "Dining Room Furniture",
        ],
      },
      {
        title: "Office",
        items: ["Office & School Supplies"],
      },
      {
        title: "Painting",
        items: ["Acrylic", "Watercolor", "Digital Prints"],
      },
      {
        title: "Outdoor & Gardening",
        items: ["Garden Decoration", "Plants"],
      },
    ],
    featured: [
      {
        title: "Home Decor",
        image:
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=500&q=80",
        category: "Home Decor",
      },
      {
        title: "Furniture",
        image:
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=500&q=80",
        category: "Furniture",
      },
      {
        title: "Outdoor Living",
        image:
          "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=500&q=80",
        category: "Outdoor & Gardening",
      },
    ],
  },

  "Jewelry & Accessories": {
    groups: [
      {
        title: "Bags & Purses",
        items: ["Backpacks", "Handbags"],
      },
      {
        title: "Necklaces & Accessories",
        items: ["Pendants", "Sun Hats", "Scarfs"],
      },
      {
        title: "Jewelry",
        items: ["Rings"],
      },
    ],
    featured: [
      {
        title: "Bags & Purses",
        image:
          "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500&q=80",
        category: "Bags & Purses",
      },
      {
        title: "Necklaces",
        image:
          "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=500&q=80",
        category: "Necklaces & Accessories",
      },
      {
        title: "Rings",
        image:
          "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=500&q=80",
        category: "Rings",
      },
    ],
  },

  "Toys & Entertainment": {
    groups: [
      {
        title: "Musical Instruments",
        items: ["Guitars", "Drums", "Stringed Instruments"],
      },
      {
        title: "Books",
        items: [
          "Art & Photography",
          "Books",
          "History Books",
          "Poetry Books",
          "Novels",
        ],
      },
      {
        title: "Video Games",
        items: ["Video Games"],
      },
      {
        title: "Magazines",
        items: [
          "Arts",
          "Music & Photography",
          "Fashion & Style",
        ],
      },
      {
        title: "Toys",
        items: [
          "Electronic Toys",
          "Dolls & Action Figures",
          "Puzzles",
        ],
      },
      {
        title: "Headphones",
        items: [
          "Over-Ear Headphones",
          "Earbud Headphones",
        ],
      },
      {
        title: "Movies",
        items: ["Movies & TV", "Blu-Ray"],
      },
    ],
    featured: [
      {
        title: "Musical Instruments",
        image:
          "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=500&q=80",
        category: "Musical Instruments",
      },
      {
        title: "Books",
        image:
          "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=500&q=80",
        category: "Books",
      },
      {
        title: "Toys & Games",
        image:
          "https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=500&q=80",
        category: "Toys",
      },
    ],
  },

  "Graphics & Photos": {
    groups: [
      {
        title: "Graphics",
        items: ["Icons", "Vectors", "Add-ons"],
      },
      {
        title: "Web Elements",
        items: ["Badges Stickers", "Banners Ads"],
      },
      {
        title: "Logos",
        items: ["Abstract", "Company", "Numbers", "Objects"],
      },
      {
        title: "Photos",
        items: [
          "Animals",
          "Architecture & Business",
          "Food & Health",
          "Sports & People",
          "Technology & Travel",
        ],
      },
    ],
    featured: [
      {
        title: "Graphics",
        image:
          "https://modesy.codingest.net/uploads/category/category_64fa33817aca32-54738529.webp",
        category: "Graphics",
      },
      {
        title: "Vectors",
        image:
          "https://modesy.codingest.net/uploads/category/category_64fa3439ef0fc1-66361806.webp",
        category: "Web Elements",
      },
      {
        title: "Banners Ads",
        image:
          "https://modesy.codingest.net/uploads/category/category_64fa344b5849c4-00906116.webp",
        category: "Logos",
      },
      {
        title: "Photos",
        image:
          "https://modesy.codingest.net/uploads/category/category_64fa33901418c3-36607181.webp",
        category: "Photos",
      },
    ],
  },

  "Video & Audio": {
    groups: [
      {
        title: "After Effects",
        items: [
          "Video Overlays & Elements",
          "Product Promo",
          "Video Displays",
        ],
      },
      {
        title: "Premiere Pro",
        items: [
          "Broadcast Packages",
          "Product Promo",
          "Video Displays",
        ],
      },
      {
        title: "Music",
        items: [
          "Ambient",
          "Cinematic Music",
          "Classical Music",
          "Corporate",
        ],
      },
      {
        title: "Sound Effects",
        items: [
          "Cartoon Sounds",
          "Domestic Sounds",
          "Futuristic Sounds",
          "Nature Sounds",
          "Human Sounds",
        ],
      },
    ],
    featured: [
      {
        title: "After Effects",
        image:
          "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=500&q=80",
        category: "After Effects",
      },
      {
        title: "Premiere Pro",
        image:
          "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=500&q=80",
        category: "Premiere Pro",
      },
      {
        title: "Music",
        image:
          "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=500&q=80",
        category: "Music",
      },
      {
        title: "Sound Effects",
        image:
          "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=500&q=80",
        category: "Sound Effects",
      },
    ],
  },

  "Web Templates & Code": {
    groups: [
      {
        title: "WordPress Templates",
        items: [
          "Blog & Magazine",
          "Directory & Listing",
          "Real Estate",
        ],
      },
      {
        title: "HTML Templates",
        items: ["Corporate", "Creative", "Other"],
      },
      {
        title: "PHP Scripts",
        items: [
          "eCommerce",
          "Miscellaneous",
          "Corporate",
          "Education",
        ],
      },
      {
        title: "Plugins",
        items: ["Widgets"],
      },
      {
        title: "JavaScript & CSS",
        items: ["Calendars", "Charts And Graphs"],
      },
    ],
    featured: [],
  },
};

export default function MegaMenu({ category }: MegaMenuProps) {
  const { groups, featured } = menuData[category];

  const isWebTemplates = category === "Web Templates & Code";

  const isFourColumn =
    category === "Graphics & Photos" ||
    category === "Video & Audio";

  return (
    <div className="invisible absolute left-1/2 top-full z-50 w-[min(1320px,calc(100vw-48px))] -translate-x-1/2 translate-y-2 border border-gray-100 bg-white opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
      <div className="grid grid-cols-12 gap-6 px-6 py-8">    
        <div
          className={`${
            isWebTemplates ? "col-span-12" : "col-span-7"
          } grid ${
            isWebTemplates
              ? "grid-cols-5 gap-x-8 gap-y-7"
              : isFourColumn
                ? "grid-cols-4 gap-x-6 gap-y-7"
                : "grid-cols-3 gap-x-6 gap-y-7"
          }`}
        >         
          {groups.map((group) => (
            <div key={group.title} className="min-w-0">
              <h3 className="mb-4 wrap-break-word text-sm font-semibold leading-5 text-[#222]">
                {group.title}
              </h3>

              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li key={`${group.title}-${item}`}>
                    <Link
                      href={`/products?category=${encodeURIComponent(item)}`}
                      className="block wrap-break-word text-[13px] leading-5 text-gray-500 transition hover:text-[#00a99d] focus-visible:text-[#00a99d]"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {!isWebTemplates && featured.length > 0 && (
          <div
            className={`col-span-5 grid gap-4 ${
              isFourColumn ? "grid-cols-4" : "grid-cols-3"
            }`}
          >
            {featured.map((item) => (
              <Link
                key={item.title}
                href={`/products?category=${encodeURIComponent(item.category)}`}
                className="group/featured block min-w-0"
              >
                <div className="relative aspect-3/4 overflow-hidden bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 30vw, 180px"
                    className="object-cover transition duration-300 group-hover/featured:scale-105"
                  />
                </div>

                <p className="mt-3 text-center text-xs font-medium text-[#333] transition group-hover/featured:text-[#00a99d]">
                  {item.title}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

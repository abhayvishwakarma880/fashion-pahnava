"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

// All Products Data
const allProducts = {
  women: [
    {
      id: 1,
      name: "Floral Print Maxi Dress",
      category: "Women's Wear",
      price: 1299,
      originalPrice: 1999,
      image: "https://i.pinimg.com/736x/64/4d/9f/644d9fef85e21ff063503a2a8badd86f.jpg",
      isNew: true,
      isTrending: true,
      description: "Elegant floral print maxi dress perfect for summer parties and casual outings.",
    },
    {
      id: 2,
      name: "Silk Saree with Border",
      category: "Ethnic Wear",
      price: 3499,
      originalPrice: 4999,
      image: "https://i.pinimg.com/474x/89/71/57/89715740b94af3e36559d2f82a82667b.jpg?nii=t",
      isNew: true,
      isTrending: true,
      description: "Pure silk saree with traditional border design perfect for weddings and special events.",
    },
    {
      id: 3,
      name: "Embroidered Kurti",
      category: "Women's Wear",
      price: 1499,
      originalPrice: 2199,
      image: "https://i.pinimg.com/originals/8a/db/d8/8adbd824b14afa78db10ca20ee454c18.jpg?nii=t",
      isNew: false,
      isTrending: true,
      description: "Handcrafted kurti with intricate embroidery work for festive celebrations.",
    },
    {
      id: 4,
      name: "Designer Anarkali Suit",
      category: "Women's Wear",
      price: 2799,
      originalPrice: 3999,
      image: "https://i.pinimg.com/736x/64/4d/9f/644d9fef85e21ff063503a2a8badd86f.jpg",
      isNew: true,
      isTrending: false,
      description: "Elegant Anarkali suit with beautiful embellishments and flowy fabric.",
    },
  ],
  men: [
    {
      id: 5,
      name: "Classic Linen Blazer",
      category: "Men's Wear",
      price: 2499,
      originalPrice: 3499,
      image: "https://avatars.mds.yandex.net/i?id=6b4fe474d3d57523827dc4e64ad530c730089dc7-16401366-images-thumbs&n=13",
      isNew: true,
      isTrending: false,
      description: "Premium linen blazer with perfect fit for formal occasions and business meetings.",
    },
    {
      id: 6,
      name: "Men's Sherwani Set",
      category: "Ethnic Wear",
      price: 3999,
      originalPrice: 5999,
      image: "https://i.pinimg.com/originals/8a/db/d8/8adbd824b14afa78db10ca20ee454c18.jpg?nii=t",
      isNew: true,
      isTrending: true,
      description: "Handcrafted sherwani with intricate embroidery for wedding celebrations.",
    },
    {
      id: 7,
      name: "Casual Polo T-Shirt",
      category: "Men's Wear",
      price: 899,
      originalPrice: 1299,
      image: "https://avatars.mds.yandex.net/i?id=6b4fe474d3d57523827dc4e64ad530c730089dc7-16401366-images-thumbs&n=13",
      isNew: false,
      isTrending: false,
      description: "Comfortable cotton polo t-shirt perfect for casual everyday wear.",
    },
    {
      id: 8,
      name: "Formal Slim Fit Shirt",
      category: "Men's Wear",
      price: 1199,
      originalPrice: 1699,
      image: "https://i.pinimg.com/736x/64/4d/9f/644d9fef85e21ff063503a2a8badd86f.jpg",
      isNew: true,
      isTrending: false,
      description: "Premium formal shirt with slim fit design for professional look.",
    },
  ],
  kids: [
    {
      id: 9,
      name: "Kids Printed T-Shirt",
      category: "Kids Wear",
      price: 599,
      originalPrice: 899,
      image: "https://img.joomcdn.net/a495c30124fc2ca0a8884a45c9b76afa32d9cbbb_original.jpeg",
      isNew: true,
      isTrending: false,
      description: "Comfortable cotton t-shirt with fun prints for your little ones.",
    },
    {
      id: 10,
      name: "Kids Party Wear Dress",
      category: "Kids Wear",
      price: 999,
      originalPrice: 1499,
      image: "https://i.pinimg.com/474x/89/71/57/89715740b94af3e36559d2f82a82667b.jpg?nii=t",
      isNew: true,
      isTrending: true,
      description: "Adorable party dress for kids with comfortable fabric and stylish design.",
    },
    {
      id: 11,
      name: "Kids Denim Jeans",
      category: "Kids Wear",
      price: 799,
      originalPrice: 1199,
      image: "https://i.pinimg.com/474x/f8/fe/a3/f8fea33af02a4ed02033f3dc97894b42.jpg?nii=t",
      isNew: false,
      isTrending: false,
      description: "Durable and comfortable denim jeans perfect for active kids.",
    },
    {
      id: 12,
      name: "Kids Ethnic Set",
      category: "Kids Wear",
      price: 1299,
      originalPrice: 1799,
      image: "https://img.joomcdn.net/a495c30124fc2ca0a8884a45c9b76afa32d9cbbb_original.jpeg",
      isNew: true,
      isTrending: false,
      description: "Beautiful ethnic set for kids perfect for festivals and family functions.",
    },
  ],
  accessories: [
    {
      id: 13,
      name: "Leather Crossbody Bag",
      category: "Accessories",
      price: 999,
      originalPrice: 1499,
      image: "https://n.cdn.cdek.shopping/images/shopping/Quwj4jC4nA0vI2Qk.jpg?v=1",
      isNew: true,
      isTrending: false,
      description: "Genuine leather crossbody bag with multiple compartments for daily use.",
    },
    {
      id: 14,
      name: "Silver Oxidized Jewelry Set",
      category: "Accessories",
      price: 799,
      originalPrice: 1299,
      image: "https://i.pinimg.com/736x/2a/bf/3b/2abf3bc87f9d23b6df616d9451e72815.jpg",
      isNew: true,
      isTrending: true,
      description: "Beautiful oxidized silver jewelry set with traditional Indian designs.",
    },
    {
      id: 15,
      name: "Designer Sunglasses",
      category: "Accessories",
      price: 1499,
      originalPrice: 2499,
      image: "https://n.cdn.cdek.shopping/images/shopping/Quwj4jC4nA0vI2Qk.jpg?v=1",
      isNew: false,
      isTrending: true,
      description: "Stylish designer sunglasses with UV protection for a chic look.",
    },
    {
      id: 16,
      name: "Premium Leather Belt",
      category: "Accessories",
      price: 699,
      originalPrice: 999,
      image: "https://i.pinimg.com/736x/2a/bf/3b/2abf3bc87f9d23b6df616d9451e72815.jpg",
      isNew: true,
      isTrending: false,
      description: "Premium quality leather belt with elegant buckle design.",
    },
  ],
};

type TabKey = keyof typeof allProducts;

export default function FeaturedCollection() {
  const [activeTab, setActiveTab] = useState<TabKey>("women");
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const productGridRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { id: "women", label: "Women" },
    { id: "men", label: "Men" },
    { id: "kids", label: "Kids" },
    { id: "accessories", label: "Accessories" },
  ];

  const currentProducts = allProducts[activeTab];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".product-card");
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("animate-in");
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleTabChange = (tabId: TabKey) => {
    if (tabId === activeTab || isAnimating) return;
    
    setIsAnimating(true);
    
    if (productGridRef.current) {
      const cards = productGridRef.current.querySelectorAll(".product-card");
      cards.forEach((card) => {
        card.classList.remove("animate-in");
        card.classList.add("animate-out");
      });
    }

    setTimeout(() => {
      setActiveTab(tabId);
      
      setTimeout(() => {
        if (productGridRef.current) {
          const newCards = productGridRef.current.querySelectorAll(".product-card");
          newCards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.remove("animate-out");
              card.classList.add("animate-in");
            }, index * 100);
          });
        }
        setIsAnimating(false);
      }, 100);
    }, 300);
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-[var(--surface)] relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[var(--highlight)] opacity-10 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[var(--accent)] opacity-10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[var(--primary)] bg-[var(--highlight)] dark:bg-[var(--highlight)]/20 px-4 py-2 rounded-full mb-4">
            ⭐ Featured Collection
          </span>
          <h2 className="font-[var(--font-playfair)] text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] mb-3">
            Trending <span className="text-[var(--primary)]">Collections</span>
          </h2>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto text-sm md:text-base">
            Discover handpicked styles from our latest collections
          </p>
        </div>

        {/* Tabs - No Icons */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-[var(--card)] border border-[var(--border)] rounded p-1.5 shadow-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id as TabKey)}
                className={`
                  px-6 md:px-8 py-2.5 md:py-3 rounded text-sm font-medium transition-all duration-300
                  ${activeTab === tab.id
                    ? "bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/30"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--highlight)]/10"
                  }
                `}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded">
                    {allProducts[tab.id as TabKey].length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid - 2 columns mobile, 4 columns desktop */}
        <div
          ref={productGridRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6"
        >
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="product-card opacity-0 transform translate-y-8 transition-all duration-500"
            >
              <div className="group relative bg-[var(--card)] rounded overflow-hidden border border-[var(--border)] hover:shadow-2xl hover:shadow-[var(--primary)]/5 transition-all duration-500 hover:-translate-y-1">
                
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-[var(--surface)]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />

                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1.5">
                    {product.isNew && (
                      <span className="bg-[var(--primary)] text-white text-[8px] md:text-[10px] font-bold px-2 py-0.5 md:py-1 rounded uppercase tracking-wider shadow-lg">
                        New
                      </span>
                    )}
                    {product.isTrending && (
                      <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-[8px] md:text-[10px] font-bold px-2 py-0.5 md:py-1 rounded uppercase tracking-wider shadow-lg">
                        Trending
                      </span>
                    )}
                  </div>

                  {/* Discount Badge */}
                  {product.originalPrice && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-[8px] md:text-[10px] font-bold px-2 py-0.5 md:py-1 rounded shadow-lg">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-2.5 md:p-4">
                  <div className="mb-0.5">
                    <p className="text-[8px] md:text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider font-medium">
                      {product.category}
                    </p>
                  </div>
                  <h3 className="text-xs md:text-sm font-semibold text-[var(--foreground)] mb-1 line-clamp-1 group-hover:text-[var(--primary)] transition-colors">
                    {product.name}
                  </h3>
                  
                  {/* Description - 2 lines */}
                  <p className="text-[10px] md:text-xs text-[var(--muted-foreground)] mb-1.5 md:mb-2 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-2.5">
                    <span className="text-sm md:text-base font-bold text-[var(--primary)] font-[var(--font-playfair)]">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-[10px] md:text-xs text-[var(--muted-foreground)] line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Book Now Button */}
                  <button className="w-full bg-[var(--primary)] text-white py-1.5 md:py-2 rounded text-[10px] md:text-xs font-medium hover:opacity-90 transition-all hover:shadow-lg hover:shadow-[var(--primary)]/30 transform hover:scale-[1.02] duration-300 flex items-center justify-center gap-1.5 md:gap-2 group">
                    <svg className="w-3 h-3 md:w-3.5 md:h-3.5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href={`/products?category=${activeTab}`}
            className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-[var(--primary)] text-[var(--primary)] rounded text-sm font-medium hover:bg-[var(--primary)] hover:text-white transition-all hover:shadow-lg hover:shadow-[var(--primary)]/20 transform hover:scale-105 duration-300"
          >
            View All {tabs.find(t => t.id === activeTab)?.label} Collection
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .product-card.animate-in {
          animation: fadeUp 0.6s ease forwards;
        }
        
        .product-card.animate-out {
          animation: fadeOut 0.3s ease forwards;
        }
        
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-10px);
          }
        }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
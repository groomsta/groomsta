'use client';

interface SubcategoryTabsProps {
    categories: { id: string; label: string }[];
    activeCategory: string;
    onSelect: (id: string) => void;
}

export default function SubcategoryTabs({
    categories,
    activeCategory,
    onSelect,
}: SubcategoryTabsProps) {
    return (
        <div className="flex overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
            <div className="flex gap-3">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => onSelect(cat.id)}
                        className={`
              whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border
              ${activeCategory === cat.id
                                ? 'bg-[#0C3C85] text-white border-[#0C3C85] shadow-md'
                                : 'bg-white text-gray-600 border-gray-200 hover:border-[#0C3C85] hover:text-[#0C3C85]'
                            }
            `}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

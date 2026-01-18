import { useState } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface FilterSection {
  title: string;
  key: string;
  options: { label: string; value: string; color?: string }[];
  type?: "checkbox" | "color";
}

const filterSections: FilterSection[] = [
  {
    title: "Fabric",
    key: "fabric",
    options: [
      { label: "Pure Cotton", value: "pure-cotton" },
      { label: "Cotton Silk", value: "cotton-silk" },
      { label: "Art Silk", value: "art-silk" },
      { label: "Silk Blend", value: "silk-blend" },
      { label: "Pure Silk", value: "pure-silk" },
    ],
  },
  {
    title: "Weave / Technique",
    key: "weave",
    options: [
      { label: "Ilkal Traditional", value: "ilkal-traditional" },
      { label: "Zari Border", value: "zari-border" },
      { label: "Tope Teni Pallu", value: "tope-teni" },
      { label: "Handloom", value: "handloom" },
      { label: "Jacquard", value: "jacquard" },
    ],
  },
  {
    title: "Color",
    key: "color",
    type: "color",
    options: [
      { label: "Red", value: "red", color: "#DC2626" },
      { label: "Maroon", value: "maroon", color: "#7F1D1D" },
      { label: "Green", value: "green", color: "#16A34A" },
      { label: "Blue", value: "blue", color: "#2563EB" },
      { label: "Black", value: "black", color: "#171717" },
      { label: "White", value: "white", color: "#FAFAFA" },
      { label: "Yellow", value: "yellow", color: "#EAB308" },
      { label: "Pink", value: "pink", color: "#EC4899" },
      { label: "Purple", value: "purple", color: "#9333EA" },
      { label: "Multicolor", value: "multicolor", color: "linear-gradient(135deg, #f87171, #fbbf24, #34d399, #60a5fa)" },
      { label: "Earth Tones", value: "earth", color: "#92400E" },
    ],
  },
  {
    title: "Border Type",
    key: "border",
    options: [
      { label: "Contrast Border", value: "contrast" },
      { label: "Temple Border", value: "temple" },
      { label: "Zari Border", value: "zari" },
      { label: "Self Border", value: "self" },
      { label: "Broad Border", value: "broad" },
      { label: "No Border", value: "none" },
    ],
  },
  {
    title: "Pallu Style",
    key: "pallu",
    options: [
      { label: "Tope Teni Pallu", value: "tope-teni" },
      { label: "Zari Pallu", value: "zari" },
      { label: "Simple Pallu", value: "simple" },
      { label: "Heavy Pallu", value: "heavy" },
    ],
  },
  {
    title: "Occasion",
    key: "occasion",
    options: [
      { label: "Daily Wear", value: "daily" },
      { label: "Office Wear", value: "office" },
      { label: "Festive Wear", value: "festive" },
      { label: "Wedding Wear", value: "wedding" },
      { label: "Traditional Events", value: "traditional" },
      { label: "Gifting", value: "gifting" },
    ],
  },
  {
    title: "Blouse Type",
    key: "blouse",
    options: [
      { label: "Running Blouse", value: "running" },
      { label: "Contrast Blouse", value: "contrast" },
      { label: "Attached Blouse Piece", value: "attached" },
    ],
  },
  {
    title: "Discount",
    key: "discount",
    options: [
      { label: "10% & Above", value: "10" },
      { label: "20% & Above", value: "20" },
      { label: "30% & Above", value: "30" },
      { label: "50% & Above", value: "50" },
    ],
  },
];

const pricePresets = [
  { label: "Below ₹2,000", min: 0, max: 2000 },
  { label: "₹2k - ₹5k", min: 2000, max: 5000 },
  { label: "₹5k - ₹10k", min: 5000, max: 10000 },
  { label: "Above ₹10k", min: 10000, max: 50000 },
];

interface ProductFiltersProps {
  selectedFilters: Record<string, string[]>;
  priceRange: [number, number];
  onFilterChange: (key: string, value: string, checked: boolean) => void;
  onPriceChange: (range: [number, number]) => void;
  onClearAll: () => void;
  onApply: () => void;
  onClose?: () => void;
  isMobile?: boolean;
}

const ProductFilters = ({
  selectedFilters,
  priceRange,
  onFilterChange,
  onPriceChange,
  onClearAll,
  onApply,
  onClose,
  isMobile = false,
}: ProductFiltersProps) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(["fabric", "color", "occasion"]);

  const toggleSection = (key: string) => {
    setExpandedSections((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const totalFilters = Object.values(selectedFilters).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  return (
    <div className={cn("bg-card h-full flex flex-col", isMobile && "pb-20")}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="font-display text-lg font-semibold">Filters</h2>
        {isMobile && onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Price Range */}
        <div className="space-y-4">
          <button
            onClick={() => toggleSection("price")}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="font-medium text-foreground">Price</h3>
            {expandedSections.includes("price") ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
          
          {expandedSections.includes("price") && (
            <div className="space-y-4 animate-fade-in">
              <div className="px-2">
                <Slider
                  value={[priceRange[0], priceRange[1]]}
                  min={0}
                  max={20000}
                  step={500}
                  onValueChange={(value) => onPriceChange([value[0], value[1]])}
                  className="w-full"
                />
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>₹{priceRange[0].toLocaleString()}</span>
                  <span>₹{priceRange[1].toLocaleString()}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {pricePresets.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => onPriceChange([preset.min, preset.max])}
                    className={cn(
                      "px-3 py-1.5 text-xs rounded-full border transition-colors",
                      priceRange[0] === preset.min && priceRange[1] === preset.max
                        ? "bg-gold text-foreground border-gold"
                        : "border-border hover:border-gold"
                    )}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Filter Sections */}
        {filterSections.map((section) => (
          <div key={section.key} className="space-y-3">
            <button
              onClick={() => toggleSection(section.key)}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="font-medium text-foreground">{section.title}</h3>
              {expandedSections.includes(section.key) ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>

            {expandedSections.includes(section.key) && (
              <div className={cn(
                "animate-fade-in",
                section.type === "color" ? "flex flex-wrap gap-2" : "space-y-2"
              )}>
                {section.options.map((option) => (
                  section.type === "color" ? (
                    <button
                      key={option.value}
                      onClick={() =>
                        onFilterChange(
                          section.key,
                          option.value,
                          !selectedFilters[section.key]?.includes(option.value)
                        )
                      }
                      className={cn(
                        "w-8 h-8 rounded-full border-2 transition-all",
                        selectedFilters[section.key]?.includes(option.value)
                          ? "border-gold ring-2 ring-gold/30 scale-110"
                          : "border-border hover:scale-105"
                      )}
                      style={{
                        background: option.color?.includes("gradient")
                          ? option.color
                          : option.color,
                      }}
                      title={option.label}
                    />
                  ) : (
                    <label
                      key={option.value}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <Checkbox
                        checked={selectedFilters[section.key]?.includes(option.value)}
                        onCheckedChange={(checked) =>
                          onFilterChange(section.key, option.value, checked as boolean)
                        }
                      />
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {option.label}
                      </span>
                    </label>
                  )
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-border bg-card space-y-3">
        {totalFilters > 0 && (
          <p className="text-sm text-muted-foreground text-center">
            {totalFilters} filter{totalFilters > 1 ? "s" : ""} applied
          </p>
        )}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClearAll}
            disabled={totalFilters === 0 && priceRange[0] === 0 && priceRange[1] === 20000}
          >
            Clear All
          </Button>
          <Button
            className="flex-1 bg-gold hover:bg-gold/90 text-foreground"
            onClick={onApply}
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;

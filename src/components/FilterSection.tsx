import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

interface FilterSectionProps {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}

const FilterSection = ({ title, options, selected, onToggle }: FilterSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-700">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map(option => (
          <label
            key={option}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/50 backdrop-blur-sm border border-gray-100 hover:bg-white/60 transition-colors"
          >
            <Checkbox
              checked={selected.includes(option)}
              onCheckedChange={() => onToggle(option)}
            />
            <span className="text-sm text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterSection;
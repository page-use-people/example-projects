export function SearchBar({ value, onChange }: { value: string; onChange: (value: string) => void }) {
    return (
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search groceries..."
            className="w-full border border-gray-300 px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-gray-500 focus:border-black focus:ring-2 focus:ring-black/20"
        />
    );
}

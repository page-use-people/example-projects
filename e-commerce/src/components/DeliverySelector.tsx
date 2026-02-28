import type { DeliveryOption } from '../hooks/useCart';

const options: { value: DeliveryOption; label: string; price: string }[] = [
    { value: 'regular', label: 'Regular Delivery - 2 hours', price: '$0.40' },
    { value: 'express', label: 'Express Delivery - 30 mins', price: '$1.00' },
];

export function DeliverySelector({
    delivery,
    onChange,
}: {
    delivery: DeliveryOption;
    onChange: (delivery: DeliveryOption) => void;
}) {
    return (
        <div className="space-y-2">
            <p className="text-sm font-medium text-black">Delivery</p>
            {options.map((opt) => (
                <label
                    key={opt.value}
                    className={`flex cursor-pointer items-center justify-between border border-gray-300 p-3 text-sm transition-colors ${
                        delivery === opt.value
                            ? 'bg-black text-white'
                            : 'bg-white hover:bg-gray-100'
                    }`}
                >
                    <div className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="delivery"
                            value={opt.value}
                            checked={delivery === opt.value}
                            onChange={() => onChange(opt.value)}
                            className="accent-black"
                        />
                        <span>{opt.label}</span>
                    </div>
                    <span className="font-medium">{opt.price}</span>
                </label>
            ))}
        </div>
    );
}

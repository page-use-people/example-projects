export function QuantityControls({
    quantity,
    onIncrement,
    onDecrement,
}: {
    quantity: number;
    onIncrement: () => void;
    onDecrement: () => void;
}) {
    return (
        <div className="inline-flex items-center gap-2">
            <button
                onClick={onDecrement}
                className="flex h-7 w-7 items-center justify-center border-2 border-black bg-white text-sm font-medium transition-colors hover:bg-black hover:text-white"
            >
                -
            </button>
            <span className="min-w-[1.5rem] text-center text-sm font-medium">{quantity}</span>
            <button
                onClick={onIncrement}
                className="flex h-7 w-7 items-center justify-center border-2 border-black bg-white text-sm font-medium transition-colors hover:bg-black hover:text-white"
            >
                +
            </button>
        </div>
    );
}

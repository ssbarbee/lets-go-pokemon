import Link from "next/link";
import { ArrowRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useRef } from "react";
import { EvolutionData } from "@/hooks/useEvolutionChain";

export interface EvolutionDrawerProps {
  evolutions: EvolutionData[];
  gradient: string;
  onClose: () => void;
}

export const EvolutionDrawer = ({ evolutions, gradient, onClose }: EvolutionDrawerProps) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!drawerRef.current) return;
    const deltaY = e.touches[0].clientY - startY.current;

    if (deltaY > 0) {
      drawerRef.current.style.transform = `translateY(${deltaY}px)`;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!drawerRef.current) return;
    const deltaY = e.changedTouches[0].clientY - startY.current;

    if (deltaY > 100) {
      onClose();
    } else {
      drawerRef.current.style.transform = "translateY(0)";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose}></div>

      <div
        ref={drawerRef}
        className={`relative bg-gradient-to-br ${gradient} rounded-t-2xl p-4 text-white h-1/3 w-full shadow-xl animate-slide-up`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Evolution Chain</h2>
          <button onClick={onClose} aria-label="Close Drawer">
            <XMarkIcon className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="flex gap-4 items-center overflow-x-auto pb-2">
          {evolutions.map((evo, index) => (
            <div data-testid={`evo-card-${evo.id}`} key={evo.id} className="flex items-center gap-4 px-1 py-2">
              <Link onClick={onClose} href={`/pokemon/${evo.id}`} className="flex-shrink-0 text-center">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-md hover:scale-105 transition overflow-hidden">
                  <img src={evo.sprite} alt={evo.name} className="w-full h-full object-contain" />
                </div>
                <span className="mt-1 block text-xs capitalize">{evo.name}</span>
              </Link>
              {index !== evolutions.length - 1 && <ArrowRightIcon className="w-5 h-5 text-white" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

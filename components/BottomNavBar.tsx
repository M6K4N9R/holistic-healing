'use client';  

import Link from 'next/link';
import { usePathname } from 'next/navigation';  
import { cn } from '@/lib/utils';  

const aboutPathnames = [
  '/treatments/ear-accupuncture',
  '/treatments/reiki',
  '/treatments/fussreflexzonenmassage',
  '/treatments/schropfen',
  '/treatments/blutegeltherapie',
  '/treatments/drip-infusion-therapy',
];

const BottomNavBar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  const isTreatmentsActive = aboutPathnames.includes(pathname);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50 shadow-2xl">
      <div className="flex justify-around items-center text-sm">
        <Link href="/" className={cn(
          'flex flex-col items-center p-2 rounded-lg transition-all',
          isActive('/') && 'text-emerald-600 font-bold scale-105'
        )}>
          <span className="text-2xl mb-1">🏠</span>
          <span>Home</span>
        </Link>
        
        <Link href="/treatments/ear-accupuncture" className={cn(
          'flex flex-col items-center p-2 rounded-lg transition-all',
          isTreatmentsActive && 'text-emerald-600 font-bold scale-105'
        )}>
          <span className="text-2xl mb-1">🌿</span>
          <span>Treatments</span>
        </Link>
        
        <Link href="/booking" className={cn(
          'flex flex-col items-center p-2 rounded-lg transition-all',
          isActive('/booking') && 'text-emerald-600 font-bold scale-105'
        )}>
          <span className="text-2xl mb-1">📅</span>
          <span>Book</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNavBar;

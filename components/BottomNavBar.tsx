'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/treatments/ear-accupuncture', label: 'Treatments', icon: '🌿', isGroup: true },
  { href: '/booking', label: 'Book', icon: '📅' },
];

const treatmentsPaths = [
  '/treatments/ear-accupuncture',
  '/treatments/reiki',
  '/treatments/fussreflexzonenmassage',
  '/treatments/schropfen',
  '/treatments/blutegeltherapie',
  '/treatments/drip-infusion-therapy',
];

const BottomNavBar = () => {
  const pathname = usePathname();

  const isActive = (href: string, isGroup?: boolean) => {
    if (isGroup) return treatmentsPaths.includes(pathname);
    return pathname === href;
  };

  return (
    <nav
      className={cn(
        'md:hidden fixed bottom-0 left-0 right-0 z-40',
        'bg-surface-variant/95 backdrop-blur-xl',
        'border-t border-outline-variant',
        'shadow-[0_-12px_30px_rgba(0,0,0,0.08)]'
      )}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex justify-around items-center px-4 py-2">
        {navItems.map((item) => {
          const active = isActive(item.href, item.isGroup);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl',
                'text-xs font-medium tracking-wide',
                'transition-all duration-200',
                active
                  ? 'bg-primary text-on-primary shadow-md scale-105'
                  : 'text-on-surface-variant hover:bg-surface hover:text-primary'
              )}
            >
              <span className="text-xl leading-none">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavBar;

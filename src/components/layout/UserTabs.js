'use client';
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function UserTabs({isAdmin}) {
  const path = usePathname();
  return (
    <div className="tabs inline-flex	 flex-col gap-4  text-sm ps-4		cursor-pointer	">
      <Link
        className={`hover:text-gray-300 ${path === '/my-account' ? 'active' : ''}`}
        href={'/my-account'}
      >
        My account
      </Link>
      {isAdmin && (
        <>
          <Link
            href={'/categories'}
            className={`hover:text-gray-300 ${path === '/categories' ? 'active' : ''}`}
          >
            Categories
          </Link>
          <Link
            href={'/menu-items'}
            className={`hover:text-gray-300 ${path.includes('menu-items') ? 'active' : ''}`}
          >
            Menu Items
          </Link>
          <Link
            className={`hover:text-gray-300 ${path.includes('/users') ? 'active' : ''}`}
            href={'/users'}
          >
            Users
          </Link>
        </>
      )}
      <Link
        className={`hover:text-gray-300 ${path === '/orders' ? 'active' : ''}`}
        href={'/orders'}
      >
        Orders
      </Link>
    </div>
  );
}
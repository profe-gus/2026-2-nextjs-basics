import { getPageNumbers } from '@/lib/student-list';
import Link from 'next/link';
import React from 'react'

type PaginatorProps = {
    basePath: string;
    page: number;
    totalPages: number;
    params?:  Record<string, string>
}

const baseClasses = `flex h-9 min-w-9 items-center 
justify-center rounded-lg 
px-3 text-sm font-medium 
transition-colors`

const linkClasses = `${baseClasses} border 
border-slate-300 bg-white 
text-slate-700 hover:bg-slate-100`;

const currentClasses = `${baseClasses} bg-blue-500 text-white`;
const disableClasses = `${baseClasses} border 
border-slate-200 bg-slate-100 text-slate-400`

function hrefFor(
    basePath: string, page: number, 
    params?: Record<string, string>){
        const query = new URLSearchParams(params);
        if(page > 1) query.set("page", String(page));
        const search = query.toString();
        return search ? `${basePath}?${search}` : basePath
}

export const Paginator = ( {basePath, page, totalPages, params = {}}: PaginatorProps) => {
  return (
    <nav className='flex items-center gap-1'>
        {
            page > 1 ? (
                <Link
                href={hrefFor(basePath, page -1, params)}
                aria-label='Previous page'
                className={linkClasses}
                >
                    {"<"}
                </Link>
            ) : 
            (
                <span className={disableClasses}>{"<"}</span>
            )
        }
        {
            getPageNumbers(page, totalPages).map((item, index) =>
                item === "..." ? (
                    <span key={`gap-${index}`} className='px-1 text-slate-400'>
                        ...
                    </span>
                ):
                (
                    <Link
                    key={item}
                    href={hrefFor(basePath, item, params)}
                    aria-label={`Page ${item}`}
                    aria-current={item === page ? "page" : undefined}
                    className={item === page ? currentClasses : linkClasses}>
                    {item}
                    </Link>
                )
            )
        }

        {
            page < totalPages ? (
                <Link
                href={hrefFor(basePath, page + 1, params)}
                aria-label='Next page'
                className={linkClasses}
                >
                    {">"}
                </Link>
            ) : 
            (
                <span className={disableClasses}>{">"}</span>
            )
        }
    </nav>
  )
}

import React from 'react'

type SectionProps = {
    id:string;
    title: string;
    children: React.ReactNode;
}

export const Section = ({id, title, children}: SectionProps) => {
  return (
    <section id={id} className="space-y-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        {children}
    </section>
  )
}

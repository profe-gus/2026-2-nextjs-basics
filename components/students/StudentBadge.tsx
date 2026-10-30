import React from 'react'

export const StudentBadge = ({active} : {active: boolean}) => {

const color = active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700";

  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${color}`}>
        { active ? "Active" : "Inactive" }
    </span>
  )
}

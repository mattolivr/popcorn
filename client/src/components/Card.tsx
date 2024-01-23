import React from "react"

type Props = {
    title: string,
    children: React.ReactNode
}

export default function Card({ title, children }: Props) {
    return (
        <div className=" bg-white px-4 py-2 rounded-md">
            <h1 className="text-2xl font-semibold">{ title }</h1>
            { children }
        </div>
    )
}
import React from "react"

type Props = {
    title: string,
    children: React.ReactNode,
    className?: string
}

export default function Card({ title, children, className }: Props) {
    return (
        <div className={"flex flex-col bg-white px-4 py-3 rounded-md " + className }>
            <h1 className="text-2xl font-semibold mb-2">{ title }</h1>
            { children }
        </div>
    )
}
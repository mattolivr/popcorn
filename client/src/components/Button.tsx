import { Link } from "react-router-dom"

type Props = {
    color?: string,
    children: React.ReactNode,
    secundary?: boolean,
    link?: string
}

export default function Button(props: Props) {
    if (props.link) {
        return (
            <Link to={props.link} className={getClassName(props)}>{ props.children }</Link>
        )
    }
    return (
        <button className={getClassName(props)}>{ props.children }</button>
    )
}

function getClassName(props: Props): string {
    return "text-center font-semibold rounded-2xl px-1 py-2 w-full " + getColor(props)
}

function getColor(props: Props): string {
    return ""
}
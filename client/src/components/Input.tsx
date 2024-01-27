import { IconType } from "react-icons"

type Props = {
    label?: string,
    type: "text" | "password" | "number" | "integer" | "date",
    ref?: React.MutableRefObject<HTMLInputElement | null>
    hint?: string,
    action?: Action,
    icon?: IconType
}

type Action = { name: string, function: () => void }

export default function BaseInput(props: Props) {
    return (
        <>
            <div className="relative flex w-full">
                { props.label }
            </div>
        </>
    )
}
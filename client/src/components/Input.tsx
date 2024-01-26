import { Button, Input, Typography } from "@material-tailwind/react"
import { IconType } from "react-icons"
import { FaAt, FaCircleInfo } from "react-icons/fa6"

type Props = {
    label?: string,
    type: InputType,
    ref?: React.MutableRefObject<HTMLInputElement | null>
    hint?: string,
    action?: Action,
    icon?: IconType
}

type Action = { name: string, function: () => void }

export enum InputType {
    TEXT, INTEGER, NUMBER, PASSWORD, EMAIL
}

export default function BaseInput(props: Props) {
    return (
        <>
            <div className="relative flex w-full">
                <Input
                    label={props.label}
                    crossOrigin={null}
                    icon={getTypeIcon(props.type)}
                />
                <ActionButton action={props.action}></ActionButton>
            </div>
            <Hint text={props.hint} />
        </>
    )
}

function ActionButton({ action }: { action?: Action }) {
    if (action) {
        return (
            <Button
                size="sm"
                placeholder={null}
                className="!absolute right-1 top-1 rounded"
            >
                { action.name }
            </Button>
        )
    }
}

function Hint({ text }: { text?: string }) {
    if (text) {
        return (
            <Typography
                variant="small"
                placeholder={null}
                className="mt-1 flex items-center gap-1 font-medium text-blue-gray-600"
            >
                <FaCircleInfo />
                {text}
            </Typography>
        )
    }
}

function getTypeIcon(type: InputType) {
    switch (type) {
        case InputType.EMAIL: return (<FaAt />)
    }
}
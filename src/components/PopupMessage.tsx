import Button from "./Button"

export interface PopupMessageProps {
    message?: string
    children?: React.ReactNode
    onOk?: () => void
    onCancel?: () => void
    onYes?: () => void
    onNo?: () => void
}


export function PopupMessage(
    {
        message,
        children,
        onOk,
        onCancel,
        onYes,
        onNo
    }: PopupMessageProps)
{
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-10 bg-outset" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col p-6 gap-4 min-w-1/4 bg-bgdark shadow-lg rounded-2xl">
                { message && <div>{message}</div> }
                { children && <div>{children}</div> }
                <div className="flex flex-row justify-around gap-8">
                    { onCancel && <Button onClick={onCancel} text="Cancel" className="bg-bglight" /> }
                    { onNo && <Button onClick={onNo} text="No" className="bg-bglight" /> }
                    { onOk && <Button primary onClick={onOk} text="Ok" className="bg-bglight" /> }
                    { onYes && <Button primary onClick={onYes} text="Yes" className="bg-bglight" /> }
                </div>
            </div>
        </div>
    )
}
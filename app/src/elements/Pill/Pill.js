export default function Pill({text, clickHandler, classes}) {
    return (
        <div className = {`rounded-full leading-none px-2 mr-2 flex justify-center items-center max-w-96 ${classes}`}>
            <span className = "whitespace-nowrap leading-none p-1 text-white">
                { text }
            </span>
            <span 
                className = "ml-2 relative justify-center items-center cursor-pointer hover:scale-[1.2] hover:bg-[#bbb] border-[#ffffff23] border-[1px] leading-none p-1 rounded-full bg-[#aaaaaa] h-3 w-3"
                onClick = {()=>clickHandler()}
            >
                <div className = "absolute top-[1px] left-[4px] h-2 rounded-md rotate-45 w-[2px] bg-white" />
                <div className = "absolute top-[1px] left-[4px] h-2 rounded-md rotate-[315deg] w-[2px] bg-white" />
            </span>
        </div>
    )
}

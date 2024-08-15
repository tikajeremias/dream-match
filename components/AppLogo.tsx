export default function AppLogo() {
    const goldFont = 'text-transparent font-extrabold bg-gradient-to-r from-gradient-a to-gradient-b bg-clip-text'
    return (
        <h1 className="font-bold flex text-neutral-100 text-5xl lg:text-8xl">
            <p className={goldFont}>D</p>
            ream
            <p className={goldFont}>M</p>
            atch
        </h1>
    )
}
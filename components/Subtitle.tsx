export default function Subtitle(props: { text: string }) {
    return (
        <p className="text-neutral-100 font-light mb-2 text-xl lg:text-xl">{props.text}</p>
    )
}
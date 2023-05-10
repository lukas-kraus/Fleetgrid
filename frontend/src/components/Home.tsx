type Props = {
    user: string | undefined
}

export default function Home(props: Props) {
    return (
        <div>
            <h1>Hi {props.user}!</h1>
        </div>
    )
}
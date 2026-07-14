import { Chapters, Container, Counter, Footer, Timeline } from "./components";

export function Home() {
    return (
        <Container>
            <Counter />
            <Timeline />
            <Chapters />
            <Footer />
        </Container>
    );
}

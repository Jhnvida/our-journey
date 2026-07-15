import { Container } from "../../components/Container";
import { Chapters, Counter, Footer, Timeline } from "./components";

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

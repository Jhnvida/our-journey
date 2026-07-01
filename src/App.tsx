import { Container } from "./components/Container";
import { Counter } from "./components/Counter";
import { Timeline } from "./components/Timeline";
import { Chapters } from "./components/Chapters";
import { Footer } from "./components/Footer";

export function App() {
    return (
        <Container>
            <Counter />
            <Timeline />
            <Chapters />
            <Footer />
        </Container>
    );
}

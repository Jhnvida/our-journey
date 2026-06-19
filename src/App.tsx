import { Content } from "./components/Content";
import { Counter } from "./components/Counter";
import { Timeline } from "./components/Timeline";
import { Chapters } from "./components/Chapters";

export function App() {
    return (
        <Content>
            <Counter />
            <Timeline />
            <Chapters />
        </Content>
    );
}

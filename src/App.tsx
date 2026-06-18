import { Content } from "./components/Content";
import { Counter } from "./components/Counter";
import { Timeline } from "./components/Timeline";

export function App() {
    return (
        <Content>
            <Counter />
            <Timeline />
        </Content>
    );
}

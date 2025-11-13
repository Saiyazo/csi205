import RadixCounter from "../components/RadixCounter";
import Value from "../components/Value";
import Adder from "../components/Adder";
import Timer from "../components/Time";
import Temperature from "../components/Temperature";
import { useState } from "react";

const components = () => {

    const [counter, setCounter] = useState(0)

    return (<>
        <div>
            <RadixCounter />
            <Value name={'COUNTER'} value={counter} setValue={setCounter} />
            <Adder />
            <Timer />
            <Temperature />

            <p className="text-center fw-bold mt-3">67090695 นายณชพัฒน์ สัมฤทธิ์ยากรณ์</p>
        </div>
    </>);
}

export default components;
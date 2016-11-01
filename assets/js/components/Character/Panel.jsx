import React from "react";
import TabsPanel from "../base/tabs-panel";
import { Gear, Skills, Traits } from './index';

class Panel extends React.Component {
    render() {
        return (
            <div className={''}>
                <TabsPanel
                    headers={[
                        <Skills.Header/>,
                        <Traits.Header/>,
                        <Gear.Header/>
                    ]}
                    tabs={[
                        <Skills.Tab/>,
                        <Traits.Tab/>,
                        <Gear.Tab/>
                    ]}
                />
            </div>
        );
    }
}

export default Panel;

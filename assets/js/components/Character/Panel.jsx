import React from 'react';
import throttle from 'lodash/throttle';

import Settings from '../../containers/settings';

import { Skills } from '../Skills';
import { Specializations } from '../Specializations';
import style from './panel.css';
import { Gear, Section } from './index';

class Panel extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.sectionNodes = [];
        this.panelNode = null;
        this.ignoreNextScroll = false;

        this.setSectionRef = this.setSectionRef.bind(this);
        this.setPanelRef = this.setPanelRef.bind(this);
        this.handleScroll = throttle(this.handleScroll.bind(this), 200);
    }

    componentWillUnmount() {
        this.handleScroll.cancel();
        this.panelNode.removeEventListener('scroll', this.handleScroll);
    }

    shouldComponentUpdate() {
        // this component has no states
        // and no props that change the output
        return false;
    }

    handleScroll() {
        if (this.ignoreNextScroll) {
            this.ignoreNextScroll = false;
            return;
        }

        let { scrollTop, scrollHeight, offsetHeight } = this.panelNode;
        let sectionIndex = 0;

        if (scrollTop + offsetHeight === scrollHeight) {
            this.props.onSectionChange(this.sectionNodes.length - 1);
            return;
        }

        this.sectionNodes.some(section => {
            scrollTop -= section.offsetHeight;

            if (scrollTop <= 0) {
                this.props.onSectionChange(sectionIndex);

                return true;
            }

            sectionIndex++;

            return false;
        });
    }

    scrollTo(section) {
        this.ignoreNextScroll = true;

        if (this.sectionNodes[section]) {
            this.sectionNodes[section].scrollIntoView();
        }
    }

    setPanelRef(ref) {
        if (this.panelNode) {
            this.handleScroll.cancel();
            this.panelNode.removeEventListener('scroll', this.handleScroll);
        }

        this.panelNode = ref;
        this.panelNode.addEventListener('scroll', this.handleScroll);
    }

    setSectionRef(section) {
        return ref => {
            this.sectionNodes[section] = ref;
        };
    }

    render() {
        return (
            <div ref={this.setPanelRef} className={style.panel}>
                <Section domRef={this.setSectionRef(0)} name="Character">
                    <Settings/>
                </Section>
                <Section domRef={this.setSectionRef(1)} name="Skills">
                    <Skills/>
                </Section>
                <Section domRef={this.setSectionRef(2)} name="Traits">
                    <Specializations/>
                </Section>
                <Section domRef={this.setSectionRef(3)} name="Gear">
                    <Gear/>
                </Section>
            </div>
        );
    }
}

Panel.propTypes = {
    onSectionChange: React.PropTypes.func.isRequired
};

export default Panel;

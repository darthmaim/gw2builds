import React from 'react';
import ReactDOM from 'react-dom';

import Settings from '../../containers/settings';

import style from './panel.css';

import { Gear, Skills, Traits, Section } from './index';

class Panel extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.sectionNodes = [];
        this.panelNode = null;
        this.ignoreNextScroll = false;

        this.setSectionRef = this.setSectionRef.bind(this);
        this.setPanelRef = this.setPanelRef.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentWillUnmount() {
        this.panelNode.removeEventListener('scroll', this.handleScroll);
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

        console.log('scrolling to', section);
        if (this.sectionNodes[section]) {
            this.sectionNodes[section].scrollIntoView();
        }
    }

    setPanelRef(ref) {
        if (this.panelNode) {
            this.panelNode.removeEventListener('scroll', this.handleScroll);
        }

        this.panelNode = ReactDOM.findDOMNode(ref);
        this.panelNode.addEventListener('scroll', this.handleScroll);
    }

    setSectionRef(section) {
        return ref => {
            this.sectionNodes[section] = ReactDOM.findDOMNode(ref);
        };
    }

    render() {
        return (
            <div ref={this.setPanelRef} className={style.panel}>
                <Section ref={this.setSectionRef(0)} name="Character">
                    <Settings/>
                </Section>
                <Section ref={this.setSectionRef(1)} name="Skills">
                    <Skills/>
                </Section>
                <Section ref={this.setSectionRef(2)} name="Traits">
                    <Traits/>
                </Section>
                <Section ref={this.setSectionRef(3)} name="Gear">
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

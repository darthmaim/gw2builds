import React from 'react';
import throttle from 'lodash/throttle';
import Settings from '~/containers/settings';
import Skills from '~/components/Skills';
import Specializations from '~/components/Specializations';
import Gear from '~/components/Gear';
import Section from './Section';
import style from './mainContent.css';

class MainContent extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.sectionNodes = [];
        this.anchorNodes = [];
        this.panelNode = null;
        this.ignoreNextScroll = false;

        this.setSectionRef = this.setSectionRef.bind(this);
        this.setPanelRef = this.setPanelRef.bind(this);
        this.handleResponsiveChange = this.handleResponsiveChange.bind(this);
        this.handleScroll = throttle(this.handleScroll.bind(this), 200);
        this.handleWindowScroll = throttle(this.handleWindowScroll.bind(this), 200);

        this.responsiveMediaQuery = window.matchMedia('(max-width: 768px)');
        this.responsiveMediaQuery.addListener(this.handleResponsiveChange);
        window.addEventListener('scroll', this.handleWindowScroll);

        this.state = {
            isResponsive: this.responsiveMediaQuery.matches
        }
    }

    componentWillUnmount() {
        this.handleScroll.cancel();
        this.panelNode.removeEventListener('scroll', this.handleScroll);
        this.responsiveMediaQuery.removeListener(this.handleResponsiveChange);
        window.removeEventListener('scroll', this.handleWindowScroll);
    }

    shouldComponentUpdate() {
        // this component has no states
        // and no props that change the output
        return false;
    }

    handleResponsiveChange(mql) {
        this.setState({ isResponsive: mql.matches });
    }

    ignoreScroll() {
        if(this.ignoreNextScroll) {
            this.ignoreNextScroll = false;
            return true;
        }

        return false;
    }

    handleScroll() {
        if (this.state.isResponsive || this.ignoreScroll()) {
            return;
        }

        let { scrollTop, scrollHeight, offsetHeight } = this.panelNode;

        if (scrollTop + offsetHeight >= scrollHeight) {
            this.props.onSectionChange(this.sectionNodes.length - 1);
            return;
        }

        this.findSectionInViewport(scrollTop);
    }

    handleWindowScroll() {
        if (!this.state.isResponsive || this.ignoreScroll()) {
            return;
        }

        let { scrollTop, scrollHeight } = window.document.scrollingElement;

        if (scrollTop + window.innerHeight >= scrollHeight) {
            this.props.onSectionChange(this.sectionNodes.length - 1);
            return;
        }

        this.findSectionInViewport(scrollTop - 48);
    }

    findSectionInViewport(scrollTop) {
        let sectionIndex = 0;

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

        if (this.anchorNodes[section]) {
            this.anchorNodes[section].scrollIntoView();
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

    setAnchorRef(section) {
        return ref => {
            this.anchorNodes[section] = ref;
        };
    }

    render() {
        return (
            <div ref={this.setPanelRef} className={style.panel}>
                <Section domRef={this.setSectionRef(0)} anchorRef={this.setAnchorRef(0)} name="Character">
                    <Settings/>
                </Section>
                <Section domRef={this.setSectionRef(1)} anchorRef={this.setAnchorRef(1)} name="Skills">
                    <Skills/>
                </Section>
                <Section domRef={this.setSectionRef(2)} anchorRef={this.setAnchorRef(2)} name="Traits">
                    <Specializations/>
                </Section>
                <Section domRef={this.setSectionRef(3)} anchorRef={this.setAnchorRef(3)} name="Gear">
                    <Gear/>
                </Section>
            </div>
        );
    }
}

MainContent.propTypes = {
    onSectionChange: React.PropTypes.func.isRequired
};

export default MainContent;

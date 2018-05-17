import PropTypes from 'prop-types';
import React from 'react';
import throttle from 'lodash/throttle';
import Skills from '../../Skills';
import Specializations from '../../Specializations';
import Gear from '../../Gear';
import Section from './Section';
import style from './mainContent.css';
import General from '../../General/GeneralContainer';

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

        this.currentSection = null;

        this.state = {
            isResponsive: this.responsiveMediaQuery.matches
        }
    }

    componentDidMount() {
        this.props.instanceRef(this);
    }

    componentWillUnmount() {
        this.props.instanceRef(undefined);
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
            this.onSectionChange(this.sectionNodes.length - 1);
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
            this.onSectionChange(this.sectionNodes.length - 1);
            return;
        }

        this.findSectionInViewport(scrollTop - 48);
    }

    findSectionInViewport(scrollTop) {
        let sectionIndex = 0;

        this.sectionNodes.some(section => {
            scrollTop -= section.offsetHeight;

            if (scrollTop < 0) {
                this.onSectionChange(sectionIndex);

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

    onSectionChange(section) {
        if(this.currentSection !== section) {
            this.currentSection = section;
            this.props.onSectionChange(section);
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
            <main ref={this.setPanelRef} className={style.panel}>
                <Section domRef={this.setSectionRef(0)}
                         anchorRef={this.setAnchorRef(0)}
                         name="General"
                         actions={[{ text: 'Load build', onClick: () => this.props.setImportDialogVisible(true)}]}>
                    <General/>
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
            </main>
        );
    }
}

MainContent.propTypes = {
    instanceRef: PropTypes.func.isRequired,
    onSectionChange: PropTypes.func.isRequired,
    setImportDialogVisible: PropTypes.func.isRequired
};

export default MainContent;

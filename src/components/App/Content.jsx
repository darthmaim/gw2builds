import React, { Component } from 'react';
import StatsOverview from '../StatsOverview';
import MainContent from './MainContent/MainContentContainer';
import Section from './MainContent/Section';
import Sidebar from './Sidebar';
import style from './content.css';

class Content extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            currentIndex: 0
        };

        this.handleIndexChange = this.handleIndexChange.bind(this);
        this.handleSectionScroll = this.handleSectionScroll.bind(this);
        this.setContentRef = this.setContentRef.bind(this);
    }

    handleIndexChange(currentIndex) {
        this.content.scrollTo(currentIndex);
        this.setState({ currentIndex });
    }

    handleSectionScroll(currentIndex) {
        this.setState({ currentIndex });
    }

    setContentRef(ref) {
        this.content = ref;
    }

    render() {
        const delimiter = ' • ';
        const currentYear = (new Date()).getFullYear();

        return (
            <div className={style.container}>
                <Sidebar currentIndex={this.state.currentIndex} onSectionChange={this.handleIndexChange}/>
                <MainContent ref={this.setContentRef} onSectionChange={this.handleSectionScroll}/>
                <div className={style.stats}>
                    <Section name="Stats">
                        <StatsOverview/>
                    </Section>
                    <div className={style.footer}>
                        <a href="https://gw2efficiency.com/">gw2efficiency</a> &copy; {currentYear}
                        {delimiter}<a href="https://github.com/darthmaim/gw2builds">Github</a>
                        {delimiter}<a href="https://gitter.im/gw2builds/Lobby">Gitter</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Content;

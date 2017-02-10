import React, { Component } from 'react';
import StatsOverview from '~/components/StatsOverview';
import CharacterPanel from '~/components/Character';
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
        return (
            <div className={style.container}>
                <Sidebar currentIndex={this.state.currentIndex} onSectionChange={this.handleIndexChange}/>
                <CharacterPanel ref={this.setContentRef} onSectionChange={this.handleSectionScroll}/>
                <div className={style.stats}>
                    <StatsOverview/>
                </div>
            </div>
        );
    }
}

export default Content;

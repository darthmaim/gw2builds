import PropTypes from 'prop-types';
import React, { Component } from 'react';
import style from './sidebar.module.css';
import MenuButton from '../MenuButton/MenuButtonContainer';

import CharacterIcon from './Character.svg';
import SkillsIcon from './Skills.svg';
import TraitsIcon from './Traits.svg';
import GearIcon from './Gear.svg';
import LogoIcon from './Logo.svg';


class Sidebar extends Component {
    constructor(props, context) {
        super(props, context);

        this.responsiveMediaQuery = window.matchMedia('(max-width: 768px)');

        this.state = {
            currentIndex: props.currentIndex,
            isResponsive: this.responsiveMediaQuery.matches
        };

        this.handleResponsiveChange = this.handleResponsiveChange.bind(this);

        this.responsiveMediaQuery.addListener(this.handleResponsiveChange);
    }

    componentWillUnmount() {
        this.responsiveMediaQuery.removeListener(this.handleResponsiveChange);
    }

    handleResponsiveChange(mql) {
        this.setState({ isResponsive: mql.matches });
    }

    onClick(currentIndex) {
        return () => {
            this.setState({ currentIndex });
            this.props.onSectionChange(currentIndex);
        };
    }

    componentWillReceiveProps(props) {
        const { currentIndex } = props;
        if (currentIndex !== this.state.currentIndex) {
            this.setState({ currentIndex });
        }
    }

    shouldComponentUpdate(props, state) {
        return this.props.currentIndex !== props.currentIndex ||
            this.state.currentIndex !== state.currentIndex ||
            this.state.isResponsive !== state.isResponsive;
    }

    render() {
        const markerStyle = {
            transform: this.state.isResponsive
                ? `translateX(${this.state.currentIndex * 48}px)`
                : `translateY(${this.state.currentIndex * 64}px)`
        };
        return (
            <div className={style.sidebar}>
                <div className={style.logo}>
                    <img src={LogoIcon} alt=""/>
                </div>
                <div className={style.sections}>
                    <div className={style.marker} style={markerStyle}/>
                    {this.renderSection(0, CharacterIcon, 'General')}
                    {this.renderSection(1, SkillsIcon, 'Skills')}
                    {this.renderSection(2, TraitsIcon, 'Traits')}
                    {this.renderSection(3, GearIcon, 'Gear')}
                </div>
                <MenuButton/>
            </div>
        );
    }

    renderSection(section, icon, title) {
        return (
            <button key={section} type="button" className={style.button} onFocus={this.onClick(section)} onClick={this.onClick(section)}>
                <img src={icon} alt={title}/>
            </button>
        );
    }
}

Sidebar.propTypes = {
    currentIndex: PropTypes.number.isRequired,
    onSectionChange: PropTypes.func.isRequired
};

export default Sidebar;

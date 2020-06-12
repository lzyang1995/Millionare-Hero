import React from 'react';
import { WhiteSpace, Button } from 'antd-mobile';
import logo from '../assets/img/logo.png';
import '../assets/css/cover.css';

class Cover extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.history.replace('/question/1');
    }

    render() {
        return (
            <div className='cover'>
                <div className='logo'>
                    <img alt='logo' src={logo} className='logoImg' />
                </div>
                <div>
                    <WhiteSpace />
                    <Button type='primary' onClick={this.handleClick}>开始答题</Button>
                </div>
            </div>
        );
    }
}

export default Cover;

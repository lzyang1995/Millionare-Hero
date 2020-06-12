import React from 'react';
import { connect } from 'react-redux';
import {
    resetScore,
    updateSelectedOption,
    resetOptionClassNames,
    setSelectable
} from '../utils/actions.js'
import { WhiteSpace, Button } from 'antd-mobile';
import '../assets/css/cover.css';

class Result extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.resetScore();
        this.props.updateSelectedOption(null);
        this.props.resetOptionClassNames();
        this.props.setSelectable(true);

        this.props.history.replace('/');
    }

    render() {
        return (
            <div className='cover'>
                <h1 className='score'>
                    恭喜您获得了{this.props.score}分！
                </h1>
                <div>
                    <WhiteSpace />
                    <Button type='primary' onClick={this.handleClick}>返回首页</Button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    let history = ownProps.history;
    return {
        history,
        score: state.score,
    }
}

const mapDispatchToProps = {
    resetScore,
    updateSelectedOption,
    resetOptionClassNames,
    setSelectable
};

let ResultWrapper = connect(mapStateToProps, mapDispatchToProps)(Result);

export default ResultWrapper;
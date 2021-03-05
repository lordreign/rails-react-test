import React from 'react'
import PropTypes from 'prop-types'

class Show extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <React.Fragment>
                <h1>게시판 상세페이지다~~~</h1>
                <ul>
                    <li>아이디: {this.props.board.id}</li>
                    <li>제목: {this.props.board.title}</li>
                    <li>내용: {this.props.board.content}</li>
                </ul>
                <a href="/boards">목록가기</a>
                <a href={`/boards/${this.props.board.id}/edit`}>수정하기</a>
            </React.Fragment>
        );
    }
}

Show.propTypes = {
    board: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        content: PropTypes.string
    }),
};

export default Show;

import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash';
import axios from 'axios';

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            csrfToken: document.querySelector('meta[name="csrf-token"]').content,
            allIdCount: this.props.boards.length,
            checked: this.props.boards.reduce((map, obj) => {
                map[obj.id] = false;
                return map;
            }, {}),
            checkboxAll: false,
            boards: this.props.boards,
        };

        this.changeAllCheckbox = this.changeAllCheckbox.bind(this);
        this.changeCheckbox = this.changeCheckbox.bind(this);
        this.clickDestroy = this.clickDestroy.bind(this);
    }

    changeAllCheckbox(e) {
        this.setState({
            checked: this.props.boards.reduce((map, obj) => {
                map[obj.id] = e.target.checked;
                return map;
            }, {}),
            checkboxAll: e.target.checked,
        });
    }

    changeCheckbox(e) {
        let { checked } = this.state;
        checked[e.target.value] = e.target.checked;

        this.setState({
            checked,
            checkboxAll: _.every(Object.values(checked)),
        });
    }

    async clickDestroy(e, boardId) {
        e.preventDefault();
        if (confirm('삭제하시게?')) {
            // 삭제 처리 하기
            await axios({
                method: 'DELETE',
                url: `/boards/${boardId}`,
                data: {},
                headers: {'X-CSRF-Token': this.state.csrfToken, 'Content-Type': 'application/json', 'Accept': 'application/json'},
            }).then((resp) => {
                console.log(resp.data);
                console.log(resp.data.result);
                if (resp.data.result === 'success') {
                    alert('삭제됨');
                    let { boards } = this.state;
                    _.remove(boards, (board) => board.id === boardId);
                    this.setState({
                        boards
                    })
                } else {
                    alert('이상하게 삭제가 안됬네?ㅋ');
                }
            }).catch((error) => {
                console.log(error);
                alert('먼가잘못됬나봄');
            });
        }
    }

    boardList() {
        if (this.state.boards.length > 0) {
            return this.state.boards.map((board) => {
                return (
                    <tr key={board.id}>
                        <td><input type="checkbox" value={board.id} checked={this.state.checked[board.id]} onChange={this.changeCheckbox} /></td>
                        <td><a href={`/boards/${board.id}`}>{board.id}</a></td>
                        <td><a href={`/boards/${board.id}`}>{board.title}</a></td>
                        <td><a href="#" onClick={(e) => this.clickDestroy(e, board.id)}>삭제</a></td>
                    </tr>
                );
            });
        } else {
            return (
                <tr><td>게시글이 존재하지 않습니다.</td></tr>
            )
        }
    }

    render () {
        return (
            <React.Fragment>
                <h1>게시판 목록이다~~~</h1>
                <table>
                    <colgroup>
                        <col />
                        <col />
                        <col />
                        <col />
                    </colgroup>
                    <thead>
                    <tr>
                        <td><input type="checkbox" value="all" onChange={this.changeAllCheckbox} checked={this.state.checkboxAll} /></td>
                        <td>아이디</td>
                        <td>제목</td>
                        <td>삭제버튼</td>
                    </tr>
                    </thead>
                    <tbody>
                    {this.boardList()}
                    </tbody>
                </table>
                <div>
                    <a href="/boards/new">등록</a>
                </div>
            </React.Fragment>
        );
    }
}

Index.defaultProps = {
    boards: [],
};

Index.propTypes = {
    boards: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        content: PropTypes.string
    })),
};

export default Index;

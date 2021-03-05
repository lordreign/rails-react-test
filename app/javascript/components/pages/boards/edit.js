import React from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import PropTypes from "prop-types";
import Show from "./show";
import Index from "./index";

// react function 형식
function Edit(props) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    const { register, handleSubmit, errors } = useForm();
    const validation = {
        title: {
            required: {value: true, message: '제목은 필수항목 입니다.'},
            maxLength: {value: 100, message: '100글자까지 입력가능합니다.'}
        },
        content: {
            required: {value: true, message: '내용은 필수항목 입니다.'},
        }
    }
    const onSubmit = async (data) => {
        console.log(data);
        await axios({
            method: 'PUT',
            url: `/boards/${data.id}`,
            data: {
                board: data,
            },
            headers: {'X-CSRF-Token': csrfToken, 'Content-Type': 'application/json', 'Accept': 'application/json'},
        }).then((resp) => {
            console.log(resp.data);
            console.log(resp.data.result);
            if (resp.data.result === 'success') {
                window.location.href = `/boards/${resp.data.data.board.id}`;
            } else {
                alert(Object.values(resp.data.message).join(','));
            }
        }).catch((error) => {
            console.log(error);
            alert('먼가잘못됬나봄');
        });
    };

    return (
        <>
            <h1>게시판 등록이다~~~</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" name="id" defaultValue={props.board.id} ref={register} />
                <div>
                    <label htmlFor="title">제목</label>
                    <input name="title" id="title" ref={register(validation.title)} defaultValue={props.board.title} />
                    <span style={{color:'red'}}>{errors.title ? errors.title.message : ''}</span>
                </div>
                <div>
                    <label htmlFor="content">내용</label>
                    <textarea name="content" id="content" ref={register(validation.content)} defaultValue={props.board.content} />
                    <span style={{color:'red'}}>{errors.content ? errors.content.message : ''}</span>
                </div>

                <input type="submit" value="수정" />
            </form>
            <a href="/boards">목록가기</a>
        </>
    );
}


Edit.defaultProps = {
    board: {
        id: '',
        title: '',
        content: '',
    },
};

Edit.propTypes = {
    board: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        content: PropTypes.string
    }),
};

export default Edit;
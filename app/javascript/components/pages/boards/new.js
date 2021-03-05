import React from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';

// react function 형식
export default function New() {
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
        await axios({
            method: 'POST',
            url: '/boards',
            data: {
                board: data,
            },
            headers: {'X-CSRF-Token': csrfToken, 'Content-Type': 'application/json', 'Accept': 'application/json'},
        }).then((resp) => {
            console.log(resp.data);
            console.log(resp.data.result);
            window.location.href = `/boards/${resp.data.data.board.id}`;
        }).catch((error) => {
            console.log(error);
            alert('먼가잘못됬나봄');
        });
    };

    return (
        <>
            <h1>게시판 등록이다~~~</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="title">제목</label>
                    <input name="title" id="title" ref={register(validation.title)} />
                    <span style={{color:'red'}}>{errors.title ? errors.title.message : ''}</span>
                </div>
                <div>
                    <label htmlFor="content">내용</label>
                    <textarea name="content" id="content" ref={register(validation.content)} />
                    <span style={{color:'red'}}>{errors.content ? errors.content.message : ''}</span>
                </div>

                <input type="submit" value="등록" />
            </form>
            <a href="/boards">목록가기</a>
        </>
    );
}
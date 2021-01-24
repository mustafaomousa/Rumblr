import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewPost } from '../../store/post'

import './new-post.css';

const CreatePost = ({ user, makes, models }) => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [body, setBody] = useState('');
    const [makeId, setMakeId] = useState(0);
    const [modelId, setModelId] = useState(0);

    const updateTitle = (e) => setTitle(e.target.value);
    const updateContent = (e) => setContent(e.target.value);
    const updateBody = (e) => setBody(e.target.value);
    const updateMake = (e) => setMakeId(e.target.value);
    const updateModel = (e) => setModelId(e.target.value);

    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
            title,
            content,
            body,
            makeId,
            modelId,
            userId: user.id
        };
        dispatch(createNewPost(payload));
        resetFields();
    };

    const resetFields = () => {
        setTitle('');
        setContent('');
        setBody('');
        setMakeId(0);
        setModelId(0);
    };

    return (
        <div className='create-post-container'>
            <div className='create-post-form'>
                <form onSubmit={onSubmit}>
                    <input onChange={updateTitle} value={title} placeholder='title'></input>
                    <textarea onChange={updateBody} value={body} placeholder="what's on your mind?"></textarea>
                    <input onChange={updateContent} value={content} placeholder='image url'></input>
                    <select onChange={updateMake} value={makeId}>
                        <option value={0}>Select a Make</option>
                        {makes && makes.map((make, idx) => {
                            return (
                                <option value={make.id} key={idx}>{make.name}</option>
                            )
                        })}
                    </select>
                    <select onChange={updateModel} value={modelId}>
                        <option value={0}>Select a Model</option>
                        {models && models.map((model, idx) => {
                            return (
                                <option value={model.id} key={idx}>{model.name}</option>
                            )
                        })}
                    </select>
                    <button>Create Post</button>
                </form>
            </div>
        </div>
    )
};

export default CreatePost;
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createNewPost } from '../../store/post'
import UploadPictureS3Client from '../../aws/s3';
import './new-post.css';

const CreatePost = ({ user, makes, models }) => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [body, setBody] = useState('');
    const [makeId, setMakeId] = useState(0);
    const [modelId, setModelId] = useState(0);
    const updateTitle = (e) => setTitle(e.target.value);
    const updateBody = (e) => setBody(e.target.value);
    const updateMake = (e) => setMakeId(e.target.value);
    const updateModel = (e) => setModelId(e.target.value);

    const onSubmit = (e) => {
        e.preventDefault();

        const tags = body.match(/#[A-Za-z0-9]*/g)

        const payload = {
            title,
            content,
            body,
            tags,
            makeId,
            modelId,
            userId: user.id
        };
        dispatch(createNewPost(payload));
        resetFields();
    };

    const uploadFile = (e) => {
        e.preventDefault();

        UploadPictureS3Client.uploadFile(e.target.files[0], `${user.id}-${new Date()}`)
            .then(data => setContent(data.location))
    };

    const resetFields = () => {
        setTitle('');
        setContent('');
        setBody('');
        setMakeId(0);
        setModelId(0);
    };

    return (
        <div className='create-post'>
            <div className='create-post-container speech-bubble'>
                <div className='create-post-form'>
                    <form onSubmit={onSubmit}>
                        <div className='input-container'>
                            <div className='post-information-container'>
                                <div className='label'>
                                    <label>Title:</label>
                                    <label>Elaborate:</label>
                                </div>
                                <div className='input'>
                                    <input onChange={updateTitle} value={title} placeholder='title'></input>
                                    <textarea onChange={updateBody} value={body} placeholder="what's on your mind?"></textarea>
                                </div>
                            </div>
                            <div className='upload-media-container'>
                                <div className='label'>
                                    <label>Show me:</label>
                                </div>
                                <div className='input'>
                                    <input type='file' onChange={uploadFile} />
                                </div>
                            </div>
                            <label id='label'>Wow.. which car again?</label>
                            <div className='vehicle-select-container'>
                                <>
                                    <select onChange={updateMake} value={makeId}>
                                        <option value={0}>Select a Make</option>
                                        {makes && makes.map((make, idx) => {
                                            return (
                                                <option value={make.id} key={idx}>{make.name}</option>
                                            )
                                        })}
                                    </select>
                                </>
                                <>
                                    <select onChange={updateModel} value={modelId}>
                                        <option value={0}>Select a Model</option>
                                        {models && models.map((model, idx) => {
                                            return (
                                                <option value={model.id} key={idx}>{model.name}</option>
                                            )
                                        })}
                                    </select>
                                </>
                            </div>
                        </div>
                        <div className='post-button-container'>
                            <button id='submit-button' type='submit'>Create Post</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
};

export default CreatePost;
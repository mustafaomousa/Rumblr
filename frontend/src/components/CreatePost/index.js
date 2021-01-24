import { useState } from 'react';

import './new-post.css';

const CreatePost = ({ user }) => {
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

    return (
        <div className='create-post-container'>
            <div create-post-form>
                <form>
                    <input onChange={updateTitle} value={title} placeholder='title'></input>
                    <textarea onChange={updateBody} value={body} placeholder="what's on your mind?"></textarea>
                    <input onChange={updateContent} value={content} placeholder='image url'></input>
                    <select onChange={updateMake} value={makeId}>
                        <option>Select a Make</option>
                    </select>
                    <select onChange={updateModel} value={modelId}>
                        <option>Select a Model</option>
                    </select>
                    <button>Create Post</button>
                </form>
            </div>
        </div>
    )
};

export default CreatePost;
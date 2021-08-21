import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form } from "react-bulma-components";

import { createNewPost } from '../../store/post'
import UploadPictureS3Client from '../../aws/s3';


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
        <div className='CreatePost SpeechBubble'>
                <form onSubmit={onSubmit}>
                    <Form.Field>
                        <Form.Label>Title</Form.Label>
                        <Form.Control>
                            <Form.Input onChange={updateTitle} value={title}/>
                        </Form.Control>
                    </Form.Field>
                    <Form.Field>
                        <Form.Label>Body</Form.Label>
                        <Form.Control>
                            <Form.Textarea onChange={updateBody} value={body}/>
                        </Form.Control>
                    </Form.Field>
                    <Form.Field>
                        <Form.Label>Image</Form.Label>
                        <Form.Control>
                            <Form.InputFile type='file' onChange={uploadFile}/>
                        </Form.Control>
                    </Form.Field>
                    <Form.Field>
                        <Form.Label>Make and Model</Form.Label>
                        <Form.Control>
                            <Form.Select onChange={updateMake} value={makeId}>
                                <option value={0}>Select a Make</option>
                                        {makes && makes.map((make, idx) => {
                                            return (
                                                <option value={make.id} key={idx}>{make.name}</option>
                                            )
                                        })}
                            </Form.Select>
                            <Form.Select >
                                <option value={0}>Select a Model</option>
                                        {models && models.map((model, idx) => {
                                            return (
                                                <option value={model.id} key={idx}>{model.name}</option>
                                            )
                                        })}
                            </Form.Select>
                        </Form.Control>
                    </Form.Field>
                    <Button type='submit'>Create Post</Button>
                </form>
        </div>
    )
};

export default CreatePost;
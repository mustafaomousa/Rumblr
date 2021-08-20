import { useSelector } from "react-redux"
import { Section, Box, Media, Image, Content } from "react-bulma-components";

const NewestPostsComponent = () => {

    const newestBlogs = useSelector(state => state.session.newestBlogs);

    return (
        newestBlogs && newestBlogs.map((blog, idx) => {
            return (
                <Section key={idx}>
                    <Box>
                        <Media renderAs="article">
                            <Media.Item align="left">
                                <Image size={64} src={blog.profilePicture}/>    
                            </Media.Item>
                            <Media.Item align="center">
                                <Content>
                                    <p>
                                        <strong>{blog.username}</strong>
                                        <br />
                                        {blog.header}
                                    </p>
                                </Content>
                            </Media.Item>
                        </Media>
                    </Box>
                </Section>
            )
        })
    );
};

export default NewestPostsComponent;
import { useEffect } from 'react';
import './about-us.css'

const AboutUsPage = () => {

    useEffect(() => window.scrollTo(0, 0), [])
    return (
        <div className='AboutUsPage'>
            <div className='divider-container'>
                <div className='about-us-container'>
                    <p>
                        Rumblr is a clone based on the well known app/website named Tumblr.
                    </p>
                </div>
            </div>
            <div className='divider-container-2'>
                <div className='about-us-container-2'>
                    <p>
                        Rumblr's front-end was created using React and Redux.
                    </p>
                </div>
            </div>
            <div className='divider-container-3'>
                <div className='about-us-container-3'>
                    <p>
                        Rumblr's back-end was created using Express and PSQL.
                    </p>
                </div>
            </div>
            <div className='divider-container-2'>
                <div className='about-us-container-4'>
                    <p>
                        Rumblr was created by Mustafa Mousa of Fort Worth, Texas.
                    </p>
                    <p>A full stack software engineer.</p>
                </div>
            </div>
        </div>
    )
};

export default AboutUsPage;
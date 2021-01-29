import './about-us.css'

const AboutUsPage = () => {

    return (
        <div className='about-us-body'>
            <div style={{ paddingLeft: '80px' }}>
                <h1>About us</h1>
            </div>
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
                    <p>A current AppAcademy student</p>
                    <div className='my-picture'>
                        <img id='my-picture' src='https://scontent-dfw5-2.xx.fbcdn.net/v/t1.0-9/37819120_10156831081889683_7149719125781118976_n.jpg?_nc_cat=104&ccb=2&_nc_sid=8bfeb9&_nc_ohc=DczUsNjp52QAX9YNCs1&_nc_ht=scontent-dfw5-2.xx&oh=7add4d35e695eea485578e0dc5dc7d39&oe=603BCB2D' alt=''></img>
                    </div>
                </div>
            </div>

        </div>
    )
};

export default AboutUsPage;
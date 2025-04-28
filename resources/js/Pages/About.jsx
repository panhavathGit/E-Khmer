import Layout from '../Layouts/Layout';
const About = () => {
    return (
        <>
        <div className='w-full h-full'>
            <h1 className="text-black font-bold">
            Our company was established in 2012. We mainly provide custom software development services and consulting services to customers in every industry. Our office is located in Phnom Penh, capital city of Cambodia. E-KHMER Technology Co., Ltd. is flexible in dealing with customer requirements in order to achieve customer business objectives. We have highly skilled software engineers and technical experts to help customers and solve their problems.
            </h1>
        </div>
        </>
    )
}
About.layout = page => <Layout children={page} title="Welcome" />
export default About
import Layout from '../Layouts/Layout';
const Home = () => {
    return (
        <>
            <h1 className="text-blue-500 font-bold">
                Hello inertia
            </h1>
        </>
    )
}
Home.layout = page => <Layout children={page} title="Welcome" />
export default Home
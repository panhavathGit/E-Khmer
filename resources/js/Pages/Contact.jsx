import Layout from "../Layouts/Layout";
const Contact = () => {
    return (
        <>
            <div className="w-full h-full">
                <h1>
                    Building #54 (Room 602, Floor 6th) Street 598, Sangkat Beong
                    Kok II, Khan Toul Kork, Phnom Penh. support@e-khmer.com
                    (+855) 715533175 Mon - Fri: 8:00 am - 5:00 pm Sat : 8:00 am
                    - 12:00 pm
                </h1>
            </div>
        </>
    );
};
Contact.layout = (page) => <Layout children={page} title="Welcome" />;
export default Contact;

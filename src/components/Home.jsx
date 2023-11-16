import { Container, Title, Subtitle } from "./Home.styles";

const Home = ({ scrollToAboutUsSection, scrollToMapSection, scrollToFooterSection }) => {


    return (
        <Container>
            <nav
                className="absolute top-0 right-0 bg-white mx-auto flex w-screen justify-end lg:px-8">
                <div className="flex lg:flex-1 justify-end">

                    <p onClick={scrollToAboutUsSection} className="cursor-pointer text-lg font-semibold leading-6 text-gray-900 p-5">
                        About
                    </p>
                    <p onClick={scrollToMapSection} className="cursor-pointer text-lg font-semibold leading-6 text-gray-900 p-5" >
                        Map
                    </p>
                    <p onClick={scrollToFooterSection} className="cursor-pointer text-lg font-semibold leading-6 text-gray-900 p-5" >
                        Contact
                    </p>
                </div>
            </nav>


            <Title> Barcelona Tranquila</Title>
            <Subtitle className="w-2/3 lg:w-1/2 mx-auto">
                Explora la Ciudad Inteligentemente
            </Subtitle>

        </Container>
    );
};
export default Home;

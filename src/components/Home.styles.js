import styled from "styled-components";
// import Img from 'assets/img/portada.jpg'

export const Container = styled.section`
    background-image: url("https://media.traveler.es/photos/63838947050e0f92cd80c982/16:9/w_2560%2Cc_limit/GettyImages-1392907424.jpg");
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    padding: 5rem 1rem;
    position: relative;
    z-index: 0;

    &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        z-index: -1;

    @media screen and (min-width: 640px) {
        padding: 5rem;
    }
}
`

export const Title = styled.h1`
    color: white;
    font-size: 3rem;
    font-weight: 700;
    line-height: 3.5rem;
    margin-bottom: 4rem;

    @media screen and (min-width: 640px) {
        font-size: 4.5rem;
        margin-top: 3rem;
        margin-bottom: 5rem;
    }
`

export const Subtitle = styled.p`
    color: white;
    font-size: 1.25rem;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    line-height: 2.125rem;
    margin-bottom: 3rem;
    text-shadow: 2px 2px 12px rgba(0, 0, 0, 0.8);

    @media screen and (min-width: 640px) {
        font-size: 1.5rem;
        line-height: 2.5rem;
    }
`;
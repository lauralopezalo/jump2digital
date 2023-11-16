import axios from 'axios';

const getPeople = async () => {

    const url = "https://hackaton-map-back.vercel.app/users";
    
    try {
        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.error('Error al obtener datos de la API:', error);
    }
};

export default getPeople;
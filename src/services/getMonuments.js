import axios from 'axios';

const getMonuments = async () => {

    const url = "https://hackaton-map-back.vercel.app/monuments";
    
    try {
        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.error('Error al obtener datos de la API:', error);
    }
};

export default getMonuments;
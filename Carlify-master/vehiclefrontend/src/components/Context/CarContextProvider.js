import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { UserContext } from "./UserContextProvider";

export const CarContext = createContext();

function CarContextProvider({ children }) {
    const { ApiEndPoint } = useContext(UserContext);
    const [carList, setCarList] = useState([]);
    const [loading, setLoading] = useState(true);



    const loadMyListings = async () => {
        try {
            let url = `${ApiEndPoint}/car/getallcars`

            let response = await axios.get(url);
            if (response?.data?.status) {
                setCarList([...response.data.carData].sort(() => Math.random() - 0.5));
            } else {
                toast.error(response?.data?.message || "Something went wrong!");
            }
        } catch (error) {
            console.error("Error fetching listings:", error);
            toast.error("Failed to load listings. Please try again later.");
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, [100]);
        }
    }

    useEffect(() => {
        loadMyListings();
    }, []);

    return (
        <CarContext.Provider value={{ carList, loading, setCarList }}>
            {children}
        </CarContext.Provider>
    );
};

export default CarContextProvider;
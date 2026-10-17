import axios from "axios";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { UserContext } from "./UserContextProvider";
import toast from "react-hot-toast";


export const AdminContext = createContext();

function AdminContextProvider({ children }) {
    const { ApiEndPoint } = useContext(UserContext);

    // for current page of users
    const [currentPageUser, setCurrentPageUser] = useState(1);
    const [totalPageUser, setTotalPageUser] = useState("");
    
    // for users and cars
    const [users, setUsers] = useState([]);
    const [cars, setCars] = useState([]);
    
    // for current page of cars 
    const [currentPageCar, setCurrentPageCar] = useState(1);
    const [totalPageCar, setTotalPageCar] = useState("");


    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const loadData = useCallback(async () => {
        try {
            let response = await axios.get(`${ApiEndPoint}/admin/totalData`);
            if (response?.data?.status) {
                setIsLoading(false);
                setData(response.data);
            } else {
                setIsLoading(false);
                console.log(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }, [ApiEndPoint]);

    const getUsers = useCallback(async () => {
        try {
            let response = await axios.get(
                `${ApiEndPoint}/admin/getUsers/${currentPageUser}`
            );
            if (response?.data?.status) {
                setUsers(response.data.users);
                setTotalPageUser(response.data.totalPage);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }, [ApiEndPoint, currentPageUser]);

    const deleteUser = useCallback(async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                let response = await axios.delete(
                    `${ApiEndPoint}/admin/deleteUser/${id}`
                );
                if (response?.data?.status) {
                    getUsers();
                    toast.success(response.data.message);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }, [ApiEndPoint, getUsers]);

    const getCars = useCallback(async () => {
        try {
            let response = await axios.get(
                `${ApiEndPoint}/admin/getAllCars/${currentPageCar}`
            );
            if (response?.data?.status) {
                setCars(response.data.cars);
                setTotalPageCar(response.data.totalPage);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }, [ApiEndPoint, currentPageCar]);

    useEffect(() => {
        loadData();
    }, [loadData]);


    useEffect(() => {
        getUsers();
    }, [getUsers]);

    useEffect(() => {
        getCars();
    }, [getCars]);


    return (
        <AdminContext.Provider value={{ApiEndPoint, data, isLoading, users, setCurrentPageCar, currentPageUser, totalPageUser, setCurrentPageUser, currentPageCar, totalPageCar, cars,setCars, deleteUser, getCars, getUsers }}>
            {children}
        </AdminContext.Provider>
    );
}

export default AdminContextProvider;

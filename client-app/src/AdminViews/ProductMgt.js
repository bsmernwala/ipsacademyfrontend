import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductMgt.css";

function ProductMgt() {

    const API = process.env.REACT_APP_BASE_API_URL;

    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = () => {
        axios
            .get(`${API}/product/showproduct`)
            .then(res => {
                setProducts(res.data);
            });
    };

    const changeStatus = async (pid, status) => {

        await axios.put(
            `${API}/product/updateproductstatus/${pid}/${status}`
        );

        loadProducts();
    };

    return (
        <div className="product-management">

            <h2 style={{color:"black"}}>Product Management</h2>

            <table style={{backgroundColor:"black"}}>

                <thead>

                <tr>
                    <th>Image</th>
                    <th>PID</th>
                    <th>Product</th>
                    <th>Vendor</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>

                </thead>

                <tbody>

                {
                    products.map((item) => (

                        <tr key={item.pid}>

                            <td>

                                <img
                                    src={item.ppicname}
                                    alt=""
                                    width="70"
                                />

                            </td>

                            <td>{item.pid}</td>

                            <td>{item.pname}</td>

                            <td>{item.vid}</td>

                            <td>₹ {item.pprice}</td>

                            <td>

                                <span
                                    className={
                                        item.status === "Active"
                                            ? "activeStatus"
                                            : "inactiveStatus"
                                    }
                                >
                                    {item.status}
                                </span>

                            </td>

                            <td>

                                {
                                    item.status === "Active" ?

                                        <button
                                            className="deactivateBtn"
                                            onClick={() =>
                                                changeStatus(
                                                    item.pid,
                                                    "Inactive"
                                                )
                                            }
                                        >
                                            Deactivate
                                        </button>

                                        :

                                        <button
                                            className="activateBtn"
                                            onClick={() =>
                                                changeStatus(
                                                    item.pid,
                                                    "Active"
                                                )
                                            }
                                        >
                                            Activate
                                        </button>

                                }

                            </td>

                        </tr>

                    ))
                }

                </tbody>

            </table>

        </div>
    );
}

export default ProductMgt;
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "./css/cart.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DLT, ADD, REMOVE } from "../redux/action/action";
import { useDispatch } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";

const CardDetails = () => {
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);

  const getData = useSelector((state) => state.cartReducer.carts);
  console.log(getData);

  const compare = () => {
    let compareData = getData.filter((e) => {
      return e.id == id;
    });
    setData(compareData);
  };

  useEffect(() => {
    compare();
  }, [id]);

  // add data
  const send = (e) => {
    dispatch(ADD(e));
  };

  const dlt = (id) => {
    dispatch(DLT(id));
    navigate("/");
  };

  // remove one item
  const remove = (item) => {
    dispatch(REMOVE(item));
  };

  return (
    <div className="container mt-2">
      <h1 className="text-center">Items details page</h1>

      <section className="container mt-5">
        <div className="iteamsdetails">
          {data.map((ele) => {
            return (
              <>
                <div className="items_img">
                  <img src={ele.imgdata} alt="item" />
                </div>
                <div className="details">
                  <Table>
                    <tr>
                      <td>
                        <p>
                          <b>Restorant :</b> {ele.rname}
                        </p>
                        <p>
                          <b>Price :</b>₹ {ele.price}
                        </p>
                        <p>
                          <b>Dishes :</b>
                          {ele.address}
                        </p>
                        <p>
                          <b>Total :</b>₹ {ele.price * ele.qnty}
                        </p>

                        <div
                          className="mt-5 d-flex justify-content-between align-items-center"
                          style={{
                            width: 100,
                            cursor: "pointer",
                            background: "#ddd",
                            color: "#111",
                          }}
                        >
                          <span
                            style={{ fontSize: 24 }}
                            onClick={
                              ele.qnty <= 1
                                ? () => dlt(ele.id)
                                : () => remove(ele)
                            }
                          >
                            -
                          </span>
                          <span style={{ fontSize: 24 }}>{ele.qnty}</span>
                          <span
                            style={{ fontSize: 24 }}
                            onClick={() => send(ele)}
                          >
                            +
                          </span>
                        </div>
                      </td>
                      <td>
                        <p>
                          <b>Rating :</b> <span>{ele.rating} ⭐</span>
                        </p>
                        <p>
                          <b>Order Review :</b> <span>{ele.somedata} </span>
                        </p>
                        <p onClick={() => dlt(ele.id)}>
                          <b>Remove :</b>
                          <span>
                            <DeleteForeverIcon
                              style={{
                                color: "red",
                                fontSize: 30,
                                cursor: "pointer",
                              }}
                            />
                          </span>
                        </p>
                      </td>
                    </tr>
                  </Table>
                </div>
              </>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default CardDetails;

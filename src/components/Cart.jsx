import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Cardsdata from "./cardData";
import "../components/css/cart.css";
import { useDispatch } from "react-redux";
import { ADD } from "../redux/action/action";
const Cart = () => {
  const [data, setData] = useState(Cardsdata);

  const dispatch = useDispatch();

  const send = (e) => {
    // console.log(e);
    dispatch(ADD(e));
  };

  return (
    <div className="container mt-3">
      <h1 className="text-center">Add To Carts Project</h1>

      <div className="row d-flex justify-content-center algn-item-center ">
        {data.map((val, index) => {
          return (
            <Card
              key={index}
              style={{ width: "22rem", border: "none" }}
              className="mx-2 mt-4 card_style"
            >
              <Card.Img
                variant="top"
                src={val.imgdata}
                style={{ height: "16rem" }}
                className="mt-3"
              />
              <Card.Body>
                <Card.Title>{val.rname}</Card.Title>
                <Card.Text>price : ₹ {val.price}</Card.Text>
                <div className="button_div d-flex justify-content-center">
                  <Button
                    variant="primary"
                    className="col-lg-12"
                    onClick={() => send(val)}
                  >
                    Add To Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;

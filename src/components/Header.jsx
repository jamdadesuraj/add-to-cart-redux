import React, { useState, useEffect } from "react";
import "../../src/components/css/cart.css";
import "../components/css/header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { DLT } from "../redux/action/action";
import { useDispatch } from "react-redux";

const Header = () => {
  const [price, setPrice] = useState(0);
  // console.log(price);

  const getData = useSelector((state) => state.cartReducer.carts);
  console.log(getData);

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dlt = (id) => {
    dispatch(DLT(id));
  };

  const total = () => {
    let price = 0;
    getData.map((ele, i) => {
      price = ele.price * ele.qnty + price;
    });
    setPrice(price);
  };

  useEffect(() => {
    total();
  }, [total]);

  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ height: "60px" }}>
        <Container>
          <NavLink to="/" className="text-decoration-none text-light mx-3">
            Add To Cart
          </NavLink>
          <Nav className="me-auto">
            <NavLink to="/" className="text-decoration-none text-light">
              Home
            </NavLink>
          </Nav>

          <Badge
            badgeContent={getData.length}
            color="primary"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <ShoppingCartIcon
              className="text-light"
              style={{ fontSize: "25", cursor: "pointer" }}
            />
          </Badge>
        </Container>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {getData.length ? (
            <div
              className="card_details"
              style={{ width: "24rem", padding: 10 }}
            >
              <Table>
                <thead>
                  <tr>
                    <th>photo</th>
                    <th>Restorant Name</th>
                  </tr>
                </thead>
                <tbody>
                  {getData.map((e) => {
                    return (
                      <>
                        <tr>
                          <td>
                            <NavLink to={`cart/${e.id}`} onClick={handleClose}>
                              <img
                                src={e.imgdata}
                                alt="cart-img"
                                style={{ width: "5rem", height: "5rem" }}
                              />
                            </NavLink>
                          </td>
                          <td>
                            <p>{e.rname}</p>
                            <p>price : ₹ {e.price}</p>
                            <p>Quantity : {e.qnty}</p>
                            <p
                              style={{
                                color: "red",
                                cursor: "pointer",
                                fontSize: 25,
                              }}
                              onClick={() => dlt(e.id)}
                            >
                              <DeleteForeverIcon className="smalltrash" />
                            </p>
                          </td>
                          <td
                            className="mt-2"
                            style={{
                              color: "red",
                              cursor: "pointer",
                              fontSize: 25,
                            }}
                            onClick={() => dlt(e.id)}
                          >
                            <DeleteForeverIcon />
                          </td>
                        </tr>
                      </>
                    );
                  })}
                  <p className="text-center">Total : ₹ {price} </p>
                </tbody>
              </Table>
            </div>
          ) : (
            <div className="card_details" style={{ position: "relative" }}>
              <CloseIcon
                className="smallClose"
                style={{
                  position: "absolute",
                  top: 2,
                  right: 20,
                  cursor: "pointer",
                  fontSize: 23,
                }}
                onClick={handleClose}
              />
              <p style={{ fontSize: 24 }} className="text-center">
                Your Cart Is Empty
              </p>
              <img
                src="https://c.tenor.com/8BeuRyZSb90AAAAC/shopping-cart-shopping.gif"
                alt="cart-img"
                className="emptycart_img"
                style={{}}
              />
            </div>
          )}
        </Menu>
      </Navbar>
    </>
  );
};

export default Header;

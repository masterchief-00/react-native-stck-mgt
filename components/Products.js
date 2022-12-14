import axios from "axios";
import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { API_URL } from "@env";
import { ProductActions } from "../redux/ProductSlice";
import { useIsFocused } from "@react-navigation/native";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const filtered = useSelector((state) => state.product.filtered);
  const token = useSelector((state) => state.user.token);
  const isFocused = useIsFocused();

  const fetchProducts = async () => {
    await axios({
      method: "get",
      url: `${API_URL}/products`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch(
            ProductActions.setProducts({ list: response.data.products })
          );
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (isFocused) {
      fetchProducts();
    }
  }, [isFocused]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ paddingHorizontal: 15, marginTop: 10 }}
      fadingEdgeLength={100}
      endFillColor="transparent"
    >
      {filtered.length === 0
        ? products.map((product) => (
            <ProductCard key={product.id} cart={false} product={product} />
          ))
        : filtered.map((product) => (
            <ProductCard key={product.id} cart={false} product={product} />
          ))}
    </ScrollView>
  );
};

export default Products;

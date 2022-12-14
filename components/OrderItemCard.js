import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { useSelector } from "react-redux";
import { colours } from "../colours";

const OrderItemCard = ({ data }) => {
  const products = useSelector((state) => state.product.products);
  const [product, setProduct] = useState({});
  const isFocused = useIsFocused();

  const findProduct = (product_id) => {
    let element = products.find((item) => item.id === product_id);
    setProduct(element);
  };

  const productImage =
    product.image !== null
      ? { uri: product.image }
      : require("../assets/images/product-package.jpg");

  useEffect(() => {
    if (isFocused) {
      findProduct(data.product_id);
    }
  }, [isFocused]);
  return (
    <View
      style={{
        marginBottom: 10,
        flexDirection: "row",
        borderBottomColor: colours.bg_variant,
        borderBottomWidth: 1,
        paddingBottom: 8,
      }}
    >
      <Image
        source={productImage}
        resizeMode="stretch"
        style={{
          height: 80,
          width: 120,
          borderRadius: 5,
        }}
      />
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          padding: 5,
          width: 210,
        }}
      >
        <View style={{ marginLeft: 10 }}>
          <Text
            style={{
              fontWeight: "bold",
              color: colours.bg,
            }}
          >
            {product.name}
          </Text>

          <Text
            style={{
              fontSize: 13,
              fontWeight: "300",
              opacity: 1,
              color: colours.bg,
              fontStyle: "italic",
            }}
          >
            Picks: {data.quantity}
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontWeight: "300",
              opacity: 1,
              color: colours.bg,
              fontStyle: "italic",
            }}
          >
            Unit price: ${product.unit_price}
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: colours.bg,
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            ${data.total_price}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OrderItemCard;

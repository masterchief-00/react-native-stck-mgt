import { View, Text,Image } from "react-native";
import product_img from "../assets/images/product-package.jpg";
import { colours } from "../colours";


const OrderItemCard = () => {
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
        source={product_img}
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
            HP Printer
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
            Electronics
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
            $690
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OrderItemCard;

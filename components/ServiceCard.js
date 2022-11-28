import { TouchableOpacity, Text } from "react-native";
import { colours } from "../colours";

const ServiceCard = ({ text = "Products", active = false, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        padding: 10,
        shadowColor: "black",
        backgroundColor: active ? colours.bg : colours.primary_variant,
        borderWidth: 1,
        borderColor: active ? colours.primary : "transparent",
        height: 47,
        borderRadius: 8,
        marginHorizontal: 8,
        marginVertical: 10,
        shadowOpacity: 1,
        shadowRadius: 15,
        shadowOffset: { height: 10, width: 10 },
        elevation: 10,
      }}
    >
      <Text
        style={{
          color: active ? colours.primary : colours.bg,
          fontSize: 17,
          fontWeight: active ? "bold" : "400",
          textTransform: "uppercase",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default ServiceCard;

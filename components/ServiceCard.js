import { TouchableOpacity, Text } from "react-native";
import { colours } from "../colours";

const ServiceCard = ({ text = "Products" }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        padding: 10,
        shadowColor: "black",
        backgroundColor: colours.primary_variant,
        borderWidth: 1,
        borderColor: "transparent",
        height: 47,
        borderRadius: 8,
        marginHorizontal: 8,
        shadowOpacity: 1,
        shadowRadius: 15,
        shadowOffset: { height: 10, width: 10 },
        elevation: 10,
      }}
    >
      <Text
        style={{
          color: colours.bg,
          fontSize: 17,
          fontWeight: "400",
          textTransform: "uppercase",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default ServiceCard;

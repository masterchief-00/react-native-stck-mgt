import { TouchableOpacity, Text } from "react-native";
import { colours } from "../colours";

const ServiceCard = ({ text }) => {
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        shadowColor: "black",
        backgroundColor: colours.primary,
        borderWidth: 1,
        borderColor: "transparent",
        borderRadius: 8,
        marginHorizontal: 8,
        shadowOpacity: 1,
        shadowRadius: 15,
        shadowOffset: { height: 10, width: 10 },
        elevation: 3,
      }}
    >
      <Text style={{ color: colours.bg, fontSize: 17, fontWeight: "bold" }}>
        Products
      </Text>
    </TouchableOpacity>
  );
};

export default ServiceCard;

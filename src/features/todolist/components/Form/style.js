import { StyleSheet } from "react-native";
import color from "../../../../contains/color";

const styles = StyleSheet.create({
    addTask: {
        bottom: 30,
        paddingHorizontal: 20,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    input: {
        width: "80%",
        height: 44,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#21a3d0",
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
    },

    iconWrapper: {
        width: 44,
        height: 44,
        borderRadius: "50%",
        backgroundColor: color.primary,
        alignItems: "center",
        justifyContent: "center",
    },

    icon: {
        fontSize: 24,
        color: "#FFFFFF",
    },
});
export default styles;

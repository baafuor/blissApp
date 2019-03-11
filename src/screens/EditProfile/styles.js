const React = require("react-native");
const { Dimensions, Platform } = React;
const commonColor = require("../../theme/variables/commonColor");

const deviceHeight = Dimensions.get("window").height;

export default {
  container: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    margin: 16
  },
  label: {
    fontSize: 26,
    fontWeight: "bold"
  },
  subLabel: {
    fontSize: 16
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#fff",
    marginTop: 16,
    borderRadius: 10,
    paddingHorizontal: 4
  }
};

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
  profile: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#fff',
    alignSelf: 'center',
    borderRadius: 100
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

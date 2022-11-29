import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AppLoader from "../components/AppLoader";
import CustomInput from "../components/CustomInput";

const Form = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit } = useForm();

  const fetchData = setTimeout(() => {
    setIsLoading(false);
  }, 5000);

  useEffect(() => fetchData, []);

  const onSubmit = (data) => {
    console.log(data);
    Keyboard.dismiss();
    setIsLoading(true);
    fetchData;
  };
  return (
    <View style={styles.container}>
      <Text style={{ paddingVertical: 10 }}>Đăng nhập</Text>

      <View style={styles.form}>
        <CustomInput
          control={control}
          name="Username"
          rules={{ required: "Bạn chưa nhập Username" }}
          // nếu không đúng rules, sẽ không gửi được data và nó tự động focus đến ô input đó và hiển thị thông báo lỗi?
        />
        <CustomInput
          control={control}
          name="Password"
          secureTextEntry={true}
          rules={{
            required: "Bạn chưa nhập Mật khẩu",
            minLength: { value: 6, message: "Mật khẩu phải lớn hơn 6 ký tự" },
          }}
        />
      </View>

      <TouchableOpacity style={{ alignSelf: "flex-end", marginRight: "9%" }}>
        <Text>Quên mật khẩu?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.logIn}>
        <Text style={{ color: "white" }}>Đăng nhập</Text>
      </TouchableOpacity>
      <View style={styles.signIn}>
        <Text style={{}}>Bạn chưa có tài khoản?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignUp")}
          style={{ paddingHorizontal: 10 }}
        >
          <Text style={{ color: "red", fontSize: 16 }}>Đăng ký</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.google}>
        <Image
          style={styles.iconGoogle}
          source={require("../../assets/image/Google__G__Logo.svg.png")}
        />
        <Text style={{ color: "black" }}>Đăng nhập bằng Google</Text>
      </TouchableOpacity>
      {/* <AppLoader /> */}
      {isLoading ? <AppLoader /> : null}
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 10,
    flex: 1,
  },
  form: {
    width: "80%",
    textAlign: "center",
    alignItems: "center",
  },
  action: {
    marginTop: 20,
  },
  logIn: {
    marginTop: 50,
    marginBottom: 20,
    width: "80%",
    backgroundColor: "red",
    height: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  signIn: {
    flexDirection: "row",
    alignItems: "center",
  },
  google: {
    flexDirection: "row",
    width: "80%",
    backgroundColor: "white",
    borderColor: "red",
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
  },
  iconGoogle: {
    width: 26,
    height: 26,
    marginRight: 8,
  },
});

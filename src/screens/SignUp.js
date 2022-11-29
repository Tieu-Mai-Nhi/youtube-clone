import React from 'react';
import { useForm } from 'react-hook-form';
import { Image, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import CustomInput from '../components/CustomInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

const Form = ({ navigation }) => {
    const { control, handleSubmit, watch } = useForm();
    const pass = watch('Password');
    const onSubmit = (data) => {
        console.log('signIn:', data);
        Keyboard.dismiss();
        navigation.goBack();
    }
    return (
        <View style={styles.container}>
            <Text style={{ paddingVertical: 10 }}>Đăng ký</Text>

            <KeyboardAvoidingView style={styles.form} behavior='position' keyboardVerticalOffset={40}>
                <CustomInput
                    control={control}
                    name="Username"
                    rules={{ required: 'Bạn chưa nhập Username' }}
                // nếu không đúng rules, sẽ không gửi được data và nó tự động focus đến ô input đó và hiển thị thông báo lỗi?
                />
                <CustomInput
                    control={control}
                    name="Email"
                    rules={{
                        required: 'Bạn chưa nhập Email',
                        pattern: { value: regexEmail, message: 'Không đúng định dạng mail' }
                    }}
                />
                <CustomInput
                    control={control}
                    name="Password"
                    rules={{
                        required: 'Bạn chưa nhập Mật khẩu',
                        minLength: { value: 6, message: 'Mật khẩu phải lớn hơn 6 ký tự' }
                    }}
                    secureTextExtry
                />
                <CustomInput
                    control={control}
                    name="Nhập lại Password"
                    rules={{
                        required: 'Bạn chưa nhập Mật khẩu',
                        validate: value => value === pass || 'Mật khẩu không trùng khớp',
                    }}
                    secureTextExtry
                />
                <CustomInput
                    control={control}
                    name="Phone"
                    rules={{
                        required: 'Vui lòng nhập số điện thoại',
                        // valueAsNumber: true,
                        pattern: { value: regexPhoneNumber, message: 'Số điện thoại không hợp lệ' }

                    }}
                />

                <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.logIn}>
                    <Text style={{ color: 'white', }}>Đăng ký tài khoản</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
}

export default Form

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 10,
        flex: 1,
    },
    form: {
        width: '80%',
        textAlign: 'center',
        // alignItems: 'center'
    },
    action: {
        marginTop: 20
    },
    logIn: {
        marginTop: 20,
        marginBottom: 20,
        width: '100%',
        backgroundColor: 'red',
        height: 50,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },

})
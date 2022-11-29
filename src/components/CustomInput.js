import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Controller } from 'react-hook-form';

const CustomInput = ({ error, control, name, rules, secureTextEntry }) => {

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { onChange, onBlur, value },
                fieldState: { error }
            }) => {
                console.log(error);
                return (
                    <View style={styles.container}>
                        <Text style={{ marginBottom: 8, fontWeight: '600' }}>{name}</Text>
                        <TextInput
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            style={[styles.input, { borderColor: error ? 'red' : '#393E46' }]}
                            placeholderTextColor="#929292"
                            secureTextEntry={secureTextEntry}  //để che pass
                        >
                        </TextInput>
                        {error && <Text style={styles.error}>{error.message}</Text>}
                    </View>
                )
            }}
        />
    )
}

export default CustomInput

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 12
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        color: '#393E46',
    },
    icon: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 100
    },
    error: {
        color: 'red',
        alignSelf: 'flex-start',
        marginTop: 8,
    }

})
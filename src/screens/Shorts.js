import React, { useReducer } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

const reducer = (state, action) => {
    switch (action) {
        case 'Tang': return state + 1;
        case 'Giam': return state - 1;
        case "Xoa": return 0;
        default: return state;
    }
};
const reducer2 = (state, action) => {
    switch (action.type) {
        case 'Gan gia tri': return action.data;
        default: return state;
    }
};

export default function Shorts() {
    const [count, dispatch] = useReducer(reducer, 0)
    const [count2, dispatch2] = useReducer(reducer2, 0)
    // count là tên của state
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: 'blue', fontSize: 28, backgroundColor: 'orange', width: '100%', textAlign: 'center' }}>{count}</Text>
            <Button title="Tăng" onPress={() => dispatch('Tang')}></Button>
            <Button title="Giảm" onPress={() => dispatch('Giam')}></Button>
            <Button title="Xóa hết dữ liệu" onPress={() => dispatch('Xoa')}></Button>

            <Text style={{ color: 'blue', fontSize: 28, backgroundColor: 'orange', width: '100%', textAlign: 'center' }}>{count2}</Text>
            <Button
                title="Gán giá trị"
                onPress={() => dispatch2({
                    type: 'Gan gia tri',
                    data: 10,
                })} />
        </View>
    )
}

const styles = StyleSheet.create({})



/*
1. tạo hàm: const[tên state, dispatch] = useReducer(tên hàm reducer, giá trị khởi tạo)
2. tạo hàm: reducer = (state, action) => {
       switch (action) {
        case 'Tang': return state + 1;
        case 'Giam': return state - 1;
        case "Xoa": return 0;
        default: return state;
    }
}
3. onPress={() => dispatch('')}

*/
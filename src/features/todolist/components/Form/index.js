import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Keyboard,
} from "react-native";
import React, { useState } from "react";
import styles from "./style";

const Form = (props) => {
    const [task, setTask] = useState('')

    const handleAddTask = (task) => {
        if (task.length === 0) {
            alert("Vui lòng nhập công việc!")
            return false;
        }
        props.onAddTask(task);
        setTask('');
        Keyboard.dismiss()
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.addTask}
            keyboardVerticalOffset={10}
        >
            <TextInput
                value={task}
                placeholder="Add Task"
                style={styles.input}
                onChangeText={(text) => setTask(text)}
            />
            <TouchableOpacity>
                <View style={styles.iconWrapper}>
                    <Text
                        style={styles.icon}
                        onPress={handleAddTask}
                    >
                        +
                    </Text>
                </View>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

export default Form;

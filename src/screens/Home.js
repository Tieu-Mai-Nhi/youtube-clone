import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import Card from '../components/Card'

const Home = () => {
    return (
        <View>
            <Header />
            <ScrollView>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </ScrollView>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})
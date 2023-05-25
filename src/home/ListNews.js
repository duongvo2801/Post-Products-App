import React, { Component, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import ItemListNew from './ItemListNew';
import AxiosIntance from '../../files/AxiosIntance';

const ListNews = (props) => {
    // truyen du lieu
    const {navigation} = props;

    const [dataEx, setdataEx] = useState([]);
    const [isLoading, setisLoading] = useState(true);

    // set lai du lieu
    useEffect(() => {
      const getNews = async() => {
        const response = await AxiosIntance().get('/articles');
        // console.log(response.data);
        if (response.error == false) { // lấy data thành công
            setdataEx(response.data);
            setisLoading(false);
        } else {
            ToastAndroid.show('Lấy dữ liệu thất bại', ToastAndroid.SHORT);
        }
      }

      getNews();
    
      return () => {
        
      }
    }, [])
    

    return (
      <View style={styles.container}>
        {isLoading == true ? (
          <View>
            <ActivityIndicator size={'large'} color={'#1877F2'}/>
            <Text>Loading...</Text>
          </View>
        ) : (
          <FlatList
            data={dataEx}
            renderItem={({ item }) => <ItemListNew data={item} navigation={navigation}/>}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    );
}

export default ListNews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

import React, { Component, useEffect, useState } from 'react'
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, 
  ToastAndroid, View, Dimensions } from 'react-native';
import ItemListNew from './ItemListNew';
import AxiosIntance from '../../files/AxiosIntance';
import { Entypo, AntDesign, FontAwesome, Feather } from '@expo/vector-icons'
import Avatar from '../avatar/Avatar';

const NewsDetails = (props) => {
  const {route} = props;
  const {params} = route;
  const [title, settitle] = useState('');
  const [content, setcontent] = useState('');
  const [imageURL, setimageURL] = useState('');
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const getDetails = async() => {
      const response = await AxiosIntance().get('/articles/' + params.id + '/detail')
      console.log(response);
      if(response.error == false) {
        // lay data thanh cong
        settitle(response.data[0].title);
        setcontent(response.data[0].content);
        setimageURL(response.data[0].image);
        setisLoading(false);
      } else {
        ToastAndroid.show("Lấy dữ liệu thất bại", ToastAndroid.SHORT);
      }
    }
    getDetails();
  
    return () => {
      
    }
  }, [])
  

  return (
    <View style={styles.container}>
      {isLoading == true ?
        <View>
          <ActivityIndicator size={'large'} color={'#1877F2'}/>
          <Text>Loading...</Text>
        </View>
      :
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <View style={styles.row}>
                    <Avatar source={require('../../images/avatar.jpg')} />
                    <View style={{ paddingLeft: 10 }}>
                        <Text style={styles.user}>Võ Văn Dương</Text>
                        <View style={styles.row}>
                            <Text style={styles.time}>28m</Text>
                            <Entypo name='dot-single' size={12} color={'#747476'} />
                            <Entypo name='globe' size={12} color={'#747476'} />
                        </View>
                    </View>
                </View>
                <Entypo name='dots-three-horizontal' size={18} color={'#222121'} />
            </View>

            <Text style={styles.postTitle}>
                {title}
            </Text>
            <Text style={styles.post}>
                {content}
            </Text>
            <Image style={styles.photo}
                source={{ uri: imageURL ? imageURL : '../../images/image-example.png' }} />

            <View style={styles.footer}>
                <View style={styles.footerCount}>
                    <View style={styles.row}>
                        <View style={styles.iconCount}>
                            <AntDesign name='heart' size={13} color={'white'} />
                        </View>
                        <Text style={styles.textCount}>51 lượt thích</Text>
                    </View>
                    <Text style={styles.textCount}>32 bình luận</Text>
                </View>

                <View style={styles.seperator} />

                <View style={styles.footerMenu}>
                    <TouchableOpacity style={styles.button}>
                        <View style={styles.icon}>
                            <AntDesign name='hearto' size={23} color={'#424040'} />
                        </View>
                        <Text style={styles.text}>Thích</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                        <View style={styles.icon}>
                            <FontAwesome name='comment-o' size={23} color={'#424040'} />
                        </View>
                        <Text style={styles.text}>Bình luận</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                        <View style={styles.icon}>
                            <Feather name='share-2' size={23} color={'#424040'} />
                        </View>
                        <Text style={styles.text}>Chia sẻ</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.bottomDevider} />
        </ScrollView>
      }
    </View>
  );
}

export default NewsDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 5,
      paddingVertical: 0,
      paddingHorizontal: 11
  },
  row: {
      alignItems: 'center',
      flexDirection: 'row',
  },
  user: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#222121'
  },
  time: {
      fontSize: 12,
      color: '#747476'
  },
  post: {
      fontSize: 14,
      color: '#222121',
      lineHeight: 16,
      marginTop: 5,
      paddingVertical: 0,
      paddingHorizontal: 11,
  },
  postTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#222121',
      lineHeight: 16,
      marginTop: 8,
      paddingVertical: 0,
      paddingHorizontal: 11,
  },
  photo: {
      margin: 9,
      width: Dimensions.get('window').width - 13,
      height: 300
  },
  footer: {
      paddingVertical: 0,
      paddingHorizontal: 11
  },
  footerCount: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 9,
      paddingHorizontal: 0
  },
  iconCount: {
      backgroundColor: '#E93547',
      width: 23,
      height: 23,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 6
  },
  textCount: {
      fontSize: 13,
      color: '#424040'
  },
  seperator: {
      width: '100%',
      height: 2,
      backgroundColor: '#f9f9f9'
  },
  footerMenu: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 9,
      paddingHorizontal: 0
  },
  button: {
      flexDirection: 'row'
  },
  icon: {
      marginRight: 6
  },
  text: {
      fontSize: 15,
      color: '#424040'
  },
  bottomDevider: {
      width: '100%',
      height: 9,
      backgroundColor: '#f0f2f5'
  }
});

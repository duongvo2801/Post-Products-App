import React, { Component } from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Avatar from '../avatar/Avatar';
import { Entypo, AntDesign, FontAwesome, Feather } from '@expo/vector-icons'

const ItemListNew = (props) => {
    const { data, navigation } = props;

    const ClickItem = () => {
      navigation.navigate('NewsDetails', {id: data._id});
    }

    return (
      <View style={styles.container}>
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

          <TouchableOpacity onPress={ClickItem}>

              <Text style={styles.post}>
                  {data.title}
              </Text>
              <Image style={styles.photo}
                  source={{ uri: data.image }} />

          </TouchableOpacity>

          <View style={styles.footer}>
              <View style={styles.footerCount}>
                  <View style={styles.row}>
                      <View style={styles.iconCount}>
                          <AntDesign name='heart' size={13} color={'white'} />
                      </View>
                      <Text style={styles.textCount}>50 lượt thích</Text>
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
      </View>
      
    );
}

export default ItemListNew;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: Dimensions.get('window').width - 2,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
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
  photo: {
      marginTop: 9,
      width: '100%',
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
